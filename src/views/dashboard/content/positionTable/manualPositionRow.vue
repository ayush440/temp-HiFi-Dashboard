<template>
    <tr class="intro-x" >
            <td class="text-sm" >
                <!-- :is="position.strategy.image_url" -->
                <div class="flex items-center text-nowrap" v-if="position.strategy" >
                <component
                  v-if="containsIcon(position)"
                  :is="position.strategy.image_url"
                  class="h-4 w-4"
                  :style="{ color: position.strategy.color, strokeWidth: 2.5 }"
                />
                &nbsp;{{
                  `${position.strategy.id}- ${position.strategy.name}(${position.strategy.script})`
                }}
                </div>
                <span v-else>{{position.strategy_id}}</span>
              </td>
              
  
              <td>
                <div class="flex items-center text-nowrap" v-if="position.broker">
                  <img class="shadow-none h-4 w-4 mr-2"
                    :src="`${images[position.broker.broker_name]}`"
                    alt=""
                  />
                  &nbsp;{{ `${position.broker.id}- ${position.broker.broker_name}` }}
                </div>
                <span v-else>{{position.broker_id}}</span>
              </td>
              <!-- <td class="text-center text-nowrap">
                {{ `${position.user.id}- ${position.user.name}` }}
              </td> -->
              <td>
                {{ `${position.tradingsymbol}(${position.exchange})` }}
              </td>
              
              <td>
                {{ position.product }}
              </td>
              <td>
                {{ position.side }}
              </td>
              <td>
                {{ position.quantity }}
              </td>
              
              <td class="text-left text-nowrap">
                  <div v-if="position.side === 'BUY' || position.status !== 'OPEN'">
                    <span>{{ position.created_at.replace('Z', '').replace('T', ' ') }}</span>
                    <span> @ {{ position.buy_price }}</span>
                  </div>
                  <div v-else>_</div>
              </td>
              <td class="text-left text-nowrap">
                  <div v-if="position.side === 'SELL' || position.status !== 'OPEN'">
                    <span>{{ position.updated_at.replace('Z', '').replace('T', ' ') }}</span>
                    <span> @ {{ position.sell_price }}</span>
                  </div>
                  <div v-else>_</div>
              </td>
  
              <td>  
                {{ position.status }}
              </td>

              <td class="text-center text-nowrap font-bold"> <span :class="pnl < 0 ? 'text-red-500' : pnl > 0 ? 'text-green-500' : ''">
                    {{ pnl > 0 ? '+' : '' }}
                    {{ pnl }}
                    </span> 
               </td>
    </tr>
  
            
  </template>
  
<script setup lang="ts">
  import { images } from '@/assets/img'
  import { storeToRefs } from 'pinia'
  import { ref, computed } from 'vue'
  import { useManualPositionsStore } from '@/stores/groups/manualPosition'
  import { usePositionsStore } from '@/stores/matrix/position'
  import  { useTickerStore } from '@/stores/matrix/ticker/ticker'
  
  const positionsStore = usePositionsStore()
  const manualPositionsStore = useManualPositionsStore()
  const tickerStore = useTickerStore()
  
  
  // define interface to ignore type warning error
  interface Position {
    id: number
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
    instrument_token: number
    quantity: number
    side: string
    last_price: number
    buy_price: number
    sell_price: number
    created_at: string
    updated_at: string
    exchange: string
    status: string
  }
  

  const props = defineProps({
    item: Object
  })

  const position = computed<Position>(() => {
    const position = props.item
    return position as Position
  })
  
  const containsIcon = (data: any) => {
    if (data.strategy.image_url) {
      return true
    }
    return false
  }



  const last_price = computed(() => {
    let token = (position.value.instrument_token).toString()
    const newTick = tickerStore.getLastPrice(token);
    return newTick || position.value.last_price;
  });

  const pnl = computed(() => {
    let result: number = 0

    if (position.value.status == "OPEN") {
        if (position.value.side == "BUY") {
        if (position.value.buy_price != 0 && last_price.value) {

            result = ((last_price.value - position.value.buy_price) * position.value.quantity)
        } else {
            result = 0
        }

        } else if (position.value.side == "SELL" && last_price.value) {
        if (position.value.sell_price != 0) {
            result = ((position.value.sell_price - last_price.value) * position.value.quantity)
        } else {
            result = 0
        }
        } else {
        result = 0
        }
    } else if (position.value.status == "CLOSED") {
        if (position.value.sell_price != 0 && position.value.buy_price != 0) {
            result = ((position.value.sell_price * position.value.quantity) - (position.value.buy_price * position.value.quantity))
        } else {
            result = 0
        }
    }
    return parseFloat(result.toFixed(2));
})


  
</script>
  


<style scoped>
.intro-x {
  @apply text-sm text-center !important;
}

</style>