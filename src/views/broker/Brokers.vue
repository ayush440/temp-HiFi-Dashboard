
<template>
  <div class="w-[100%] h-full bg-third">

    <div class="mt-5  ml-6 mr-6  rounded-lg flex flex-col justify-center border border-secondary bg-secondary ">
      <div class="flex justify-between items-center border-b border-third shadow shadow-third px-1 sm:px-4 h-14">
        <div class="flex items-center">
          <button class="add-new-btn font-semibold" @click="showAddEditModal = true"> Add New Broker </button>
          <div v-if="!showUpdatingData" class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <LoadingIcon icon="puff" class="w-6 h-6" />
            </div>
        </div>
        
        <div class="flex sm:w-auto justify-between items-center">
          <div class="font-semibold text-gray-700 dark:text-tableText mr-1 sm:mr-2">
            <span>{{ brokers.length }}</span> Brokers
          </div>
        </div>
      </div>

      <div class="hidden sm:block">
        <div class="table-container text-nowrap">

          <table class="mb-2 pb-5">
            <thead>
              <tr class="text-start">
                <th class="text-center whitespace-nowrap">Broker</th>
                <th class="text-center whitespace-nowrap">Broker UserId</th>
                <th class="text-center whitespace-nowrap">Token Date</th>
                <th class="text-center whitespace-nowrap">Active</th>
                <th class="text-center whitespace-nowrap">Connect</th>
                <th class="text-center whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              <brokersRow v-if="showBrokersTable && brokers.length > 0" v-for="broker, i in brokers" :key="i"
                        :item="broker" :index="i+1"/>

              <div v-else-if="!showBrokersTable"
                  class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center">
                  <LoadingIcon icon="puff" class="w-8 h-8" />
              </div>

              <div v-else class="flex flex-col items-center mt-8" >
                <img :src="noUsers" alt="" class="w-10 h14">
                <div class="text-center">Brokers not found!!</div>
              </div>
            </tbody>
          </table>

        </div>
      </div>






      <!-- for mobile device  -->    

      <div class="visible sm:hidden">
          <div class="grid grid-cols-2 gap-1 font-bold bg-third text-tableText dark:bg-primary py-3 px-4 shadow dark:shadow-tableText">
            <div class="text-center">Broker</div>
            <div class="text-end">Active</div>
          </div>

          <div class="mobile-device-table">
            <brokersRow v-if="showBrokersTable && brokers.length > 0" v-for="broker, i in brokers" :key="i"
              :item="broker" :index="i+1" />

            <div v-else-if="!showBrokersTable"
                    class="flex">
                    <LoadingIcon icon="puff" class="w-8 h-8" />
                </div>

            <div v-else class="flex flex-col items-center mt-8" >
              <img :src="noUsers" alt="" class="w-10 h14">
              <div class="text-center">Brokers not found!!</div>
            </div>
          </div>
          
      </div>


    </div>
    
  </div>

  <AddEdit />
  <DeleteBrokerModal />

  <ordersKite v-if="showBrokerName == 'zerodha'"/>
  <ordersAlice v-else-if="showBrokerName == 'alice'" />
  <ordersAngel v-else-if="showBrokerName == 'angel'" />
  <ordersIIFL v-else-if="showBrokerName == 'iifl'" />
  <ordersMhTrade v-else-if="showBrokerName == 'mhtrade'" />
  <ordersUpstox v-else-if="showBrokerName == 'upstox'" />
  <ordersShoonya v-else-if="showBrokerName == 'shoonya'" />
  <ordersDhan v-else-if="showBrokerName == 'dhan'" />
  <ordersSwastika v-else-if="showBrokerName == 'swastika'" />
  <ordersGopocket v-else-if="showBrokerName == 'gopocket'" />
  <ordersMoswal v-else-if="showBrokerName == 'moswal'" />
  
  <brokerPosSqoffModal />

</template>

<script setup lang="ts">
import noUsers from '@/assets/svgs/no-users.svg'
import { ref,watch, computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useBrokersStore } from '@/stores/matrix/broker'
import AddEdit from './addEdit.vue'
import DeleteBrokerModal from './deleteBrokerModal.vue'
import  brokersRow from './brokersRow.vue'

import ordersKite from './order-position/ordersKite.vue'
import ordersAlice from './order-position/ordersAlice.vue'
import ordersAngel  from './order-position/ordersAngel.vue'
import ordersIIFL from './order-position/ordersIIFL.vue'
import ordersMhTrade from './order-position/ordersMhTrade.vue'
import ordersUpstox from './order-position/ordersUpstox.vue'
import ordersShoonya from './order-position/ordersShoonya.vue'
import ordersDhan from './order-position/ordersDhan.vue'
import ordersSwastika from './order-position/ordersSwastika.vue'
import ordersGopocket from './order-position/ordersGopocket.vue'
import ordersMoswal from './order-position/ordersMoswal.vue'

import brokerPosSqoffModal from './order-position/brokerPosSqoffModal.vue'

const brokersStore = useBrokersStore()
const { showAddEditModal, showBrokerName } = storeToRefs(brokersStore)

// define interface to ignore type warning error
interface Broker {
  id: number
  broker_name: string
  user_id: number
  user_name: string
  broker_token_date: string
  is_disabled: boolean
  is_active: boolean
  updated_at: string
  message: string
  token_status: string

}
const brokers = computed<Broker[]>(() => {
  return brokersStore.brokers
})


const showBrokersTable = computed<boolean>(() => {
    const state = brokersStore.state[brokersStore.endpoint];
    return true;
});

const showUpdatingData = computed<boolean>(() => {
    const state = brokersStore.state[brokersStore.endpoint];
    return true;
});

</script>

<style scoped>
.mobile-device-table{
  @apply h-[calc(100vh-209px)] w-full overflow-scroll;
}

</style>