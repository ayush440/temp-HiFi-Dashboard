<template>
    <tr class="hidden sm:table-row intro-x">
        <td class="text-center ">
        {{ `${order.created_at.replace('Z', '').replace('T', ' ')}` }}
        </td>
        
        <td>
            <div class="flex items-center text-nowrap capitalize" v-if="order.broker">
                <img class="shadow-none w-4 h-4" :src="`${images[order.broker.broker_name]}`" alt="" />
                &nbsp;{{ `${order.broker.broker_name} (${order.broker.broker_userid})` }}
            </div>
            <span v-else>_</span>
        </td>
        <td class="text-center">
            <div class="flex items-center text-nowrap" v-if="order.strategy">
                <component v-if="containsIcon()"
                    :is="order.strategy.image_url"
                    class="h-4 w-4"
                    :style="{ color: order.strategy.color, strokeWidth: 2.5 }"
                />
                &nbsp;{{ order.strategy.name }} ({{
                    order.strategy.script
                }})
            </div>
            <span v-else>_</span>
        </td>


        <td class="text-center text-nowrap">
            {{ order.tradingsymbol }} ({{ order.exchange }})
        </td>
        <td class="text-center">
            {{ order.quantity }}
        </td>
        <td class="text-center text-nowrap">
            {{order.status === 'COMPLETE' && (order.order_type === 'MARKET' || order.order_type === 'MKT') ? order.average_price : order.price }}
        </td>

        
        <td class="text-center text-nowrap">
            <div :class="{
                'color-success-100': order.status === 'COMPLETE',
                'color-sell-100': order.status === 'REJECTED',
                'color-pending-100':
                    order.status === 'AMO REQ RECEIVED' || order.status === 'CANCELLED'
                }"
                class="content-fit"
            >
                <Tippy
                class="p-1"
                :content="order.status_message"
                v-if="order.status && order.status_message"
                >
                {{ order.status }} @ {{ order.transaction_type }}
                </Tippy>
                <span v-else>{{ order.status }} @ {{ order.transaction_type }}</span>
            </div>
        </td>

        <td class="text-center">
            {{ order.product }}
        </td>
    </tr>










    <!-- for mobile screen  -->

    <div class="intro-x visible sm:hidden relative my-1" :class="{ 'shadow-md dark:shadow-slate-600 ': fullDetails, 'shadow-sm dark:shadow-slate-600': !fullDetails }">
        <div class="px-4" :class="{ 'bg-secondary-dark font-semibold': fullDetails }">
            <div @click="fullDetails = !fullDetails" class="grid col-span-3 grid-flow-col  justify-between items-center py-3 text-[0.6rem] xs:text-xs cursor-pointer" >
            <div class="flex items-center text-nowrap pl-2">
                <div v-if="order.broker && order.broker.id" class="flex items-center"> 
                <img class="shadow-none w-3 h-3 mr-1" :src="`${images[order.broker.broker_name]}`"
                    :alt="order.broker.broker_name"
                />
                
                <!-- time with price  -->
                {{ `${order.created_at.replace('Z', '').replace('T', ' ')}` }} @ Rs.{{order.status === 'COMPLETE' && (order.order_type === 'MARKET' || order.order_type === 'MKT') ? order.average_price : order.price }} </div>
                <RightArrowIcon class="w-[12px] h-[12px] inline ml-1 transform rotate-90 transition transition-delay-300" :class="{ 'rotate-[-90deg]': fullDetails, 'rotate-90': !fullDetails }" />
            </div>

            <div > {{order.quantity }}</div>
                
            <div class="text-end text-xs min-w-24 uppercase">
                <div :class="{
                    'color-success-100': order.status === 'COMPLETE',
                    'color-sell-100': order.status === 'REJECTED',
                    'color-pending-100':
                        order.status === 'AMO REQ RECEIVED' || order.status === 'CANCELLED'
                    }"
                    class="content-fit"
                >
                    <span>{{ order.status }} @ {{ order.transaction_type }}</span>
                </div>
            </div>


            </div>

            
        </div>

        <div v-if="fullDetails" class="p-2 capitalize bg-secondary-dark">
            <div class="flex flex-col text-xs xs:text-sm overflow-hidden bg-secondary border dark:border-slate-600 p-2 pl-4 rounded-lg">

            <div class="flex items-center">
                <div class="font-semibold ">Broker: &nbsp;&nbsp;</div>
                <div v-if="order.broker && order.broker.id" class="flex">
                <img class="shadow-none w-3 h-3 mr-1 mt-1"
                :src="`${images[order.broker.broker_name]}`"
                alt=""
                />
                &nbsp;{{ `${order.broker.broker_name}- ${order.broker.broker_userid}` }}
                </div>
            </div>

            <div class="flex items-center">
                <div class="font-semibold">Strategy: &nbsp;&nbsp;</div>
                <div class="flex items-center">
                <component v-if="containsIcon()" :is="order.strategy.image_url" class="h-3 w-3 mt-1"
                    :style="{ color: order.strategy.color, strokeWidth: 2.5 }"
                />
                &nbsp;{{ order.strategy.name }} ({{ order.strategy.script }})
                </div>
            </div>


            <div class="flex items-center">
                <div class="font-semibold">Script: </div>
                <div class="ml-4">{{ order.tradingsymbol }} ({{ order.exchange }})</div>
            </div>

            
            <div class="flex items-center">
                <div class="font-semibold">Product Type: </div>
                <div class="ml-4">{{ order.product }}</div>
            </div>



            <div v-if="order.status_message" class="flex items-center">
                <div class="font-semibold">Message: </div>
                <div class="ml-4">{{ order.status_message }}</div>
            </div>

            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
  import { images } from '@/assets/img'
  import { storeToRefs } from 'pinia'
  import { ref, computed } from 'vue'
  import { useOrdersStore } from '@/stores/matrix/order'
  const ordersStore = useOrdersStore()
  
  
  // define interface to ignore type warning error
  interface Order {
    id: number
    serialNo: string
    order_id: string
    user_id: number
    broker_id: number
  
    strategy_id: number
  
  
    user: {
      id: number
      name: string
    }
    broker: {
      id: number
      broker_name: string
      broker_userid: string
    }
    tradingsymbol: string
    quantity: number
    product: string
    exchange: string
    status: string
    status_message: string
    transaction_type: string
    average_price: number
    price: number
    order_type: string
    created_at: string
    updated_at: string
    strategy: {
      id: number
      name: string
      script: string
      image_url: string
      color: string
    }
  }

  const fullDetails = ref<boolean>(false)

  const props = defineProps({
    item: Object,
    index: Number
  })

  const order = computed<Order>(() => {
    const orders = props.item
    return orders as Order
  })
  
  const containsIcon = () => {
    return order.value.strategy ? order.value.strategy.image_url && order.value.strategy.image_url.includes('Icon'): false
  }
  
</script>
  