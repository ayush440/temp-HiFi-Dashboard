import { ref } from 'vue'
import { defineStore } from 'pinia'
import { makeRequest } from '@/request/request'

export const usePaymentQrStore = defineStore('paymentQr', () => {
  const endpoint = 'paymentQr'
  const paymentQr = ref([])
  const showAddEditModal = ref(false)

  const getPaymentQr = async () => {
    
  }
  async function addEditPaymentQr(id: number, formdata: any) {
    try {
      if (id) {
        await makeRequest(endpoint, 'PUT', formdata, {}, {}, id)
      } else {
        await makeRequest(endpoint, 'POST', formdata, {}, {})
      }
      getPaymentQr()
    } catch (error) {
      throw error
    }
  }
  getPaymentQr()

  return {
    endpoint,
    paymentQr,
    getPaymentQr,
    addEditPaymentQr, 
    showAddEditModal
  }
})
