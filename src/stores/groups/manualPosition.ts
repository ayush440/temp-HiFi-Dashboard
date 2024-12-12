import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { defineStore } from 'pinia'
import { makeRequest, state } from '@/request/request'
import { useTickerStore } from "@/stores/matrix/ticker/ticker"
import { useBrokersStore } from '@/stores/matrix/broker'
import { useStrategiesStore } from '@/stores/matrix/strategy'


export const useManualPositionsStore = defineStore('manualPositions', () => {
  const brokersStore = useBrokersStore()
  const strategiesStore = useStrategiesStore()
  const { brokers } = storeToRefs(brokersStore)
  const { strategies } = storeToRefs(strategiesStore)
 
  const tickerStore = useTickerStore();

  const searchInputText = ref<string>('')
  const currentPageNumber = ref<number>(1)
  const totalPages = ref<number>(0)
  const showStartRecords = ref<number>(1)
  const showEndRecords = ref<number>(0)
  const totalRecords = ref<number>(0)

  const endpoint: string = 'manualPositions'
  const wait: number =0
  const manualPositions = ref<any>([])

  const mainManualPosition = ref<any>({})

  const showManualSqOffModal = ref<boolean>(false)
  const manualDataForSqOff = ref<any>({ position_id: 0 })




  const getManualPositions = async () => {
    var page_id = currentPageNumber.value
    var page_size = 100
    var search = searchInputText.value

    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, {page_id, page_size, search}, wait)
      if (response.data){
        manualPositions.value = response.data.Positions || []
        mainManualPosition.value = manualPositions.value

        mainManualPosition.value.map((pos:any, index: number) => ({
          ...pos,
          serialNo: `manualPosition-${index}`
        }));

        let tokensList=[]
        for(let i=0;i<manualPositions.value.length;i++){
            tokensList.push(manualPositions.value[i].instrument_token)
        }
        tickerStore.updateTickerList(tokensList)
        
        totalRecords.value = response.data.Count || manualPositions.value.length
        showStartRecords.value = 1 + (currentPageNumber.value - 1) * page_size
        showEndRecords.value = manualPositions.value.length + (currentPageNumber.value - 1) * page_size
        if (totalRecords.value % page_size == 0) {
            totalPages.value = totalRecords.value / page_size
        } else {
            totalPages.value = Math.floor(totalRecords.value / page_size) + 1
        }
      } 
      
    } catch (error) {
      throw error
    }
  }

  watchEffect(() => {
    if(brokers.value.length > 0 && manualPositions.value.length > 0) {
      for (let i = 0; i < manualPositions.value.length; i++) {
        const strgy = strategies.value.find(
          (s:any) => s.id === manualPositions.value[i].strategy_id
        );
        const brkr = brokers.value.find(
          (s:any) => s.id === manualPositions.value[i].broker_id
        )
        manualPositions.value[i].strategy = strgy;
        manualPositions.value[i].broker = brkr;
      }
    }
  })


  async function sqOffManualPosition() {
    try {
        await makeRequest(endpoint, 'POST', manualDataForSqOff.value, {}, {})
        getManualPositions()
        return "success"
    } catch (error) {
      throw error
    } finally {
      manualDataForSqOff.value = { position_id: 0 }
    }
  }

  getManualPositions()

  return {
    endpoint,
    state,
    manualPositions,
    mainManualPosition,
    getManualPositions,

    sqOffManualPosition,
    manualDataForSqOff,
    showManualSqOffModal,

    searchInputText,
    currentPageNumber,
    totalPages,
    showStartRecords,
    showEndRecords,
    totalRecords
  }
})
