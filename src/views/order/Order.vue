<template>
  <div class="w-full h-full md:h-full bg-[thirds]">

    <div class=" mt-5  ml-6 mr-6  rounded-lg flex flex-col justify-center border border-secondary-bold bg-secondary ">
      <div class="flex flex-wrap sm:flex-nowrap justify-end sm:justify-between items-center px-1 sm:px-4 h-14">
        <div class="flex sm:w-auto justify-between items-center">
          <div class="font-semibold text-gray-700 dark:text-tableText mr-1 sm:mr-2">
            {{ mergedOrders.length }} Orders
          </div>

        </div>
      </div>

      <div class="hidden sm:block">
        <div class="table-container text-nowrap">
          <table class="mb-2 pb-5">
            <thead>
              <tr class="text-start">
                <th class="text-center whitespace-nowrap">Time</th>
                <th class="text-center whitespace-nowrap">Broker</th>
                <th class="text-center whitespace-nowrap">Strategy</th>
                <th class="text-center whitespace-nowrap">Script</th>
                <th class="text-center whitespace-nowrap">Quantity</th>
                <th class="text-center whitespace-nowrap">Price</th>
                <th class="text-center whitespace-nowrap">Status</th>
                <th class="text-center whitespace-nowrap">Product Type</th>
              </tr>
            </thead>

            <tbody>
              <template v-if="(showTableData && orders.length > 0) || (showManualTableData && manualOrders.length > 0)">
                <orderRow v-if="showTableData && mergedOrders.length > 0" v-for="(order, i) in mergedOrders" :item="order" :index="i+1" />
              </template>
              
              <div v-else-if="!showTableData || !showManualTableData"
                class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center">
                <LoadingIcon icon="puff" class="w-8 h-8" />
              </div>

              <tr v-else>
                <td colspan="10" class="text-center">No Orders Found</td>
              </tr>
              
            </tbody>
          </table>

        </div>
      </div>






      <!-- for mobile device  -->    

      <div class="visible sm:hidden" >
        <div class="flex justify-between font-bold text-sm xs:text-base bg-third text-tabletext dark:bg-primary py-3 px-4 shadow dark:shadow-tabletext">
          <div> Price </div>
          <div class="">Quantity</div>
          <div>Status</div>
        </div>

        <div class="mobile-device-table">
          <template v-if="(showTableData && orders.length > 0) || (showManualTableData && manualOrders.length > 0)">
            <orderRow v-if="showTableData && mergedOrders.length > 0" v-for="(order, i) in mergedOrders" :item="order" :index="i+1" />
          </template>
          
          <div v-else-if="!showTableData || !showManualTableData"
            class="flex">
            <LoadingIcon icon="puff" class="w-8 h-8" />
          </div>

          <div v-else class="flex flex-col items-center mt-8" >
            <div class="text-center">Orders not found!!</div>
          </div>
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
import { useManualOrdersStore } from '@/stores/groups/manualOrders'
  
import orderRow from './orderRow.vue'
const ordersStore = useOrdersStore()
const manualOrdersStore = useManualOrdersStore()


// define interface to ignore type warning error
interface Order {
  id: number
  serialNo:string
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

const orders = computed<Order[]>(() => {
  return ordersStore.orders.map((order:Order, index: number) => ({
    ...order,
    serialNo: `order-${index}`
  }))
})

const manualOrders = computed<Order[]>(() => {
  return manualOrdersStore.manualOrders.map((manualOrder:Order, index: number) => ({
    ...manualOrder,
    serialNo: `manualOrder-${index}`
  }))
})

const mergedOrders = computed<Order[]>(() => {
  const allOrders: Order[] = [...orders.value, ...manualOrders.value];
  if(!allOrders.length) {
    return [];
  }
  // Sort orders by updated_at in descending order
  return allOrders.sort((a, b) => { 
    const dateA = new Date(a.updated_at).getTime();
    const dateB = new Date(b.updated_at).getTime();
    return dateB - dateA;
  });
});

const showTableData = computed<boolean>(() => {
    const state = ordersStore.state[ordersStore.endpoint];
    return state && state.loading === false;
});

const showManualTableData = computed<boolean>(() => { 
    const state = manualOrdersStore.state[manualOrdersStore.endpoint];
    return state && state.loading === false;
})

</script>


<style scoped>
.mobile-device-table{
  @apply h-[calc(100vh-209px)] w-full overflow-scroll;
}

</style>