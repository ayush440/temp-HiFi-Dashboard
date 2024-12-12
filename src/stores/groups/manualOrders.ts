import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { defineStore } from 'pinia'
import { makeRequest, state } from '@/request/request'
import { useTickerStore } from "@/stores/matrix/ticker/ticker"
import { useBrokersStore } from '@/stores/matrix/broker'
import { useStrategiesStore } from '../matrix/strategy'


export const useManualOrdersStore = defineStore('manualOrders', () => {
  const brokersStore = useBrokersStore()
  const strategiesStore = useStrategiesStore()
  const { brokers } = storeToRefs(brokersStore)
  const { strategies } = storeToRefs(strategiesStore)
 
  const totalManualOrders = ref<number>(0) // for manualOrder 

  const tickerStore = useTickerStore();

  const searchInputText = ref<string>('')
  const currentPageNumber = ref<number>(1)
  const totalPages = ref<number>(0)
  const showStartRecords = ref<number>(1)
  const showEndRecords = ref<number>(0)
  const totalRecords = ref<number>(0)

  const endpoint = 'manualOrders'
  const wait =0
  const manualOrders = ref<any>([])

const mockdata ={
  "status": "success",
  "message": "Group Orders fetched successfully",
  "data": {
      "orders": [
          {
              "id": 93,
              "domain_id": 1,
              "user_id": 1,
              "broker_id": 2,
              "strategy_id": 5,
              "master_order_id": 71,
              "position_id": {
                  "Int32": 0,
                  "Valid": false
              },
              "order_id": "5474757",
              "status_message": "7457",
              "tag": "hfdh",
              "variety": "fhhdh",
              "tradingsymbol": "hfhdh",
              "exchange": "fdhdfh",
              "instrument_token": 34674,
              "transaction_type": "dfhgfdhfd",
              "product": "hrty",
              "order_type": "yrrty",
              "validity": "DAY",
              "status": "OPEN",
              "quantity": 2,
              "price": 2,
              "trigger_price": 2,
              "average_price": 2,
              "filled_quantity": 2,
              "pending_quantity": 2,
              "cancelled_quantity": 2,
              "pnl_track": false,
              "created_at": "2024-08-30T09:13:54Z",
              "updated_at": "2024-08-30T09:13:54Z"
          },
          {
              "id": 94,
              "domain_id": 1,
              "user_id": 1,
              "broker_id": 3,
              "strategy_id": 4,
              "master_order_id": 71,
              "position_id": {
                  "Int32": 0,
                  "Valid": false
              },
              "order_id": "5474757",
              "status_message": "OK",
              "tag": "hfdh",
              "variety": "regular",
              "tradingsymbol": "SBILIFE24JUNFUT ",
              "exchange": "NFO",
              "instrument_token": 34674,
              "transaction_type": "BUY",
              "product": "MIS",
              "order_type": "SL",
              "validity": "DAY",
              "status": "PENDING",
              "quantity": 2,
              "price": 2,
              "trigger_price": 2,
              "average_price": 2,
              "filled_quantity": 2,
              "pending_quantity": 2,
              "cancelled_quantity": 2,
              "pnl_track": false,
              "created_at": "2024-08-30T09:13:54Z",
              "updated_at": "2024-08-30T09:13:54Z"
          },
          {
              "id": 95,
              "domain_id": 1,
              "user_id": 1,
              "broker_id": 7,
              "strategy_id": 8,
              "master_order_id": 71,
              "position_id": {
                  "Int32": 0,
                  "Valid": false
              },
              "order_id": "5474757",
              "status_message": "7457",
              "tag": "hfdh",
              "variety": "fhhdh",
              "tradingsymbol": "hfhdh",
              "exchange": "fdhdfh",
              "instrument_token": 34674,
              "transaction_type": "dfhgfdhfd",
              "product": "hrty",
              "order_type": "yrrty",
              "validity": "DAY",
              "status": "CLOSE",
              "quantity": 2,
              "price": 2,
              "trigger_price": 2,
              "average_price": 2,
              "filled_quantity": 2,
              "pending_quantity": 2,
              "cancelled_quantity": 2,
              "pnl_track": false,
              "created_at": "2024-08-30T09:13:54Z",
              "updated_at": "2024-08-30T09:13:54Z"
          }
      ],
      "count": 3
  }
}



  const getManualOrders = async () => {
    var page_id = currentPageNumber.value
    var page_size = 100
    var search = searchInputText.value

    try {
      const response = await mockdata
      if (response.data){
        manualOrders.value = response.data.orders || []

        totalManualOrders.value = manualOrders.value.length

        totalRecords.value = response.data.count || manualOrders.value.length
        showStartRecords.value = 1 + (currentPageNumber.value - 1) * page_size
        showEndRecords.value = manualOrders.value.length + (currentPageNumber.value - 1) * page_size
        if (totalRecords.value % page_size == 0) {
            totalPages.value = totalRecords.value / page_size
        } else {
            totalPages.value = Math.floor(totalRecords.value / page_size) + 1
        }
      } 
      let tokensList=[]
      for(let i=0;i<manualOrders.value.length;i++){
        tokensList.push(manualOrders.value[i].instrument_token)
      }
      tickerStore.updateTickerList(tokensList)
    } catch (error) {
      throw error
    }
  }

  watchEffect(() => {
    if(brokers.value.length > 0 && manualOrders.value.length > 0) {
      for (let i = 0; i < manualOrders.value.length; i++) {
        const strgy = strategies.value.find(
          (s:any) => s.id === manualOrders.value[i].strategy_id
        );
        const brkr = brokers.value.find(
          (s:any) => s.id === manualOrders.value[i].broker_id
        )
        manualOrders.value[i].strategy = strgy;
        manualOrders.value[i].broker = brkr;
      }
    }
  })

  getManualOrders()

  return {
    endpoint,
    state,
    manualOrders,
    getManualOrders,
    totalManualOrders,
    
    searchInputText,
    currentPageNumber,
    totalPages,
    showStartRecords,
    showEndRecords,
    totalRecords
  }
})
