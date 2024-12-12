<template>
    <tr class="hidden sm:table-row intro-x">
      <td class="text-center">
        <div class="flex items-center  text-nowrap" v-if="matrixJoiner.strategy">
        <component v-if="containsIcon(matrixJoiner)"
          :is="matrixJoiner.strategy.image_url" class="h-4 w-4"
          :style="{ color: matrixJoiner.strategy.color, strokeWidth: 2.5 }"
        />
        &nbsp;{{ `${matrixJoiner.strategy.name}(${matrixJoiner.strategy.script})` }}
        </div>
        <span v-else>_</span>
      </td>
      <td>
        <div class="flex items-center text-nowrap" v-if="matrixJoiner.broker">
          <img class="shadow-none w-4 h-4"
            :src="`${images[matrixJoiner.broker.broker_name]}`"
          />
          &nbsp;{{ `${matrixJoiner.broker.broker_name} (${matrixJoiner.broker.broker_userid})` }}
        </div>
        <span v-else>_</span>
      </td> 
      
      <td class="text-center">
        {{ matrixJoiner.lots }}
      </td>
      <td class="text-center">
        {{ matrixJoiner.re_entry }}
      </td>
      <td class="text-center">
        {{ matrixJoiner.re_entry_triggered }}
      </td>
      <td class="flex justify-center">
        <ButtonSwitch @change="handleActiveChange" :id="`${matrixJoiner.id}is_active`" name="is_active" v-model="matrixJoiner.is_active"/>
      </td>
      <td class="text-center text-nowrap">
        {{ matrixJoiner.created_at?matrixJoiner.created_at.replace("T"," ").replace("Z",""): '' }}
      </td>
      <td class="">
        <div class="flex justify-center items-center	">
          <button class="mr-2 flex items-center" @click="showEdit(matrixJoiner)">
            <EditIcon class="w-4 h-4" />Edit
          </button>
          <button class="delete-btn flex items-center" @click="deleteModal(matrixJoiner.id)">
            <DeleteIcon class="w-4 h-4" />Delete
          </button>
        </div>
      </td>
    </tr>








  <!-- for mobile screen  -->

  <div class="intro-x visible sm:hidden relative my-1" :class="{ 'shadow-md dark:shadow-slate-600 ': fullDetails, 'shadow-sm dark:shadow-slate-600': !fullDetails }">
      <div :class="{ 'bg-secondary-dark font-semibold': fullDetails }">
        <div @click="fullDetails = !fullDetails" class="flex justify-between items-center py-3 text-[0.6rem] xs:text-xs cursor-pointer unselectable" >
         
          <!-- strategy  -->
          <div class="flex flex-wrap items-center ml-1 min-w-[120px] uppercase">
            <template v-if="matrixJoiner.strategy">
              <component v-if="containsIcon(matrixJoiner)"
                :is="matrixJoiner.strategy.image_url" class="h-3 w-3"
                :style="{ color: matrixJoiner.strategy.color, strokeWidth: 2.5 }"
              />
              &nbsp;{{ matrixJoiner.strategy.name.split(' ').map((word: string) => word[0]).join('') }} <div> ({{ matrixJoiner.strategy.script }})</div>
            </template>
            <template v-else>_</template>
            <RightArrowIcon class="w-[12px] h-[12px] inline ml-1 transform rotate-90 transition transition-delay-300" :class="{ 'rotate-[-90deg]': fullDetails, 'rotate-90': !fullDetails }" />
          </div>

          <!-- lots  -->
          <div class="flex items-center px-2">
            <img v-if="matrixJoiner.broker" class="shadow-none w-3 h-3"
              :src="`${images[matrixJoiner.broker.broker_name]}`"
            />&nbsp;{{ matrixJoiner.lots }}
          </div>

          <!-- is_active -->
          <ButtonSwitch @change="handleActiveChange"  :id="`${matrixJoiner.id}is_active`" name="is_active" v-model="matrixJoiner.is_active" />
        </div>

        
      </div>

      <div v-if="fullDetails" class="p-2 capitalize bg-secondary-dark">
        <div class="flex flex-col text-xs xs:text-sm overflow-hidden bg-secondary border dark:border-slate-600 p-2 pl-4 rounded-lg">

          <div class="flex items-center">
            <div class="font-semibold">Strategy: </div>
            <div v-if="matrixJoiner.strategy" class="flex ml-4">
              <component v-if="containsIcon(matrixJoiner)"
                :is="matrixJoiner.strategy.image_url" class="h-3 w-3 mt-1"
                :style="{ color: matrixJoiner.strategy.color, strokeWidth: 2.5 }"
              />
              &nbsp;{{
                `${matrixJoiner.strategy.name}(${matrixJoiner.strategy.script})`
              }}
            </div>
            <div v-else>_</div>
          </div>

          

          <div class="flex items-center">
            <div class="font-semibold">Broker Name: </div>
            <div v-if="matrixJoiner.broker" class="flex ml-4">
              <img class="shadow-none w-3 h-3 mt-1"
                :src="`${images[matrixJoiner.broker.broker_name]}`"
              />
              &nbsp;{{ `${matrixJoiner.broker.broker_name}- ${matrixJoiner.broker.broker_userid}` }}
            </div>
            <div v-else>_</div>
          </div>

          <div class="flex items-center">   
            <div class="font-semibold">ReEntry: </div>
            <div class="ml-4">{{ matrixJoiner.re_entry }}</div>  
          </div>

          <div class="flex items-center">   
            <div class="font-semibold">ReEntry Triggered: </div>
            <div class="ml-4"> {{ matrixJoiner.re_entry_triggered }}</div>  
          </div>

          <div class="flex items-center">   
            <div class="font-semibold">Joined At: </div>
            <div class="ml-4"> {{ matrixJoiner.created_at?matrixJoiner.created_at.replace("T"," ").replace("Z",""): '' }} </div>  
          </div>


          <div class="m-1 flex items-center">
            <div class="flex flex-wrap justify-left">
              <div class="font-semibold mr-2">ACTIONS: </div>

              <button class="mr-2 flex items-center" @click="showEdit(matrixJoiner)">
                <EditIcon class="w-4 h-4" />Edit
              </button>
              <button class="delete-btn flex items-center" @click="deleteModal(matrixJoiner.id)">
                <DeleteIcon class="w-4 h-4" />Delete
              </button>
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
  import { useMatrixJoinersStore } from '@/stores/matrix/matrixJoiner'

  
  const matrixJoinersStore = useMatrixJoinersStore()
  const { showAddEditModal, addEditMatrixJoinerData, showDeleteConfirmationModal, idForDelete,
  } = storeToRefs(matrixJoinersStore)
  const { addEditMatrixJoiner } = matrixJoinersStore

  
  // define interface to ignore type warning error
  interface MatrixJoiner {
    id: number
    strategy_id: number
    broker_id: number
    broker: any
    user: any
    strategy: any
    lots: number
    re_entry: number
    re_entry_triggered: number
    is_active: boolean
    created_at: string
    updated_at: string
  }

  const props = defineProps({
    item: Object
  })

  const fullDetails = ref<boolean>(false)
  const matrixJoiner = computed<MatrixJoiner>(() => {
    const matrixJoiner = props.item as MatrixJoiner
    return matrixJoiner
  })
  
  const handleActiveChange = async() => {
    matrixJoiner.value.is_active = !matrixJoiner.value.is_active
    await addEditMatrixJoiner(matrixJoiner.value.id, {"is_active":matrixJoiner.value.is_active? false : true})
  }
  
  const containsIcon = (data: any) => {
    return data.strategy.image_url?true:false
  }
  
  const showEdit = (data: any) => {
    showAddEditModal.value = true
    addEditMatrixJoinerData.value = data
  }
  
  const deleteModal = (id: number) => {
    showDeleteConfirmationModal.value = true
    idForDelete.value = id
  }
  </script>
  