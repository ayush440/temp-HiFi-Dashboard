import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { defineStore } from 'pinia'
import { makeRequest, state } from '@/request/request'
import { useStrategiesStore } from '@/stores/matrix/strategy'
import { useBrokersStore } from '@/stores/matrix/broker'
import { useTickerStore } from "@/stores/matrix/ticker/ticker"

export const useOrdersStore = defineStore('orders', () => {
  const strategiesStore = useStrategiesStore()
const brokersStore = useBrokersStore()
const tickerStore = useTickerStore();
const { strategies } = storeToRefs(strategiesStore)
const { brokers } = storeToRefs(brokersStore)

  const endpoint = 'orders'
  const wait =0
  const orders = ref<any>([])
  const ordersByUserId = ref([])
  const matrixOrdersById = ref([])

  const showAddEditModal = ref(false)
  const editOrderData = ref({})
  const showDeleteConfirmationModal = ref(false)
  const idForDelete = ref(0)

  const searchInputText = ref<string>('');
  const currentPageNumber = ref<number>(1);
  const totalPages = ref<number>(0);
  const showStartRecords = ref<number>(1);
  const showEndRecords = ref<number>(0);
  const totalRecords = ref<number>(1);
  const totalOrders = ref<number>(0);
const mockdata ={
  "status": "success",
  "message": "Orders fetched successfully",
  "data": [
      {
          "id": 1,
          "broker_id": 2,
          "strategy_id": 4,
          "position_id": {
              "Int32": 0,
              "Valid": false
          },
          "order_id": "24020900272035",
          "status": "REJECTED",
          "status_message": "Thank you for your order, placed on April 10, 2015. You will receive an email from us in 2-4 business days letting you know that your order has shipped..",
          "created_at": "2024-08-30T09:13:54Z",
          "updated_at": "2024-08-30T09:13:54Z",
          "variety": "regular",
          "exchange": "NFO",
          "tradingsymbol": "NIFTY15FEB24C21000",
          "instrument_token": 10307586,
          "order_type": "MKT",
          "transaction_type": "SELL",
          "validity": "DAY",
          "product": "MIS",
          "quantity": 502,
          "price": 0,
          "trigger_price": 0,
          "average_price": 0,
          "filled_quantity": 0,
          "pending_quantity": 0,
          "cancelled_quantity": 0,
          "tag": "20240209000017_1"
      },
      {
          "id": 2,
          "broker_id": 9,
          "strategy_id": 5,
          "position_id": {
              "Int32": 0,
              "Valid": false
          },
          "order_id": "24020900272037",
          "status": "COMPLETE",
          "status_message": "Ok",
          "created_at": "2024-08-30T09:13:54Z",
          "updated_at": "2024-08-30T09:13:54Z",
          "variety": "regular",
          "exchange": "NFO",
          "tradingsymbol": "NIFTY15FEB24P21150",
          "instrument_token": 10359554,
          "order_type": "MKT",
          "transaction_type": "SELL",
          "validity": "DAY",
          "product": "MIS",
          "quantity": 500,
          "price": 0,
          "trigger_price": 0,
          "average_price": 0,
          "filled_quantity": 0,
          "pending_quantity": 0,
          "cancelled_quantity": 0,
          "tag": "20240209000017_2"
      },
      {
          "id": 3,
          "broker_id": 3,
          "strategy_id": 6,
          "position_id": {
              "Int32": 0,
              "Valid": false
          },
          "order_id": "24020900272244",
          "status": "COMPLETE",
          "status_message": "",
          "created_at": "2024-08-30T09:13:54Z",
          "updated_at": "2024-08-30T09:13:54Z",
          "variety": "regular",
          "exchange": "NFO",
          "tradingsymbol": "NIFTY15FEB24P21150",
          "instrument_token": 10359554,
          "order_type": "MKT",
          "transaction_type": "BUY",
          "validity": "DAY",
          "product": "MIS",
          "quantity": 500,
          "price": 0,
          "trigger_price": 0,
          "average_price": 0,
          "filled_quantity": 0,
          "pending_quantity": 0,
          "cancelled_quantity": 0,
          "tag": "20240209000017_2"
      },
      {
          "id": 11,
          "broker_id": 3,
          "strategy_id": 7,
          "position_id": {
              "Int32": 0,
              "Valid": false
          },
          "order_id": "24020900288558",
          "status": "COMPLETE",
          "status_message": "Ok",
          "created_at": "2024-08-30T09:13:54Z",
          "updated_at": "2024-08-30T09:13:54Z",
          "variety": "regular",
          "exchange": "NFO",
          "tradingsymbol": "NIFTY15FEB24P20000",
          "instrument_token": 9908482,
          "order_type": "MKT",
          "transaction_type": "BUY",
          "validity": "DAY",
          "product": "MIS",
          "quantity": 50,
          "price": 0,
          "trigger_price": 0,
          "average_price": 1.2,
          "filled_quantity": 50,
          "pending_quantity": 0,
          "cancelled_quantity": 0,
          "tag": "20240209000021_1"
      },
      {
          "id": 12,
          "broker_id": 3,
          "strategy_id": 8,
          "position_id": {
              "Int32": 0,
              "Valid": false
          },
          "order_id": "24020900288565",
          "status": "REJECTED",
          "status_message": "Ok",
          "created_at": "2024-08-30T09:13:54Z",
          "updated_at": "2024-08-30T09:13:54Z",
          "variety": "regular",
          "exchange": "NFO",
          "tradingsymbol": "NIFTY15FEB24C22000",
          "instrument_token": 11921666,
          "order_type": "MKT",
          "transaction_type": "SELL",
          "validity": "DAY",
          "product": "MIS",
          "quantity": 50,
          "price": 0,
          "trigger_price": 0,
          "average_price": 0,
          "filled_quantity": 0,
          "pending_quantity": 0,
          "cancelled_quantity": 0,
          "tag": "20240209000021_2"
      },
      {
          "id": 17,
          "broker_id": 3,
          "strategy_id": 18,
          "position_id": {
              "Int32": 1,
              "Valid": true
          },
          "order_id": "3476457457",
          "status": "SUCCESS",
          "status_message": "ok",
          "created_at": "2024-08-30T09:13:54Z",
          "updated_at": "2024-08-30T09:13:54Z",
          "variety": "SSD",
          "exchange": "NFO",
          "tradingsymbol": "FDGTVDSAA",
          "instrument_token": 436343,
          "order_type": "tget",
          "transaction_type": "buy",
          "validity": "DAY",
          "product": "MARKET",
          "quantity": 1,
          "price": 1,
          "trigger_price": 1,
          "average_price": 1,
          "filled_quantity": 1,
          "pending_quantity": 1,
          "cancelled_quantity": 1,
          "tag": "NFO"
      }
  ]
}



const getOrders = async () => {
  try {
    const response = await makeRequest(endpoint, 'GET', {}, {}, { }, wait)
    if (response.data){
      orders.value = response.data || []
      totalRecords.value = orders.value.length
      totalOrders.value = orders.value.length
    } 
    let tokensList=[]
    for(let i=0;i<orders.value.length;i++){
      tokensList.push(orders.value[i].instrument_token)
    }
    tickerStore.updateTickerList(tokensList)
  } catch (error) {
    throw error
  } finally {
    let response = {
        "status": "success",
        "message": "Orders fetched successfully",
        "data": [
            {
                "id": 1,
                "broker_id": 2,
                "strategy_id": 4,
                "position_id": {
                    "Int32": 0,
                    "Valid": false
                },
                "order_id": "24020900272035",
                "status": "REJECTED",
                "status_message": "Thank you for your order, placed on April 10, 2015. You will receive an email from us in 2-4 business days letting you know that your order has shipped..",
                "created_at": "2024-08-30T09:13:54Z",
                "updated_at": "2024-08-30T09:13:54Z",
                "variety": "regular",
                "exchange": "NFO",
                "tradingsymbol": "NIFTY15FEB24C21000",
                "instrument_token": 10307586,
                "order_type": "MKT",
                "transaction_type": "SELL",
                "validity": "DAY",
                "product": "MIS",
                "quantity": 502,
                "price": 0,
                "trigger_price": 0,
                "average_price": 0,
                "filled_quantity": 0,
                "pending_quantity": 0,
                "cancelled_quantity": 0,
                "tag": "20240209000017_1"
            },
            {
                "id": 2,
                "broker_id": 9,
                "strategy_id": 5,
                "position_id": {
                    "Int32": 0,
                    "Valid": false
                },
                "order_id": "24020900272037",
                "status": "COMPLETE",
                "status_message": "Ok",
                "created_at": "2024-08-30T09:13:54Z",
                "updated_at": "2024-08-30T09:13:54Z",
                "variety": "regular",
                "exchange": "NFO",
                "tradingsymbol": "NIFTY15FEB24P21150",
                "instrument_token": 10359554,
                "order_type": "MKT",
                "transaction_type": "SELL",
                "validity": "DAY",
                "product": "MIS",
                "quantity": 500,
                "price": 0,
                "trigger_price": 0,
                "average_price": 0,
                "filled_quantity": 0,
                "pending_quantity": 0,
                "cancelled_quantity": 0,
                "tag": "20240209000017_2"
            },
            {
                "id": 3,
                "broker_id": 3,
                "strategy_id": 6,
                "position_id": {
                    "Int32": 0,
                    "Valid": false
                },
                "order_id": "24020900272244",
                "status": "COMPLETE",
                "status_message": "",
                "created_at": "2024-08-30T09:13:54Z",
                "updated_at": "2024-08-30T09:13:54Z",
                "variety": "regular",
                "exchange": "NFO",
                "tradingsymbol": "NIFTY15FEB24P21150",
                "instrument_token": 10359554,
                "order_type": "MKT",
                "transaction_type": "BUY",
                "validity": "DAY",
                "product": "MIS",
                "quantity": 500,
                "price": 0,
                "trigger_price": 0,
                "average_price": 0,
                "filled_quantity": 0,
                "pending_quantity": 0,
                "cancelled_quantity": 0,
                "tag": "20240209000017_2"
            },
            {
                "id": 11,
                "broker_id": 3,
                "strategy_id": 7,
                "position_id": {
                    "Int32": 0,
                    "Valid": false
                },
                "order_id": "24020900288558",
                "status": "COMPLETE",
                "status_message": "Ok",
                "created_at": "2024-08-30T09:13:54Z",
                "updated_at": "2024-08-30T09:13:54Z",
                "variety": "regular",
                "exchange": "NFO",
                "tradingsymbol": "NIFTY15FEB24P20000",
                "instrument_token": 9908482,
                "order_type": "MKT",
                "transaction_type": "BUY",
                "validity": "DAY",
                "product": "MIS",
                "quantity": 50,
                "price": 0,
                "trigger_price": 0,
                "average_price": 1.2,
                "filled_quantity": 50,
                "pending_quantity": 0,
                "cancelled_quantity": 0,
                "tag": "20240209000021_1"
            },
            {
                "id": 12,
                "broker_id": 3,
                "strategy_id": 8,
                "position_id": {
                    "Int32": 0,
                    "Valid": false
                },
                "order_id": "24020900288565",
                "status": "REJECTED",
                "status_message": "Ok",
                "created_at": "2024-08-30T09:13:54Z",
                "updated_at": "2024-08-30T09:13:54Z",
                "variety": "regular",
                "exchange": "NFO",
                "tradingsymbol": "NIFTY15FEB24C22000",
                "instrument_token": 11921666,
                "order_type": "MKT",
                "transaction_type": "SELL",
                "validity": "DAY",
                "product": "MIS",
                "quantity": 50,
                "price": 0,
                "trigger_price": 0,
                "average_price": 0,
                "filled_quantity": 0,
                "pending_quantity": 0,
                "cancelled_quantity": 0,
                "tag": "20240209000021_2"
            },
            {
                "id": 17,
                "broker_id": 3,
                "strategy_id": 18,
                "position_id": {
                    "Int32": 1,
                    "Valid": true
                },
                "order_id": "3476457457",
                "status": "SUCCESS",
                "status_message": "ok",
                "created_at": "2024-08-30T09:13:54Z",
                "updated_at": "2024-08-30T09:13:54Z",
                "variety": "SSD",
                "exchange": "NFO",
                "tradingsymbol": "FDGTVDSAA",
                "instrument_token": 436343,
                "order_type": "tget",
                "transaction_type": "buy",
                "validity": "DAY",
                "product": "MARKET",
                "quantity": 1,
                "price": 1,
                "trigger_price": 1,
                "average_price": 1,
                "filled_quantity": 1,
                "pending_quantity": 1,
                "cancelled_quantity": 1,
                "tag": "NFO"
            }
        ]
    }


    if (response.data){
      orders.value = response.data || []
      totalRecords.value = orders.value.length
      totalOrders.value = orders.value.length
    } 

  }
}

  watchEffect(() => {
    if(strategies.value.length > 0 && brokers.value.length > 0 && orders.value.length > 0) {
      for (let i = 0; i < orders.value.length; i++) {
        const strgy = strategies.value.find(
          (s:any) => s.id === orders.value[i].strategy_id
        );
        const brkr = brokers.value.find(
          (s:any) => s.id === orders.value[i].broker_id
        )
        orders.value[i].broker = brkr;
        orders.value[i].strategy = strgy;
      }
    }
  })

  const getOrdersByUserId = async (id: number, subEndpoint: string) => {
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, {},0, id, subEndpoint)
      if (response.data) {
        ordersByUserId.value = response.data
      } else {
        ordersByUserId.value = []
      }
    } catch (error) {
      throw error
    }
  }

  const getMatrixOrdersById = async (id: number, subEndpoint: string) => {
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, {},0, id, subEndpoint)
      if (response.data) {
        matrixOrdersById.value = response.data
      } else {
        matrixOrdersById.value = []
      }
    } catch (error) {
      throw error
    }
  }

  // deleteOrder function delete order from db
  async function deleteOrder(id: number) {
    try {
      idForDelete.value = 0
      await makeRequest(endpoint, 'DELETE', {}, {}, {},0, id)
      getOrders()
    } catch (error) {
      throw error
    }
  }

  // addEditOrder function edit order
  async function addEditOrder(id: number, formdata: any) {
    try {
      if (id) {
        await makeRequest(endpoint, 'PUT', formdata, {}, {},0, id)
      } else {
        await makeRequest(endpoint, 'POST', formdata, {}, {},0)
      }
      getOrders()
    } catch (error) {
      throw error
    }
  }

  getOrders()

  return {
    endpoint,
    state,
    orders,
    ordersByUserId,
    matrixOrdersById,
    getOrders,
    getOrdersByUserId,
    getMatrixOrdersById,
    addEditOrder,
    deleteOrder,

    showAddEditModal,
    editOrderData,
    showDeleteConfirmationModal,
    idForDelete,

    searchInputText,
    currentPageNumber,
    totalPages,
    showStartRecords,
    showEndRecords,
    totalRecords,
    totalOrders,
  }
})
