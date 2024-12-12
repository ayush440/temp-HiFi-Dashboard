<template>
  <div class="donut-chart-container h-full mt-10">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Today's Profit</h3>
    
    <!-- Loader -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="loader"></div>
    </div>
    
    <!-- Chart and Legend when data is ready -->
    <div v-else class="flex flex-row items-center w-full">
      <!-- Chart Wrapper -->
      <div class="donut-chart-wrapper">
        <canvas class="donut-chart" ref="doughnutChart"></canvas>
      </div>
      
      <!-- Legend -->
      <div class="w-1/2 pl-4">
        <ul class="text-sm">
          <li v-for="(item, index) in chartData" :key="index" class="flex items-center mb-3">
            <span
              class="w-4 h-4 rounded-full inline-block mr-3"
              :style="{ backgroundColor: item.color }"
            ></span>
            
            <!-- Strategy Name with Ellipsis and Tooltip using v-bind:title -->
            <span
              class="strategy-name"
              v-bind:title="item.strategy"  
            >
              {{ item.strategy }}
            </span>
            
            - <span class="ml-1 font-semibold">₹{{ item.pnl }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from "vue";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { usePositionsStore } from "@/stores/matrix/position";
import { useManualPositionsStore } from "@/stores/groups/manualPosition";
import { useTickerStore } from "@/stores/matrix/ticker/ticker";

// Register chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

const positionsStore = usePositionsStore();
const manualPositionsStore = useManualPositionsStore();
const tickerStore = useTickerStore();
const { getPositions } = positionsStore;
const { getManualPositions } = manualPositionsStore;

const doughnutChart = ref(null);
const loading = ref(true);
let chart = null;

// Calculate PnL
const calculatePnL = (position) => {
  const last_price = tickerStore.getLastPrice(position.instrument_token) || position.last_price;
  const quantity = position.quantity || 0;
  const buy_price = position.buy_price || 0;
  const sell_price = position.sell_price || 0;

  if (position.status === "OPEN") {
    if (position.side === "BUY") {
      return (last_price - buy_price) * quantity;
    } else if (position.side === "SELL") {
      return (sell_price - last_price) * quantity;
    }
  } else if (position.status === "CLOSED") {
    return (sell_price - buy_price) * quantity;
  }
  return 0;
};

// Chart Data
const chartData = computed(() => {
  const positions = [...positionsStore.positions, ...manualPositionsStore.manualPositions];
  const strategyPnL = {};

  positions.forEach((position) => {
    const pnl = calculatePnL(position);
    const strategyName = position.strategy?.name || 'Unknown';
    const strategyColor = position.strategy?.color || '#000000';

    if (!strategyPnL[strategyName]) {
      strategyPnL[strategyName] = { pnl: 0, color: strategyColor };
    }
    strategyPnL[strategyName].pnl += pnl;
  });

  return Object.entries(strategyPnL).map(([strategy, data]) => ({
    strategy,
    pnl: data.pnl.toFixed(2),
    color: data.color,
  }));
});

const createChart = () => {
  if (doughnutChart.value) {
    const ctx = doughnutChart.value.getContext("2d");
    if (ctx) {
      chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: chartData.value.map((item) => item.strategy),
          datasets: [
            {
              data: chartData.value.map((item) => parseFloat(item.pnl)),
              backgroundColor: chartData.value.map((item) => item.color),
              borderWidth: 2,
              borderColor: "#ffffff",
            },
          ],
        },
        options: {
          cutout: "50%",
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.raw;
                  return `${label}: ₹${value.toFixed(2)}`;
                }
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }
};

const updateChart = () => {
  if (chart) {
    chart.data.labels = chartData.value.map((item) => item.strategy);
    chart.data.datasets[0].data = chartData.value.map((item) => parseFloat(item.pnl));
    chart.data.datasets[0].backgroundColor = chartData.value.map((item) => item.color);
    chart.update();
  }
};

onMounted(async () => {
  await getPositions();
  await getManualPositions();
  loading.value = false;

  nextTick(() => {
    createChart();
  });
});

watch(() => chartData.value, updateChart, { deep: true });
</script>

<style scoped>
.donut-chart-container {
  @apply bg-white rounded-lg shadow-sm p-4 sm:p-6;
}

.donut-chart-wrapper {
  @apply w-1/2 flex flex-col items-center justify-center;
}

.donut-chart {
  @apply h-[160px] w-full max-w-[150px] sm:h-[200px] sm:max-w-[200px];
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

/* Strategy Name Ellipsis and Tooltip */
.strategy-name {
  display: inline-block;
  max-width: 120px; /* Set width for the ellipsis effect */
  white-space: nowrap; /* Prevents text from wrapping */
  overflow: hidden;
  text-overflow: ellipsis; /* Shows ellipsis when the text is too long */
  cursor: pointer;
}

.strategy-name:hover {
  text-decoration: underline; /* Optional: Adds underline on hover for better UX */
}
</style>