<template>
  <div class="w-full h-full md:h-full bg-[third]">
    <div class="mt-5  ml-6 mr-6  rounded-lg flex flex-col justify-center border border-secondary bg-secondary ">
      <div class="flex flex-wrap sm:flex-nowrap justify-between border-b border-third shadow shadow-third items-center px-1 sm:px-4 h-14">
          <div class="flex px-1 dark:text-tableText text-lg font-semibold">
              Today's Profit :&nbsp; 
                <TotalProfit greenColor = "text-green-600" />
          </div>
        
        <div class="flex sm:w-auto justify-between items-center">
          <div class="font-semibold text-gray-700 dark:text-tableText mr-1 sm:mr-2">
            {{ positions.length }}  Positions
          </div>
        </div>
      </div>

      <div class="hidden sm:block">
        <div class="table-container text-nowrap">
          <table class="mb-2 pb-5">
            <thead>
              <tr class="text-start">
                <th class="text-center whitespace-nowrap">Strategy</th>
                <th v-if="profile && profile.user_role !== 'Paper'" class="text-center whitespace-nowrap">Broker</th>
                <th class="text-center whitespace-nowrap">Script</th>
                <th class="text-center whitespace-nowrap">Product</th>
                <th class="text-center whitespace-nowrap">Side</th>
                <th class="text-center whitespace-nowrap">Quantity</th>
                <th class="text-center whitespace-nowrap">Buy Price</th>
                <th class="text-center whitespace-nowrap">Sell Price</th>
                <th class="text-center whitespace-nowrap">Position Status</th>
                <th class="text-center whitespace-nowrap">P&L</th>
                <th v-if="profile && profile.user_role !== 'Paper'" class="text-center whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              <template v-if="profile && profile.user_role !== 'Paper'">
                <template v-if="(showTableData && positions.length > 0) || (showManualTableData && manualPositions.length > 0)">
                  <positionRow v-if="showTableData && mergedPositions.length > 0" v-for="position in mergedPositions" :item="position" :key="position.id" />
                </template>
                <div v-else-if="!showTableData || !showManualTableData"
                  class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center">
                  <LoadingIcon icon="puff" class="w-8 h-8" />
                </div>
                <tr v-else>
                    <td class="text-center">
                        Data not found!!
                    </td>
                </tr>
              </template>

              <template v-else>
                  <paperTradeRow v-if="showPaperPositions && paperPositions.length > 0" v-for="position in paperPositions" :item="position" :key="position.id" />
                    <div v-else-if="!showPaperPositions"
                      class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center">
                      <LoadingIcon icon="puff" class="w-8 h-8" />
                    </div>
                    <tr v-else>
                        <td class="text-center">
                            Data not found!!
                        </td>
                    </tr>
              </template> 
            </tbody>
          </table>
        </div>
      </div>

      <!-- for mobile device  -->    
      <div class="visible sm:hidden">
        <div class="flex justify-between font-bold text-sm xs:text-base bg-third text-tabletext dark:bg-primary py-3 px-4 shadow dark:shadow-tabletext">
            <div>Trading Symbol	</div>
            <div class="">Quantity</div>
            <div>P&L</div>
        </div>

        <div class="mobile-device-table">
          <template v-if="profile && profile.user_role !== 'Paper'">
            <template v-if="(showTableData && positions.length > 0) || (showManualTableData && manualPositions.length > 0)">
              <positionRow v-if="showTableData && mergedPositions.length > 0" v-for="position in mergedPositions" :item="position" :key="position.id" />
            </template>
            <div v-else-if="!showTableData || !showManualTableData"
              class="flex">
              <LoadingIcon icon="puff" class="w-8 h-8" />
            </div>
            <div v-else class="flex flex-col items-center mt-8" >
              <div class="text-center">Data not found!!</div>
            </div>
          </template>

          <template v-else>
              <paperTradeRow v-if="showPaperPositions && paperPositions.length > 0" v-for="position in paperPositions" :item="position" :key="position.id" />
                <div v-else-if="!showPaperPositions"
                  class="flex">
                  <LoadingIcon icon="puff" class="w-8 h-8" />
                </div>
                <div v-else class="flex flex-col items-center mt-8" >
                  <div class="text-center">Data not found!!</div>
                </div>
          </template> 
        </div>
      </div>
    </div>
  </div>

  <sqOffPosition />
  <sqoffManual />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { usePositionsStore } from '@/stores/matrix/position'
import { useManualPositionsStore } from '@/stores/groups/manualPosition'
import TotalProfit from '@/stores/utils/totalpnl.vue'
import sqOffPosition from './sqOffPosition.vue'
import sqoffManual  from './sqoffManual.vue'
import positionRow from './positionRow.vue'
import paperTradeRow from './paperTradeRow.vue'
import { useProfileStore } from '@/stores/matrix/profile';
import { usePaperPositionsStore } from "@/stores/matrix/paperPositions";
import { useTickerStore } from '@/stores/matrix/ticker/ticker'

const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);

const paperPositionsStore = usePaperPositionsStore();
const positionsStore = usePositionsStore()
const manualPositionsStore = useManualPositionsStore()
const tickerStore = useTickerStore()

// define interface to ignore type warning error
interface Position {
  id: number
  serialNo: string
  tradingsymbol: string
  strategy_id: number
  broker_id: number
  broker: {
    id: number
    broker_name: string
  }
  user: {
    id: number
    name: string
  }
  strategy: {
    id: number
    name: string
    script: string
    color: string
    image_url: string
  }
  product: string
  quantity: number
  side: string
  buy_price: number
  sell_price: number
  created_at: string
  updated_at: string
  exchange: string
  status: string
  instrument_token: number
}

const positions = computed<Position[]>(() => {
  return positionsStore.positions.map((pos:Position, index: number) => ({
    ...pos,
    serialNo: `position-${index}`
  }));
})

const manualPositions = computed<Position[]>(() => {
  return manualPositionsStore.manualPositions.map((pos: Position, index: number) => ({
    ...pos,
    serialNo: `manualPosition-${index}`
  }));
})

const mergedPositions = computed<Position[]>(() => {
  const allPositions: Position[] = [...positions.value, ...manualPositions.value];
  if(!allPositions.length) {
    return [];
  }
  // Sort positions by updated_at in descending order
  return allPositions.sort((a, b) => {
    const dateA = new Date(a.updated_at).getTime();
    const dateB = new Date(b.updated_at).getTime();
    return dateB - dateA;
  });
});

const showTableData = computed<boolean>(() => {
    const state = positionsStore.state[positionsStore.endpoint];
    return true;
});

const showManualTableData = computed<boolean>(() => {
    const state = manualPositionsStore.state[manualPositionsStore.endpoint];
    return  true;
})

const paperPositions = computed<Position[]>(() => {
  const allPositions: Position[] = paperPositionsStore.paperPositions;

  return allPositions.sort((a, b) => {
    const dateA = new Date(a.updated_at).getTime();
    const dateB = new Date(b.updated_at).getTime();
    return dateB - dateA;
  });
})

const showPaperPositions = computed<boolean>(() => {
  const state = paperPositionsStore.state[paperPositionsStore.endpoint];
  return  true;
});

function getLtp(position: Position) {
  const ltp = tickerStore.getLastPrice(position.instrument_token)
  return ltp || position.last_price
}

function calculatePnL(position: Position) {
  const ltp = getLtp(position)
  let pnl = 0

  if (position.status === "CLOSED") {
    if (position.sell_price && position.buy_price) {
      pnl = position.sell_price * position.quantity - position.buy_price * position.quantity
    }
  } else if (position.status === "OPEN") {
    if (position.side === 'BUY' && position.buy_price && ltp) {
      pnl = (ltp - position.buy_price) * position.quantity
    } else if (position.side === 'SELL' && position.sell_price && ltp) {
      pnl = (position.sell_price - ltp) * position.quantity
    }
  }

  return pnl
}
</script>

<style scoped lang="scss">
.pencil-background {
    border-radius: 100px;
    border: 1px solid rgb(var(--color-primary));
    width: 300px;
    height: 60px;
    background: linear-gradient(to right, rgb(var(--color-primary)) , rgb(var(--color-third)));
    clip-path: polygon(0 19%, 87% 20%, 87% 20%, 100% 54%, 87% 82%, 87% 82%, 0% 80%);
    transition: 0.5s;
}

.dark .pencil-background {
  background: linear-gradient(to right, #000, rgb(var(--color-primary)));
}    
.profit:hover .pencil-background{
    width: 320px;
} 

.mobile-device-table{
  @apply h-[calc(100vh-209px)] w-full overflow-y-scroll;
}
</style>