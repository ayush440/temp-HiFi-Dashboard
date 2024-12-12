<template>
    <div class="w-full h-full md:h-full bg-[third]">
      <div class="mt-5 mx-12 rounded-lg flex flex-col justify-center border border-secondary bg-secondary ">
        <div class="table-container text-nowrap">
          <table class="mb-2 pb-5">
            <thead>
              <tr class="text-start">
                <th class="text-center whitespace-nowrap">Date</th>
                <th class="text-center whitespace-nowrap">Script</th>
                <th class="text-center whitespace-nowrap">Qty</th>
                <th class="text-center whitespace-nowrap">Buy Price</th>
                <th class="text-center whitespace-nowrap">Quantity</th>
                <th class="text-center whitespace-nowrap">Sell Price</th>
                <th class="text-center whitespace-nowrap">Pnl</th>
                <th class="text-center whitespace-nowrap">Status</th>
              </tr>
            </thead>
    
            <tbody>
              <!-- This is not completed -->
              <tr>
                <td colspan="10" class="text-center"> Details Not Found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
  </template>
  
  <script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { ref, computed } from 'vue'
  import { useOrdersStore } from '@/stores/matrix/order'
  const ordersStore = useOrdersStore()
  // define interface to ignore type warning error
  interface Order {
    id: number
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
    return ordersStore.orders || []
  })
  
  const containsIcon = (order: any) => {
    if (order.strategy.image_url) {
      return true
    }
    return false
  }
  
  </script>
  