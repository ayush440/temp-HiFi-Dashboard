<template>
  <div class="w-full bg-white p-6 rounded-lg">
    <!-- Desktop View -->
    <div class="hidden sm:block space-y-2">
      <!-- Header row -->
      <div class="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_40px] items-center px-4 py-3 font-medium text-gray-700">
        <div>STRATEGY NAME</div>
        <div>QUANTITY</div>
        <div>SIDE</div>
        <div>TIME</div>
        <div>P&L</div>
        <div>TYPE</div>
        <div></div>
      </div>

      <!-- Strategy groups -->
      <template v-if="displayedPositions.length > 0">
        <div v-for="(group, strategyId) in groupedPositions" :key="strategyId" class="mb-4">
          <div class="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-t-lg">
            <h3 class="font-semibold text-lg">{{ group.name }}</h3>
            <div :class="getPnLColor(group.pnl)" class="font-bold">
              {{ formatPnL(group.pnl) }}
            </div>
          </div>
          <div v-for="(position, index) in group.positions" :key="position.id" class="relative">
            <div
              :class="[
                'cursor-pointer transition-colors duration-150 ease-in-out overflow-hidden',
                index % 2 === 0 ? 'bg-[third]' : 'bg-third',
                expandedRows[position.id] ? 'rounded-b-none' : ''
              ]"
              @click="toggleExpand(position.id)"
            >
              <div class="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_40px] items-center px-4 py-3">
                <div>{{ group.name }}</div>
                <div>{{ position.quantity }}</div>
                <div>{{ position.side }}</div>
                <div>{{ new Date(position.updated_at).toLocaleTimeString() }}</div>
                <div :class="getPnLColor(position.pnl)">{{ formatPnL(position.pnl) }}</div>
                <div>{{ position.type }}</div>
                <div class="text-right">
                  <ChevronDownIcon v-if="expandedRows[position.id]" class="w-5 h-5 text-black inline-block" />
                  <ChevronRightIcon v-else class="w-5 h-5 text-black inline-block" />
                </div>
              </div>
            </div>
            <div v-if="expandedRows[position.id]" :class="[index % 2 === 0 ? 'bg-[third]' : 'bg-third', 'rounded-b-lg']">
              <div class="px-4 py-3 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center">
                <div class="truncate-text">
                  <p class="text-sm font-medium text-gray-500">Strategy</p>
                  <p class="mt-1 text-sm text-gray-900">{{ position.tradingsymbol }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Broker</p>
                  <p class="mt-1 text-sm text-gray-900">{{ position.broker?.broker_name }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Scripts</p>
                  <p class="mt-1 text-sm text-gray-900">{{ group.script }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Buy Price</p>
                  <p class="mt-1 text-sm text-gray-900">{{ position.buy_price }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Sell Price</p>
                  <p class="mt-1 text-sm text-gray-900">{{ position.sell_price }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">P&L</p>
                  <p :class="['mt-1 text-sm', getPnLColor(position.pnl)]">{{ formatPnL(position.pnl) }}</p>
                </div>
                <div>
                  <button @click.stop="squareOff(position)" class="bg-[#EDF4FF] text-indigo-600 px-4 py-2 rounded-lg text-sm border border-indigo-200 transition-all duration-150 flex items-center space-x-2 hover:border-indigo-800 hover:bg-[#EDF4FF]">
                    <RefreshCwIcon class="w-4 h-4" />
                    <span>Square off</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div v-else-if="loading" class="flex justify-center py-4">
        <LoadingIcon icon="puff" class="w-8 h-8" />
      </div>
      <div v-else class="text-center py-4">
        Data not found!!
      </div>
    </div>

    <!-- Mobile View -->
    <div class="sm:hidden space-y-4">
      <div class="bg-third text-tabletext dark:bg-primary py-3 px-4 rounded-lg">
        <div class="grid grid-cols-5 font-bold text-xs">
          <div>Strategy</div>
          <div>Qty</div>
          <div>Side</div>
          <div>P&L</div>
          <div>Type</div>
        </div>
      </div>

      <template v-if="displayedPositions.length > 0">
        <div v-for="(group, strategyId) in groupedPositions" :key="strategyId" class="mb-4">
          <div v-for="position in group.positions" :key="position.id" 
               class="bg-[third] p-4 rounded-lg space-y-2">
            <div class="grid grid-cols-5 items-center text-xs">
              <div class="truncate">{{ position.tradingsymbol }}</div>
              <div>{{ position.quantity }}</div>
              <div>{{ position.side }}</div>
              <div :class="getPnLColor(position.pnl)">{{ formatPnL(position.pnl) }}</div>
              <div>{{ position.type }}</div>
            </div>
            <div @click="toggleExpand(position.id)" class="cursor-pointer text-sm text-gray-600 flex items-center justify-between mt-2">
              <span>Details</span>
              <ChevronDownIcon v-if="expandedRows[position.id]" class="w-4 h-4" />
              <ChevronRightIcon v-else class="w-4 h-4" />
            </div>
            <div v-if="expandedRows[position.id]" class="text-xs space-y-2 mt-2">
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <p class="font-medium text-gray-500">Broker</p>
                  <p class="text-gray-900">{{ position.broker?.broker_name }}</p>
                </div>
                <div>
                  <p class="font-medium text-gray-500">Scripts</p>
                  <p class="text-gray-900">{{ group.script }}</p>
                </div>
                <div>
                  <p class="font-medium text-gray-500">Buy Price</p>
                  <p class="text-gray-900">{{ position.buy_price }}</p>
                </div>
                <div>
                  <p class="font-medium text-gray-500">Sell Price</p>
                  <p class="text-gray-900">{{ position.sell_price }}</p>
                </div>
                <div>
                  <p class="font-medium text-gray-500">Time</p>
                  <p class="text-gray-900">{{ new Date(position.updated_at).toLocaleTimeString() }}</p>
                </div>
              </div>
            </div>
            <button @click.stop="squareOff(position)" class="w-full bg-[#EDF4FF] text-indigo-600 px-4 py-2 rounded-lg text-xs border border-indigo-200 mt-2 flex items-center justify-center space-x-1">
              <RefreshCwIcon class="w-3 h-3" />
              <span>Square off</span>
            </button>
          </div>
        </div>
      </template>
      <div v-else-if="loading" class="flex justify-center py-4">
        <LoadingIcon icon="puff" class="w-8 h-8" />
      </div>
      <div v-else class="text-center py-4 text-sm">
        Data not found!!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { ChevronRightIcon, ChevronDownIcon, RefreshCwIcon } from 'lucide-vue-next'
import { usePositionsStore } from '@/stores/matrix/position'
import { useProfileStore } from '@/stores/matrix/profile'
import { usePaperPositionsStore } from "@/stores/matrix/paperPositions"
import { useManualPositionsStore } from'@/stores/groups/manualPosition'
import { useStrategiesStore } from '@/stores/matrix/strategy'

const props = defineProps<{
  positions: any[]
  mode: 'paper' | 'live' | 'both'
}>()

const paperPositionsStore = usePaperPositionsStore()
const profileStore = useProfileStore()
const positionsStore = usePositionsStore()
const manualPositionsStore = useManualPositionsStore()
const strategiesStore = useStrategiesStore()

const { profile } = storeToRefs(profileStore)
const { positions, loading, strategiesPositions } = storeToRefs(positionsStore)
const { paperPositions } = storeToRefs(paperPositionsStore)
const { showSqOffModal, dataForSqOff, showCloseModal } = storeToRefs(positionsStore)
const { showManualSqOffModal, manualDataForSqOff, showManualCloseModal } = storeToRefs(manualPositionsStore)
const { strategies } = storeToRefs(strategiesStore)
const expandedRows = ref({})

const displayedPositions = computed(() => {
  return props.positions.map(p => ({
    ...p,
    type: p.hasOwnProperty('paper_trade') ? 'Paper' : 'Live'
  }))
})

const groupedPositions = computed(() => {
  return groupPositionsByStrategyId(displayedPositions.value)
})

const toggleExpand = (id: number) => {
  expandedRows.value[id] = !expandedRows.value[id]
}

const formatPnL = (pnl: number) => {
  return pnl > 0 ? `+₹${pnl.toFixed(2)}` : `₹${pnl.toFixed(2)}`
}

const getPnLColor = (pnl: number) => {
  if (pnl > 0) return 'text-green-600'
  if (pnl < 0) return 'text-red-600'
  return ''
}

const squareOff = (position: any) => {
  if (!position || typeof position !== 'object') {
    console.error('Invalid position object:', position);
    return;
  }

  if (position.id && position.strategy_id && position.broker_id) {
    showSqOffModal.value = true;
    dataForSqOff.value = {
      position_id: position.id,
      strategy_id: position.strategy_id,
      broker_id: position.broker_id
    };
  } else if (position.id) {
    showManualSqOffModal.value = true;
    manualDataForSqOff.value = {
      position_id: position.id
    };
  } else {
    console.warn('Unable to determine position type:', position);
  }
}

function groupPositionsByStrategyId(positions: any[]) {
  const groupedPositions: { [key: string]: any } = {};

  positions.forEach((position: any) => {
    const { strategy_id } = position;
    const strategy = position.strategy || strategies.value.find((s: any) => s.id === strategy_id);

    if (!groupedPositions[strategy_id]) {
      groupedPositions[strategy_id] = {
        color: strategy?.color || '#000000',
        color2: strategy?.color2 || '#FFFFFF',
        pnl: 0,
        name: strategy?.name || 'Unknown Strategy',
        image_url: strategy?.image_url || '',
        script: strategy?.script || '',
        positions: [],
      };
    }

    groupedPositions[strategy_id].pnl += position.pnl;
    groupedPositions[strategy_id].positions.push(position);
  });

  return groupedPositions;
}

onMounted(() => {
  // Initial fetch of positions is now handled by the parent component
})

watch(() => props.positions, (newPositions) => {
  // Reset expanded rows when positions change
  expandedRows.value = {}
}, { deep: true })

const totalPnL = computed(() => {
  return displayedPositions.value.reduce((sum: number, position: any) => sum + position.pnl, 0)
})

const positionCount = computed(() => {
  return displayedPositions.value.length
})

defineExpose({
  totalPnL,
  positionCount
})
</script>

<style scoped>
.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hover\:shadow-glow:hover {
  box-shadow: 0 0 5px rgba(37, 99, 235, 1), 0 0 10px rgba(37, 99, 235, 1);
  border-color: rgba(37, 99, 235, 1);
}

.position-row {
  transition: background-color 0.2s ease;
}

.position-row:hover {
  background-color: rgba(243, 244, 246, 0.5);
}

.strategy-header {
  background-color: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
  padding: 8px 16px;
  font-weight: 600;
}

.expanded-details {
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  padding: 12px;
}

.square-off-button {
  transition: all 0.2s ease;
}

.square-off-button:hover {
  background-color: #dbeafe;
  border-color: #3b82f6;
}

@media (max-width: 640px) {
  .strategy-header {
    padding: 6px 12px;
  }

  .expanded-details {
    padding: 8px;
  }
}
</style>