import { ref } from 'vue'
import { defineStore } from 'pinia'
import { makeRequest } from '@/request/request'

export const useMatrixAlertsStore = defineStore('matrixAlerts', () => {
  const endpoint = 'matrixAlerts'
  const matrixAlerts = ref([])

  const matrixAlertsById = ref([])

  const showAddEditModal = ref(false)
  const addEditMatrixAlertData = ref({})
  const showDeleteConfirmationModal = ref(false)
  const idForDelete = ref(0)

  let page_id = 1
  let page_size = 10

  const getMatrixAlerts = async () => {
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, { page_id, page_size })
      if (response.data) {
        matrixAlerts.value = response.data
      } else {
        matrixAlerts.value = []
      }
    } catch (error) {
      throw error
    }
  }

  const getMatrixAlertsById = async (id: number, subEndpoint: string) => {
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, {}, id, subEndpoint)
      if (response.data) {
        matrixAlertsById.value = response.data
      } else {
        matrixAlertsById.value = []
      }
    } catch (error) {
      throw error
    }
  }

  // deleteMatrixAlert function delete MatrixAlert from db
  async function deleteMatrixAlert(id: number) {
    try {
      idForDelete.value = 0
      await makeRequest(endpoint, 'DELETE', {}, {}, {}, id)
      getMatrixAlerts()
    } catch (error) {
      throw error
    }
  }

  // addEditMatrixAlert function edit MatrixAlert
  async function addEditMatrixAlert(id: number, formdata: any) {
    try {
      if (id) {
        await makeRequest(endpoint, 'PUT', formdata, {}, {}, id)
      } else {
        await makeRequest(endpoint, 'POST', formdata, {}, {})
      }
      getMatrixAlerts()
    } catch (error) {
      throw error
    }
  }

  getMatrixAlerts()

  return {
    matrixAlerts,
    matrixAlertsById,
    getMatrixAlerts,
    getMatrixAlertsById,
    addEditMatrixAlert,
    deleteMatrixAlert,

    showAddEditModal,
    addEditMatrixAlertData,
    showDeleteConfirmationModal,
    idForDelete
  }
})
