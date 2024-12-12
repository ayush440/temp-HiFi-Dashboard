import { ref } from 'vue'
import { defineStore } from 'pinia'
import { makeRequest } from '@/request/request'

export const useMatrixPlanStrategyStore = defineStore('matrixPlanStrategy', () => {
  const endpoint = 'matrixPlanStrategy'
  const matrixPlanStrategy = ref([])
  const matrixPlanStrategyByPlan = ref([])
  const matrixPlanStrategyByPlanCopy = ref([])

  const showAddEditModal = ref(false)
  const addEditMatrixPlanStrategyData = ref({})
  const showDeleteConfirmationModal = ref(false)
  const idForDelete = ref<any>({})

  const searchInputText = ref<string>('');
  const currentPageNumber = ref<number>(1);
  const totalPages = ref<number>(0);
  const showStartRecords = ref<number>(1);
  const showEndRecords = ref<number>(0);
  const totalRecords = ref<number>(1);

  const getMatrixPlanStrategies = async () => {
    var page_id = currentPageNumber.value
    var page_size = 10
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, { page_id, page_size })
      if (response.data) {
        matrixPlanStrategy.value = response.data.sort((a: any, b: any) => a.id - b.id)
      } else {
        matrixPlanStrategy.value = []
      }
    } catch (error) {
      throw error
    }
  }

  const getMatrixPlanStrategiesByPlan = async (id: number) => {
    try {
      const subEndpoint = 'plan'
      const response = await makeRequest(endpoint, 'GET', {}, {}, {}, id, subEndpoint)
      if (response.data) {
        matrixPlanStrategyByPlan.value = response.data
      } else {
        matrixPlanStrategyByPlan.value = []
      }
    } catch (error) {
      throw error
    }
  }

  // deleteMatrixPlanStrategy function delete plan from db
  async function deleteMatrixPlanStrategy(paramSet: any) {
    try {
      await makeRequest(endpoint, 'DELETE', {}, {}, paramSet)
    } catch (error) {
      throw error
    }
  }

  // addEditMatrixPlanStrategy function edit plan
  async function addEditMatrixPlanStrategy(id: number, formdata: any) {
    try {
      if (id) {
        await makeRequest(endpoint, 'PUT', formdata, {}, {}, id)
      } else {
        await makeRequest(endpoint, 'POST', formdata, {}, {})
      }
    } catch (error) {
      throw error
    }
  }

  return {
    matrixPlanStrategy,
    matrixPlanStrategyByPlan,
    matrixPlanStrategyByPlanCopy,
    getMatrixPlanStrategies,
    getMatrixPlanStrategiesByPlan,
    addEditMatrixPlanStrategy,
    deleteMatrixPlanStrategy,

    showAddEditModal,
    addEditMatrixPlanStrategyData,
    showDeleteConfirmationModal,
    idForDelete,
    
    searchInputText,
    currentPageNumber,
    totalPages,
    showStartRecords,
    showEndRecords,
    totalRecords,
  }
})
