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
const mockdata ={
  "status": "success",
  "message": "Positions fetched successfully",
  "data": {
      "Positions": [
          {
              "id": 142,
              "domain_id": 1,
              "user_id": 1,
              "broker_id": 3,
              "strategy_id": 5,
              "master_order_id": 71,
              "order_id": {
                  "Int32": 93,
                  "Valid": true
              },
              "tradingsymbol": "SBIN-EQ",
              "strategy_type": 0,
              "exchange": "NSE",
              "instrument_token": 779521,
              "quantity": 10,
              "last_price": 0,
              "buy_quantity": 1,
              "multiplier": 1,
              "sell_quantity": 0,
              "side": "BUY",
              "buy_price": 800,
              "sell_price": 0,
              "product": "INTRADAY",
              "status": "OPEN",
              "message": "OK",
              "created_at": "2024-08-30T09:13:54Z",
              "updated_at": "2024-08-30T09:13:54Z"
          },
          {
              "id": 143,
              "domain_id": 1,
              "user_id": 1,
              "broker_id": 3,
              "strategy_id": 5,
              "master_order_id": 71,
              "order_id": {
                  "Int32": 94,
                  "Valid": true
              },
              "tradingsymbol": "SBIN-EQ",
              "strategy_type": 0,
              "exchange": "NSE",
              "instrument_token": 779521,
              "quantity": 10,
              "last_price": 0,
              "buy_quantity": 1,
              "multiplier": 1,
              "sell_quantity": 1,
              "side": "BUY",
              "buy_price": 810.95,
              "sell_price": 800,
              "product": "INTRADAY",
              "status": "CLOSED",
              "message": "OK",
              "created_at": "2024-08-30T09:13:54Z",
              "updated_at": "2024-08-30T09:13:54Z"
          },
          {
              "id": 144,
              "domain_id": 1,
              "user_id": 1,
              "broker_id": 3,
              "strategy_id": 5,
              "master_order_id": 45,
              "order_id": {
                  "Int32": 95,
                  "Valid": true
              },
              "tradingsymbol": "SBIN-EQ",
              "strategy_type": 0,
              "exchange": "NSE",
              "instrument_token": 779521,
              "quantity": 1,
              "last_price": 0,
              "buy_quantity": 1,
              "multiplier": 1,
              "sell_quantity": 0,
              "side": "BUY",
              "buy_price": 813.25,
              "sell_price": 0,
              "product": "INTRADAY",
              "status": "OPEN",
              "message": "OK",
              "created_at": "2024-08-30T09:13:54Z",
              "updated_at": "2024-08-30T09:13:54Z"
          },
          {
              "id": 145,
              "domain_id": 1,
              "user_id": 1,
              "broker_id": 3,
              "strategy_id": 5,
              "master_order_id": 71,
              "order_id": {
                  "Int32": 82,
                  "Valid": true
              },
              "tradingsymbol": "SBIN-EQ",
              "strategy_type": 0,
              "exchange": "NSE",
              "instrument_token": 779521,
              "quantity": 1,
              "last_price": 0,
              "buy_quantity": 1,
              "multiplier": 1,
              "sell_quantity": 0,
              "side": "BUY",
              "buy_price": 812.1,
              "sell_price": 0,
              "product": "INTRADAY",
              "status": "CLOSING",
              "message": "OK",
              "created_at": "2024-08-30T09:13:54Z",
              "updated_at": "2024-08-30T09:13:54Z"
          },
          {
              "id": 146,
              "domain_id": 1,
              "user_id": 1,
              "broker_id": 3,
              "strategy_id": 5,
              "master_order_id": 51,
              "order_id": {
                  "Int32": 87,
                  "Valid": true
              },
              "tradingsymbol": "SBIN-EQ",
              "strategy_type": 0,
              "exchange": "NSE",
              "instrument_token": 779521,
              "quantity": 1,
              "last_price": 804,
              "buy_quantity": 1,
              "multiplier": 1,
              "sell_quantity": 1,
              "side": "BUY",
              "buy_price": 804,
              "sell_price": 803.45,
              "product": "INTRADAY",
              "status": "CLOSING",
              "message": "OK",
              "created_at": "2024-08-30T09:13:54Z",
              "updated_at": "2024-08-30T09:13:54Z"
          },
          {
              "id": 147,
              "domain_id": 1,
              "user_id": 1,
              "broker_id": 3,
              "strategy_id": 5,
              "master_order_id": 52,
              "order_id": {
                  "Int32": 89,
                  "Valid": true
              },
              "tradingsymbol": "SBIN-EQ",
              "strategy_type": 0,
              "exchange": "NSE",
              "instrument_token": 779521,
              "quantity": 1,
              "last_price": 804,
              "buy_quantity": 1,
              "multiplier": 1,
              "sell_quantity": 1,
              "side": "BUY",
              "buy_price": 802.75,
              "sell_price": 802.1,
              "product": "MIS",
              "status": "CLOSED",
              "message": "OK",
              "created_at": "2024-08-30T09:13:54Z",
              "updated_at": "2024-08-30T09:13:54Z"
          },
          {
              "id": 148,
              "domain_id": 1,
              "user_id": 1,
              "broker_id": 3,
              "strategy_id": 5,
              "master_order_id": 53,
              "order_id": {
                  "Int32": 91,
                  "Valid": true
              },
              "tradingsymbol": "SBIN",
              "strategy_type": 0,
              "exchange": "NSE",
              "instrument_token": 779521,
              "quantity": 1,
              "last_price": 806,
              "buy_quantity": 1,
              "multiplier": 1,
              "sell_quantity": 1,
              "side": "BUY",
              "buy_price": 805.05,
              "sell_price": 804.75,
              "product": "MIS",
              "status": "CLOSING",
              "message": "OK",
              "created_at": "2024-08-30T09:13:54Z",
              "updated_at": "2024-08-30T09:13:54Z"
          }
      ],
      "Count": 7
  }
}



  const getManualPositions = async () => {
    var page_id = currentPageNumber.value
    var page_size = 100
    var search = searchInputText.value

    try {
      const response = await mockdata
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
