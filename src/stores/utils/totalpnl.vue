<template>

  <div v-if="profile && profile.user_role !== 'Paper' && grossProfit" class="font-bold" :class="grossProfit < 0 ? 'text-red-400' :grossProfit >0 ? greenColor? greenColor: 'text-green-600 dark:text-green-300':''">
    {{ grossProfit>0?'+':'' }}{{ grossProfit }}
  </div>

  <div v-else-if="totalPaperProfit" class="font-bold" :class="totalPaperProfit < 0 ? 'text-red-400' :totalPaperProfit >0 ? 'text-green-600 dark:text-green-300' :''">
      {{ totalPaperProfit>0?'+':'' }}{{ totalPaperProfit }}
    </div>
  
  
  </template>
  
  <script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { computed,ref } from 'vue';
  import {usePositionsStore} from '@/stores/matrix/position'
  import { useTickerStore } from '@/stores/matrix/ticker/ticker';
  import { useManualPositionsStore } from "@/stores/groups/manualPosition"
  import { usePaperPositionsStore } from "@/stores/matrix/paperPositions";
  import { useProfileStore } from '@/stores/matrix/profile';

  const paperPositionsStore = usePaperPositionsStore();
  
  
  const tickerStore = useTickerStore();
  const positionsStore=usePositionsStore()
  const manualPositionsStore = useManualPositionsStore();
  const profileStore = useProfileStore();
  const { profile } = storeToRefs(profileStore);
  
  const props = defineProps({
    greenColor: {
      type: String,
      default: ''
    }
  });

  function getLtp(position:any) {
    let ltp = tickerStore.getLastPrice(position.instrument_token)
  return  ltp || position.last_price
  }
  
  let totalProfit:any =0
   totalProfit = computed(() => {
    let tp = 0;
    if (positionsStore.positions.length > 0) {
      positionsStore.positions.forEach((position: any) => {
        let pnl = 0;
        let ltp = getLtp(position);
        if (position.status !== "OPEN" ) {
          if(position.sell_price && position.buy_price){
            pnl = position.sell_price * position.quantity - position.buy_price * position.quantity;
          }
        } else if (position.side === 'BUY' ) {
          if(position.buy_price && ltp){
            pnl = (ltp - position.buy_price) * position.quantity;
          }
        } else if (position.side === 'SELL' ) {
          
          if(position.sell_price && ltp){
            pnl = (position.sell_price - ltp) * position.quantity;
          }
        }
        tp += pnl;
      });
    }
    return tp; // Returns string representation of tp with two decimal places
  });



  let totalManualProfit:any =0

  totalManualProfit = computed(() => {
    let tp = 0;
    if (manualPositionsStore.manualPositions.length > 0) {
      manualPositionsStore.manualPositions.forEach((position: any) => {
        let pnl = 0;
        let ltp = getLtp(position);
        if (position.status !== "OPEN" ) {
          if(position.sell_price && position.buy_price){
            pnl = position.sell_price * position.quantity - position.buy_price * position.quantity;
          }
        } else if (position.side === 'BUY' ) {
          if(position.buy_price && ltp){
            pnl = (ltp - position.buy_price) * position.quantity;
          }
        } else if (position.side === 'SELL' ) {
          
          if(position.sell_price && ltp){
            pnl = (position.sell_price - ltp) * position.quantity;
          }
        }
        tp += pnl;  
      });
    }
    return tp; // Returns string representation of tp with two decimal places
  });


  const grossProfit = computed(() => {
    return (totalProfit.value + totalManualProfit.value).toFixed(2) || 0.00
  })



  let totalPaperProfit: any =0
    totalPaperProfit = computed(() => {
      let tp = 0;
      if (paperPositionsStore.paperPositions.length > 0) {
        paperPositionsStore.paperPositions.forEach((position: any) => {
          let pnl = 0;
          let ltp = getLtp(position);
          if (position.status !== "OPEN" ) {
            if(position.sell_price && position.buy_price){
              pnl = position.sell_price * position.quantity - position.buy_price * position.quantity;
            }
          } else if (position.side === 'BUY' ) {
            if(position.buy_price && ltp){
              pnl = (ltp - position.buy_price) * position.quantity;
            }
          } else if (position.side === 'SELL' ) {
            
            if(position.sell_price && ltp){
              pnl = (position.sell_price - ltp) * position.quantity;
            }
          }
          tp += pnl;
        });
      }
      return tp.toFixed(2); 
    });
  
  </script>
  
  