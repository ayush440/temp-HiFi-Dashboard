<template>
  <div class="relative w-full bg-third min-h-screen">
    <div class="px-4 md:px-6 py-4 md:py-6 bg-third">
      <!-- Top Grid Section -->
      <div class="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-4">
        <!-- Today's Profit Section -->
        <div class="donut-chart-container lg:w-[40%] mx-4 md:mx-0 -mt-1 mb-4 py-10">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-800">Today's Profit</h3>
            <button 
              v-if="hasMoreChartItems" 
              @click="openChartSidebar" 
              class="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              View More
              <ArrowRightIcon class="w-4 h-4" />
            </button>
          </div>
          
          <!-- Loader -->
          <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="loader"></div>
          </div>
          
          <!-- Chart and Legend when data is ready -->
          <div v-else class="flex flex-row items-center w-full">
            <!-- Chart Wrapper -->
            <div class="donut-chart-wrapper">
              <canvas ref="profitChart" class="donut-chart"></canvas>
            </div>
            
            <!-- Legend -->
            <div class="legend-wrapper">
              <ul class="text-sm">
                <li 
                  v-for="(item, index) in displayedChartData" 
                  :key="index" 
                  class="legend-item"
                >
                  <span
                    class="legend-color"
                    :style="{ backgroundColor: item.color }"
                  ></span>
                  <span
                    class="legend-name"
                    :title="item.symbol"
                  >
                    {{ item.symbol }} {{ item.isPaper ? '(Paper)' : '' }}
                  </span>
                  - <span class="legend-value" :class="{'text-green-600': parseFloat(item.pnl) > 0, 'text-red-600': parseFloat(item.pnl) < 0}">
                    {{ formatPnL(parseFloat(item.pnl)) }}
                  </span>
                </li>
              </ul>
              <div class="mt-4 text-sm font-semibold">
                Total PnL: <span :class="{'text-green-600': combinedTotalPnL > 0, 'text-red-600': combinedTotalPnL < 0}">
                  {{ formatPnL(combinedTotalPnL) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Today's Sales Section -->
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-sm lg:w-[60%] mx-4 md:mx-0 -mt-1 mb-4 sm:mb-6">
          <h2 class="text-lg font-semibold text-[#05004E]">Today's Sales</h2>
          <p class="text-sm text-gray-500 mb-4 sm:mb-6">Sales Summary</p>
          
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <!-- Total Profit -->
            <div class="bg-[#fffff] border border-gray-300 rounded-lg p-4">
              <div class="w-10 h-10 bg-black rounded-full flex items-center justify-center mb-3">
                <ChartLineIcon class="w-6 h-6 text-white" />
              </div>
              <div class="flex items-baseline gap-1">
                <span :class="{'text-green-600': combinedTotalPnL > 0, 'text-red-600': combinedTotalPnL < 0}" class="text-xl sm:text-2xl font-bold">
                  {{ formatPnL(combinedTotalPnL) }}
                </span>
              </div>
              <p class="text-sm text-gray-600 mt-4">Total Profit</p>
            </div>

            <!-- Brokers Connected -->
            <div class="bg-[#fffff] border border-gray-300 rounded-lg p-4">
              <div class="w-10 h-10 bg-black rounded-full flex items-center justify-center mb-3">
                <NetworkIcon class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-xl sm:text-2xl font-bold">{{ brokersToken.message }}</h3>
              <p class="text-sm text-gray-600 mt-4">Brokers Connected</p>
            </div>

            <!-- Total Orders -->
            <div class="bg-[#fffff] border border-gray-300 rounded-lg p-4">
              <div class="w-10 h-10 bg-black rounded-full flex items-center justify-center mb-3">
                <ShoppingCartIcon class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-xl sm:text-2xl font-bold">{{ combinedTotalOrders }}</h3>
              <p class="text-sm text-gray-600 mt-4">Total Orders</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Positions Table Section -->
      <div class="bg-white rounded-lg shadow-sm mx-4 md:mx-0">
        <div class="p-4 sm:p-6 border-b">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold">Positions</h2>
            <RouterLink to="/positions" 
                        class="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2">
              All
              <ArrowRightIcon class="w-4 h-4" />
            </RouterLink>
          </div>
        </div>
        <div class="overflow-x-auto">
          <positionTable :positions="displayedPositions.slice(0, maxDisplayedPositions)" :mode="mode" />
        </div>
        <div v-if="displayedPositions.length > maxDisplayedPositions" class="p-4 text-center">
          <button @click="openPositionsSidebar" class="text-blue-600 hover:text-blue-800">
            View More
          </button>
        </div>
      </div>
    </div>
  </div>
  <sqOffPosition />
  <sqoffManual />
  <SideBar2 
    :isOpen="isSidebarOpen" 
    @close="closeSidebar" 
    :title="sidebarTitle"
  >
    <div v-if="sidebarContent === 'chart'" class="p-4">
      <positionTable :positions="remainingChartData" :mode="mode" :isChartData="true" />
    </div>
    <div v-else-if="sidebarContent === 'positions'" class="p-4">
      <positionTable :positions="displayedPositions.slice(maxDisplayedPositions)" :mode="mode" />
    </div>
  </SideBar2>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useProfileStore } from '@/stores/matrix/profile'
import { useBrokersStore } from '@/stores/matrix/broker'
import { useOrdersStore } from '@/stores/matrix/order'
import { usePositionsStore } from '@/stores/matrix/position'
import { usePaperPositionsStore } from '@/stores/matrix/paperPositions'
import sqOffPosition from '../position/sqOffPosition.vue'
import sqoffManual from '../position/sqoffManual.vue'
import { 
  ChartLineIcon, 
  NetworkIcon, 
  ShoppingCartIcon, 
  ArrowRightIcon
} from 'lucide-vue-next'
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js"
import positionTable from './content/positionTable/Main.vue'
import { useManualOrdersStore } from "@/stores/groups/manualOrders"
import SideBar2 from '@/components/sidebar2/main.vue'

Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title)

const props = defineProps<{
  mode: 'paper' | 'live'
}>()

const profitChart = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

const manualOrdersStore = useManualOrdersStore()
const profileStore = useProfileStore()
const brokersStore = useBrokersStore()
const ordersStore = useOrdersStore()
const positionsStore = usePositionsStore()
const paperPositionsStore = usePaperPositionsStore()

const { profile } = storeToRefs(profileStore)
const { brokers } = storeToRefs(brokersStore)
const { positions, strategiesPositions, loading } = storeToRefs(positionsStore)
const { paperPositions } = storeToRefs(paperPositionsStore)

const maxDisplayedPositions = 5
const maxDisplayChartItems = 5
const isSidebarOpen = ref(false)
const sidebarContent = ref<'chart' | 'positions'>('chart')
const sidebarTitle = computed(() => sidebarContent.value === 'chart' ? 'Additional Profit Items' : 'Additional Positions')

const openChartSidebar = () => {
  sidebarContent.value = 'chart'
  isSidebarOpen.value = true
}

const openPositionsSidebar = () => {
  sidebarContent.value = 'positions'
  isSidebarOpen.value = true
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

// Combined chart data based on mode
const combinedChartData = computed(() => {
  let data = []
  
  if (props.mode === 'live') {
    data.push(...Object.entries(strategiesPositions.value).map(([strategyId, data]) => ({
      symbol: data.name,
      pnl: data.pnl,
      color: data.color,
      isPaper: false
    })))
  } else if (props.mode === 'paper') {
    data.push(...Object.entries(paperPositionsStore.mainPaperPositions).map(([strategyId, data]) => ({
      symbol: data.name,
      pnl: data.pnl,
      color: data.color,
      isPaper: true
    })))
  }
  
  return data
})

// Split chart data into displayed and remaining items
const displayedChartData = computed(() => {
  return combinedChartData.value.slice(0, maxDisplayChartItems)
})

const remainingChartData = computed(() => {
  return combinedChartData.value.slice(maxDisplayChartItems)
})

const hasMoreChartItems = computed(() => {
  return combinedChartData.value.length > maxDisplayChartItems
})

// Combined total PnL based on mode
const combinedTotalPnL = computed(() => {
  let total = 0
  
  if (props.mode === 'live') {
    total += Object.values(strategiesPositions.value).reduce((sum, strategy) => sum + strategy.pnl, 0)
  } else if (props.mode === 'paper') {
    total += Object.values(paperPositionsStore.mainPaperPositions).reduce((sum, strategy) => sum + strategy.pnl, 0)
  }
  
  return total
})

// Combined total orders based on mode
const combinedTotalOrders = computed(() => {
  let total = 0
  
  if (props.mode === 'live') {
    total += ordersStore.totalOrders + manualOrdersStore.totalManualOrders
  } else if (props.mode === 'paper') {
    total += paperPositionsStore.totalPaperOrders
  }
  
  return total
})

// Displayed positions based on mode
const displayedPositions = computed(() => {
  let positionsToDisplay = []
  
  if (props.mode === 'live') {
    positionsToDisplay.push(...positions.value.map(p => ({ ...p, isPaper: false })))
  } else if (props.mode === 'paper') {
    // Check if paperPositions.value is an array before using map
    if (Array.isArray(paperPositions.value)) {
      positionsToDisplay.push(...paperPositions.value.map(p => ({ ...p, isPaper: true })))
    } else {
      console.warn('paperPositions.value is not an array:', paperPositions.value)
      // If it's not an array, you might want to handle it differently, e.g.:
      // positionsToDisplay = Object.values(paperPositions.value).map(p => ({ ...p, isPaper: true }))
    }
  }
  
  return positionsToDisplay
})

const formatPnL = (pnl: number) => {
  return pnl > 0 ? `+₹${pnl.toFixed(2)}` : `₹${pnl.toFixed(2)}`
}

const createChart = () => {
  if (profitChart.value) {
    const ctx = profitChart.value.getContext('2d')
    if (ctx) {
      chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: displayedChartData.value.map(item => `${item.symbol}${item.isPaper ? ' (Paper)' : ''}`),
          datasets: [{
            data: displayedChartData.value.map(item => item.pnl),
            backgroundColor: displayedChartData.value.map(item => item.color),
            borderWidth: 2,
            borderColor: '#ffffff',
          }]
        },
        options: {
          cutout: '50%',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || ''
                  const value = context.raw as number
                  return `${label}: ${formatPnL(value)}`
                }
              }
            }
          },
        }
      })
    }
  }
}

const updateChart = () => {
  if (chart) {
    chart.data.labels = displayedChartData.value.map(item => `${item.symbol}${item.isPaper ? ' (Paper)' : ''}`)
    chart.data.datasets[0].data = displayedChartData.value.map(item => item.pnl)
    chart.data.datasets[0].backgroundColor = displayedChartData.value.map(item => item.color)
    chart.update()
  }
}

onMounted(async () => {
  await positionsStore.getPositions()
  await paperPositionsStore.getPaperPositions()
  nextTick(() => {
    createChart()
  })
})

watch(() => [strategiesPositions.value, paperPositionsStore.mainPaperPositions, props.mode], updateChart, { deep: true })


interface Broker {
  id: number
  broker_name: string
  broker_token_date: string
  token_status: string
  message: string
  updated_at: string
}

interface BrokerArray extends Array<Broker> {}

const brokersData = computed<BrokerArray>(() => brokers.value)

const brokersToken = computed(() => {
  const totalBrokers = brokersData.value.length
  if (totalBrokers > 0) {
    const today = new Date().toISOString().split("T")[0]
    const tokensGeneratedToday = brokersData.value.filter((broker: any) => 
      broker.broker_token_date.split("T")[0] === today && broker.token_status === "success"
    ).length

    let message = `${tokensGeneratedToday}/${totalBrokers}`
    let color = tokensGeneratedToday > 0 ? "text-emerald-500" : "text-rose-600"

    if (totalBrokers === 1) {
      message = tokensGeneratedToday === 1 ? "1/1" : "0/1"
    }
    return { message, color }
  } else {
    return { message: "0/0", color: "text-slate-500" }
  }
})
</script>

<style scoped lang="scss">
.donut-chart-container {
  @apply bg-white rounded-lg shadow-sm p-4 sm:p-6;
  height: 300px; /* Fixed height */
}

.donut-chart-wrapper {
  @apply w-1/2 flex flex-col items-center justify-center;
}

.donut-chart {
  @apply h-[160px] w-full max-w-[160px] sm:h-[200px] sm:max-w-[200px];
}

.legend-wrapper {
  @apply w-1/2 pl-4 flex flex-col justify-center;
  max-height: 300px; /* Fixed max height */
  overflow-y: auto;
}

.legend-item {
  @apply flex items-center mb-2 last:mb-0;
}

.legend-color {
  @apply w-3 h-3 rounded-full mr-2;
}

.legend-name {
  @apply flex-1 text-xs sm:text-sm text-gray-700 truncate max-w-[100px] sm:max-w-[120px] cursor-pointer;
}

.legend-value {
  @apply text-xs sm:text-sm font-semibold text-gray-900 ml-2;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.ord_pos_div {
  @apply overflow-auto shadow-inner shadow-primary w-full;
  max-height: calc(58vh);
  border-radius: 0 0 8px 8px;

  &::-webkit-scrollbar {
    @apply w-1 h-1;
  }

  &::-webkit-scrollbar-thumb {
    @apply bg-gray-300 rounded;
  }

  &::-webkit-scrollbar-track {
    @apply bg-gray-100;
  }
}

@media (max-width: 640px) {
  .donut-chart {
    height: 140px;
    max-width: 140px;
  }

  .legend-wrapper {
    padding-left: 2px;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .donut-chart-container {
    .donut-chart-wrapper, .legend-wrapper {
      width: 50%;
    }
  }
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>