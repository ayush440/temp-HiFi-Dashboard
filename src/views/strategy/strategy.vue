<template>
    <tr class="hidden sm:table-row intro-x capitalize">
      <td class="text-center" >
        <div class="flex items-center  text-nowrap" >
        <component v-if="data.image_url"
          :is = "data.image_url" class="h-4 w-4"
          :style="{ color: data.color, strokeWidth: 2.5 }"
        />
        &nbsp;{{ `${data.name}(${data.script})` }}
        </div>
      </td>
      <td class="text-center text-nowrap">
        {{ data.capital_required }}
      </td>
      <td class="text-center text-nowrap">
        {{ data.risk }}
      </td>
      <td @click="showMessageModal" class="text-center text-nowrap cursor-pointer">
          <Tippy tooltipDirection="top" class="p-2" :content="data.message">
            <EyeIcon class="h-4 w-4" />
          </Tippy>
      </td>
      <td class="text-center text-nowrap">
        {{ data.expiry_date }}
      </td>

      <td>
        <div class="flex justify-center items-center	">
          <button class="mr-2 flex items-center" @click="showJoinModal()" :class="{ 'hidden': !props.isActive }">
              <EditIcon class="w-4 h-4" />Join
          </button>
          <button class="mr-2 flex items-center" @click="gotoinfo()">
            <EyeIcon class="w-5 h-5" />Info
          </button>
        </div>
      </td>
    </tr>

    <!-- for mobile screen  -->

  <div class="intro-x visible sm:hidden relative my-1" :class="{ 'shadow-md dark:shadow-slate-600 ': fullDetails, 'shadow-sm dark:shadow-slate-600': !fullDetails }">
      <div class="px-2" :class="{ 'bg-secondary-dark font-semibold': fullDetails }">
        <div @click="fullDetails = !fullDetails" class="grid col-span-3 grid-flow-col  justify-between items-center py-3 text-[0.6rem] xs:text-xs cursor-pointer" >
          <div class="flex items-center text-nowrap min-w-[190px]">
            <div class="flex items-center">
              <component v-if="data.image_url"
                :is = "data.image_url" class="h-4 w-4"
                :style="{ color: data.color, strokeWidth: 2.5 }"
              />
              &nbsp;{{ data.name }}
            </div>
            <RightArrowIcon class="w-[12px] h-[12px] inline ml-1 transform rotate-90 transition transition-delay-300" :class="{ 'rotate-[-90deg]': fullDetails, 'rotate-90': !fullDetails }" />
          </div>

          <!-- capital  -->
          <div>{{ data.capital_required }}</div>

          <!-- risk  -->
          <div>{{ data.risk }}</div>
              
        </div>

        
      </div>

      <div v-if="fullDetails" class="p-2 capitalize bg-secondary-dark">
        <div class="flex flex-col text-xs xs:text-sm overflow-hidden bg-secondary border dark:border-slate-600 p-2 pl-4 rounded-lg">


          <div class="flex items-center">
            <div class="font-semibold">Name: </div>
            <div class="ml-4">
              <div class="flex">
                <component v-if="data.image_url"
                  :is = "data.image_url" class="h-3 w-3 mt-1"
                  :style="{ color: data.color, strokeWidth: 2.5 }"
                />&nbsp; {{ data.name }} ({{ data.script }})
              </div>
            </div>
          </div>

          <div class="flex items-center">
            <div class="font-semibold">Expiry: &nbsp; &nbsp;</div>
            <div class="ml-4">
              {{ data.expiry_date }}
            </div>
          </div>

          <div class="flex items-center my-1">
            <div class="flex flex-wrap justify-left">
              <div class="font-semibold mr-2">ACTIONS: </div>
              <button class="mr-2 flex items-center" @click="showJoinModal()" :class="{ 'hidden': !props.isActive }">
                  <EditIcon class="w-4 h-4" />Join
              </button>
              <button class="mr-2 flex items-center" @click="gotoinfo()">
                <EyeIcon class="w-5 h-5" />Info
              </button>
            </div>
          </div>

          <div v-if="data.message" class="p-1 bg-gray-50 dark:bg-slate-600 rounded flex items-center">
            <div class="pl-1">{{ data.message }}</div>
          </div>


        </div>
      </div>
      
  </div>
 </template>
 
 <script setup lang="ts">
 import { ref, computed} from "vue";
 import  router  from "@/router/index";
 import { useMatrixJoinersStore } from '@/stores/matrix/matrixJoiner'
 import { useStrategiesStore } from '@/stores/matrix/strategy'
 import { storeToRefs } from "pinia";
 
 const strategiesStore = useStrategiesStore();
  const { showMessage, message } = storeToRefs(strategiesStore)
 
 const matrixJoinersStore = useMatrixJoinersStore();
 const { showAddEditModal,joinStrategyId } = storeToRefs(matrixJoinersStore)
 
 const props: any = defineProps({
   item : Object,
   isActive: Boolean
 })

 const fullDetails = ref<boolean>(false)

 const data : any = computed(() => {
   return props.item
 })
 
 function gotoinfo(){
    router.push({ name: 'Strategy Details' });
 }
 
 function showJoinModal() {
     joinStrategyId.value = data.value.id
     showAddEditModal.value = true;
 }
 
 function showMessageModal() {
     showMessage.value = true
     message.value = data.value.message
 }
 
</script>
 