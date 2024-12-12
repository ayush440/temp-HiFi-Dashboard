<template>
  <!-- <div class="px-3 py-2 text-lg font-medium">Orders</div> -->

  <div class="flex flex-wrap justify-between px-4">
    <div class="empty-btn"> 
      
    </div>
    
    
    <div v-if="showEndRecords > 0" class="flex items-center text-center  pagination-text">
      Showing {{ showStartRecords }} to {{ showEndRecords }} of {{ totalRecords }} entries
    </div>
    <div v-else class="flex items-center  text-center pagination-text">
      Showing 0 to {{ 0 }} of {{ 0 }} entries
    </div>
    
    <div class="w-56 relative">
      <input
        type="text"
        v-model="searchInputText"
        class="search-box"
        placeholder="Search..."
        @keyup.enter="searchGlobally"
      />
      <SearchIcon
        @click="searchGlobally"
        class="cursor-pointer w-5 h-5 absolute my-auto inset-y-0 mr-3 right-0"
      />
    </div>
  </div>


  <div class="grid grid-cols-12 gap-6">
    <div class="intro-y col-span-12 h-[72vh] overflow-scroll">
      <table class="table table-report w-full">
        <thead>
          <tr class="text-start">
            <th class="text-center whitespace-nowrap">Time</th>
            <th class="text-center whitespace-nowrap">Broker</th>
            <th class="text-center whitespace-nowrap">Strategy</th>
            <th class="text-center whitespace-nowrap">Script</th>
            <th class="text-center whitespace-nowrap">Quantity</th>
            <th class="text-center whitespace-nowrap">Price</th>
            <th class="text-center whitespace-nowrap">Product Type</th>
            <th class="text-center whitespace-nowrap">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="showTableData && manualOrders.length > 0" v-for="order in manualOrders" :key="order.id" class="intro-x">
            <td class="text-center ">
              {{ `${order.created_at.replace('Z', '').replace('T', ' ')}` }}
            </td>
            
            <td>
              <div class="flex items-center text-nowrap" v-if="order.broker">
                <img
                  class="shadow-none w-4 h-4 mr-2"
                  :src="'src/assets/img/' + `${order.broker.broker_name}` + '.png'"
                  alt=""
                />
                &nbsp;{{ `${order.broker.id}- ${order.broker.broker_name}` }}
              </div>
              <span v-else>{{order.broker_id}}</span>
            </td>
            
            <td class="text-center">
              <div class="flex items-center text-nowrap" v-if="order.strategy">
                <component v-if="containsIcon(order)" :is="order.strategy.image_url"
                class="h-4 w-4" :style="{ color: order.strategy.color, strokeWidth: 2.5 }" />
                  &nbsp;{{ `${order.strategy.id}- ` }}{{ order.strategy.name }} ({{ order.strategy.script }})
              </div>
            </td>

            <td class="text-center text-nowrap">
              {{ order.tradingsymbol }} ({{ order.exchange }})
            </td>
            <td class="text-center">
              {{ order.quantity }}
            </td>
            <td class="text-center text-nowrap">
              {{ order.average_price }}
            </td>

            <td class="text-center">
              {{ order.product }}
            </td>
            
            <td class="text-center text-nowrap">
              <div
                :class="{
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
          </tr>


          <div v-else-if="!showTableData"
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



  <div class="mt-4 flex justify-center">
        <button @click="prevPage" class="pagination-btn" :disabled="currentPageNumber === 1">
          Previous
        </button>
        <button
          v-for="i in visiblePages"
          @click="pageNumber(i)"
          :disabled="i === '...' || i === currentPageNumber"
          :class="{ 'pagination-btn': true, active: i === currentPageNumber }"
        >
          {{ i }}
        </button>
        <button @click="nextPage" class="pagination-btn" :disabled="currentPageNumber === totalPages">
          Next
        </button>
        <span class="ml-4 mt-1 pagination-text">Page {{ totalRecords?currentPageNumber:0 }} of {{ totalPages }}</span>
    </div>
  
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, watch, computed, onUnmounted, onBeforeMount } from 'vue'
import { useManualOrdersStore } from './../../stores/groups/manualOrders'
const manualOrdersStore = useManualOrdersStore()
const { searchInputText, totalPages, showStartRecords, showEndRecords, currentPageNumber, totalRecords  } = storeToRefs(manualOrdersStore)
const { getManualOrders } = manualOrdersStore


// define interface to ignore type warning error
interface Order {
  id: number
  order_id: string
  user_id: number
  broker_id: number

  strategy_id: number
  group_id: number


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
const manualOrders = computed<Order[]>(() => {
  if(manualOrdersStore.manualOrders.length > 0){
    return manualOrdersStore.manualOrders.sort((a: any, b: any) => b.id - a.id)
  } else {
    return []
  }
})

const showTableData = computed<boolean>(() => {
    const state = manualOrdersStore.state[manualOrdersStore.endpoint];
    return state && state.loading === false;
});

const containsIcon = (data: any) => {
  if (data.strategy.image_url) {
    return true
  }
  return false
}

let debounceTimer: NodeJS.Timeout | null = null;

  const debounce = (func: () => void, delay: number) => {
    clearTimeout(debounceTimer!);
    debounceTimer = setTimeout(func, delay);
  };


  watch(searchInputText, (newSearch, oldSearch) => {
    if (newSearch !== oldSearch) {
      debounce(searchGlobally, 500);
    }
  })

  const searchGlobally = () => {
    currentPageNumber.value = 1
    getManualOrders()
  }


  onUnmounted(() => {
    if(currentPageNumber.value > 1 && searchInputText.value !== ''){
      currentPageNumber.value = 1
      searchInputText.value = ''
      getManualOrders()
    }
  });

  onBeforeMount(() => {
    getManualOrders()
  })



const visiblePages: any = computed(() => {
    const range = 3
    const start = Math.max(1, currentPageNumber.value - range)
    const end = Math.min(totalPages.value, Math.max(range, currentPageNumber.value + 2))

    const pages = []
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (start > 1) {
      pages.unshift('...')
    }
    if (end < totalPages.value) {
      pages.push('...')
    }

    return pages
  })

  const prevPage = () => {
    if (currentPageNumber.value > 1) {
      currentPageNumber.value = currentPageNumber.value - 1
      getManualOrders()
    }
  }
  const nextPage = () => {
    if (currentPageNumber.value < totalPages.value) {
      currentPageNumber.value = currentPageNumber.value + 1
      getManualOrders()
    }
  }
  const pageNumber = (page: any) => {
    currentPageNumber.value = page
    getManualOrders()
  }

</script>
