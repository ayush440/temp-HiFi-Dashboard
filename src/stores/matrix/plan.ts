import { ref } from 'vue'
import { defineStore } from 'pinia'
import { makeRequest } from '@/request/request'

export const usePlansStore = defineStore('plans', () => {
  const endpoint = 'plans'
  const wait =0
  const plans = ref([])
  const stratgies = ref([])
  const stratgyJoinedPlans = ref([])

  const showAddEditModal = ref(false)
  const addEditPlanData = ref({})
  const showDeleteConfirmationModal = ref(false)
  const idForDelete = ref(0)

  const storeStrategyId = ref(0)
  const storePlanData = ref<any>({})
  const storePlanId = ref(0)
  const showStrategyModal = ref(false)


  const getPlans = async () => {
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, { }, wait)
      if (response.data) {
        plans.value = response.data.plans
        stratgies.value = response.data.strategies
        stratgyJoinedPlans.value = response.data.strategy_joined
      } else {
        plans.value = []
        stratgies.value = []
        stratgyJoinedPlans.value = []
      }    
    } catch (error) {
      throw error
    }
  }

  // deletePlan function delete plan from db
  async function deletePlan(id: number) {
    try {
      idForDelete.value = 0
      await makeRequest(endpoint, 'DELETE', {}, {}, {}, id)
      getPlans()
    } catch (error) {
      throw error
    }
  }

  // addEditPlan function edit plan
  async function addEditPlan(id: number, formdata: any) {
    try {
      if (id) {
        await makeRequest(endpoint, 'PUT', formdata, {}, {}, id)
      } else {
        await makeRequest(endpoint, 'POST', formdata, {}, {})
      }
      getPlans()
    } catch (error) {
      throw error
    }
  }

  getPlans()

  return {
    endpoint,
    plans,
    stratgies,
    stratgyJoinedPlans,
    getPlans,
    addEditPlan,
    deletePlan,

    showAddEditModal,
    addEditPlanData,
    showDeleteConfirmationModal,
    idForDelete,
    storeStrategyId,
    storePlanData,
    storePlanId,
    showStrategyModal,
    
  }
})
