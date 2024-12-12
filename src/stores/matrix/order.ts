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
