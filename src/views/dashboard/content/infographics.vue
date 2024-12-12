<template>
  <div class="w-full bg-white p-6 rounded-lg shadow-sm">
    <div class="mb-6">
      <h2 class="text-lg font-semibold text-gray-800">Today's Sales</h2>
      <p class="text-sm text-gray-500">Sales Summary</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Total Profit -->
      <div class="bg-[#F5F7FF] rounded-lg p-6">
        <div class="w-12 h-12 bg-[#6366F1] bg-opacity-20 rounded-full flex items-center justify-center mb-4">
          <ChartLineIcon class="w-6 h-6 text-[#6366F1]" />
        </div>
        <div class="flex items-baseline gap-1">
          <TotalProfit class="text-2xl font-bold" />
          <span class="text-2xl font-bold text-[#119943]">K</span>
        </div>
        <p class="text-sm text-gray-600 mt-1">Total Profit</p>
        <p class="text-xs text-[#22C55E] mt-1">+8% from yesterday</p>
      </div>

      <!-- Brokers Connected -->
      <div class="bg-[#F5F7FF] rounded-lg p-6">
        <div class="w-12 h-12 bg-[#6366F1] bg-opacity-20 rounded-full flex items-center justify-center mb-4">
          <NetworkIcon class="w-6 h-6 text-[#6366F1]" />
        </div>
        <h3 class="text-2xl font-bold">{{ brokersTokenMessage }} / 10</h3>
        <p class="text-sm text-gray-600 mt-1">Brokers Connected</p>
        <p class="text-xs text-[#22C55E] mt-1">+4% from yesterday</p>
      </div>

      <!-- Total Orders -->
      <div class="bg-[#F5F7FF] rounded-lg p-6">
        <div class="w-12 h-12 bg-[#6366F1] bg-opacity-20 rounded-full flex items-center justify-center mb-4">
          <ShoppingCartIcon class="w-6 h-6 text-[#6366F1]" />
        </div>
        <h3 class="text-2xl font-bold">{{ totalOrders }}</h3>
        <p class="text-sm text-gray-600 mt-1">Total Orders</p>
        <p class="text-xs text-[#22C55E] mt-1">+3% from yesterday</p>
      </div>
    </div>

    <!-- Keeping the original elements to maintain functionality, but hiding them visually -->
    <div class="hidden">
      <div class="border border-gray-50 shadow rounded overflow-hidden min-w-64"> 
        <div class="flex items-center justify-center px-4 sm:px-0 border-y-0 border-r-0 border-l-4 border-blue-600 border text-lg sm:text-xl h-[80px]">
          <OrderIcon class="w-6 h-6 mr-2" />  <div><b> {{ totalOrders }} </b> Orders </div>
        </div>  
      </div>
      
      <div class="border border-gray-50 shadow rounded overflow-hidden min-w-64"> 
        <div class="flex items-center justify-center px-4 sm:px-0 border-y-0 border-r-0 border-l-4 border-green-600 border text-lg sm:text-xl h-[80px]">
          <ProfitIcon class="w-6 h-6 mr-2" />  <div class="flex"><TotalProfit/> <span class="ml-1">Profits</span> </div>
        </div>  
      </div>
    
      <div class="border border-gray-50 shadow rounded overflow-hidden min-w-64"> 
        <div class="flex items-center justify-center px-4 sm:px-0 border-y-0 border-r-0 border-l-4 border-orange-600 border text-lg sm:text-xl h-[80px]">
          <ConnectedIcon class="w-6 h-6 mr-2" />  <div><b> {{ brokersTokenMessage }} </b> Brokers Connected </div>
        </div>  
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { ChartLineIcon, BoltIcon, ShoppingCartIcon, NetworkIcon } from 'lucide-vue-next'
import TotalProfit from '@/stores/utils/totalpnl.vue'
import {useProfileStore} from '@/stores/matrix/profile'
import { useBrokersStore } from "@/stores/matrix/broker";
import { useOrdersStore } from "@/stores/matrix/order";
import { useManualOrdersStore } from "@/stores/groups/manualOrders"

const manualOrdersStore = useManualOrdersStore();

const profileStore = useProfileStore();

const brokersStore = useBrokersStore();
const ordersStore = useOrdersStore();

const { brokers } = storeToRefs(brokersStore);
const { totalRecords  } = storeToRefs(ordersStore);

const profile = computed(() => {
  return profileStore.profile;
});
let expire_at: any;
expire_at = computed(() => {
  if (profileStore.profile) {
    try {
      return profileStore.profile.expire_at.split("T")[0];
    } catch {
      return "";
    }
  }
});

const props = defineProps({
  heading: String,
  content: String,
  icon: String,
  color: String,
  iconNumber: Number,
});


interface Broker {
  id: number;
  broker_name: string;
  broker_token_date: string;
  token_status: string;
  message: string;
  updated_at: string;

}

interface BrokerArray extends Array<Broker> {}

const brokersData = computed<BrokerArray>(() => brokers.value);

var brokersTokenMessage = computed(() => {
     const totalBrokers = brokersData.value.length;
     if (totalBrokers > 0) {
       const today = new Date().toISOString().split("T")[0];
       const connectedBrokers = brokersData.value.filter((broker: any) => broker.broker_token_date.split("T")[0] === today && broker.token_status === "success").length;
       return connectedBrokers;
     } else {
       return 0;
     }
   });


const totalOrders = computed(() => {
  let order = ordersStore.totalOrders
  let manualOrder = manualOrdersStore.totalManualOrders
  if(order || manualOrder) {
      return order + manualOrder
  }
  return 0
});

</script>

<style lang="scss" scoped>
.icon {
  // background-image: linear-gradient(#020619, #4796ac);
  background: #5a96a9;
  border-radius: 10px;
  color: white;
  font-size: 2.3em;
  height: 45px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

