<template>
    <div class="w-full h-full md:h-full bg-third">
      <div class="mt-5 ml-6 mr-6 rounded-lg flex flex-col justify-center border border-secondary bg-secondary  ">
        <div class="flex flex-wrap sm:flex-nowrap justify-end sm:justify-between items-center border-b border-third shadow shadow-third px-1 sm:px-4 h-14 ">
          <div class="flex sm:w-auto justify-between items-center">
            <div class="font-semibold text-gray-700 dark:text-tableText mr-1 sm:mr-2">
            {{ matrixJoiners.length }} Strategy Joined
            </div>
          </div>
        </div>

        <div class="hidden sm:block">
          <div class="table-container text-nowrap ">
            <table class="mb-2 pb-5">
              <thead>
                <tr class="text-start">
                  <!-- <th class="text-center whitespace-nowrap">Joiner Id</th> -->
                  <th class="text-center whitespace-nowrap">Strategy</th>
                  <th class="text-center whitespace-nowrap">Broker</th>
                  <!-- <th class="text-center whitespace-nowrap">User</th> -->
                  <th class="text-center whitespace-nowrap">Lot Size</th>
                  <th class="text-center whitespace-nowrap">ReEntry</th>
                  <th class="text-center whitespace-nowrap">ReEntry Triggered</th>
                  <th class="text-center whitespace-nowrap">Active</th>
                  <th class="text-center whitespace-nowrap">Joined At</th>
                  <th class="text-center whitespace-nowrap">ACTIONS</th>
                </tr>
              </thead>

              <tbody>

                <matrixJoinerRow v-if="matrixJoiners.length > 0" v-for="matrixJoiner, i in matrixJoiners" :key="i"
                  :item="matrixJoiner"
                />

                <div v-else-if="!showTableData"
                  class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center">
                  <LoadingIcon icon="puff" class="w-8 h-8" />
                </div>

                <div v-else class="flex flex-col items-center mt-8" >
                  <div class="text-center"> Data not found!!</div>
                </div>
                
              </tbody>
            </table>

          </div>
        </div>






        <!-- for mobile device  -->    
        <div class="visible sm:hidden">
          <div class="flex justify-between font-bold text-sm xs:text-base bg-third text-tabletext dark:bg-primary py-3 px-4 shadow dark:shadow-tabletext">
              <div class="min-w-[100px]">Strategy</div>
              <div>Lot Size</div>
              <div class="">Active</div>
          </div>

          <div class="mobile-device-table">
            <matrixJoinerRow v-if="matrixJoiners.length > 0" v-for="matrixJoiner, i in matrixJoiners" :key="i"
              :item="matrixJoiner"
            />

            <div v-else-if="!showTableData" class="flex">
              <LoadingIcon icon="puff" class="w-8 h-8" />
            </div>

            <div v-else class="flex flex-col items-center mt-8" >
              <div class="text-center">Joiners not found!!</div>
            </div>
          </div>
        </div>


      </div>
    </div>
  <AddEditMatrixJoiner />
  <DeleteMatrixJoiner />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useMatrixJoinersStore } from '@/stores/matrix/matrixJoiner'


import AddEditMatrixJoiner from './addEditMatrixJoiner.vue'
import DeleteMatrixJoiner from './deleteMatrixJoiner.vue'
import matrixJoinerRow from './matrixJoinerRow.vue'
const matrixJoinersStore = useMatrixJoinersStore()



// define interface to ignore type warning error
interface MatrixJoiner {
  id: number
  strategy_id: number
  broker_id: number
  broker: any
  user: any
  strategy: any
  quantity: number
  re_entry: number
  re_entry_triggered: number
  is_active: boolean
  created_at: string
}
const matrixJoiners = computed<MatrixJoiner[]>(() => {
  return matrixJoinersStore.matrixJoiners.sort((a: any, b: any) => b.id - a.id)
})

const showTableData = computed<boolean>(() => {
    const state = matrixJoinersStore.state[matrixJoinersStore.endpoint];
    return state && state.loading === false;
});


</script>



<style scoped>
.mobile-device-table{
  @apply h-[calc(100vh-209px)] w-full overflow-scroll;
}

</style>