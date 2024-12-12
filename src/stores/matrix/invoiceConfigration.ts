import { ref } from 'vue'
import { defineStore } from 'pinia'
import { makeRequest, state } from '@/request/request'

export const useInvoiceConfigrationStore = defineStore('invoiceConfigration', () => {
  const endpoint = 'invoiceConfigration'
  const wait = 0
  const invoiceConfigrations = ref<any>([])

  const getInvoiceConfigration = async () => {
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {})
      if (response.data) {
        invoiceConfigrations.value = response.data
      }else{
        invoiceConfigrations.value = []
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  getInvoiceConfigration()

  return {
    wait,
    state,
    endpoint,
    invoiceConfigrations,
    getInvoiceConfigration,
  }
})
