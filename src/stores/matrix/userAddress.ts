import { ref } from 'vue'
import { defineStore } from 'pinia'
import { makeRequest } from '@/request/request'

export const useUserAddressStore = defineStore('userAddress', () => {
  const endpoint = 'userAddress'
  const userAddress = ref({})
  const userAddressByUserId = ref([])

  const getOfferByuserAddress = async () => {

    }

  const getUserAddressByUserId = async (id: number) => {
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, {user_id: id})
      if (response.data) {
        userAddressByUserId.value = response.data
      } else {
        userAddressByUserId.value = []
      }
    } catch (error) {
      throw error
    }
  }

  return {
    userAddress,
    userAddressByUserId,
    getUserAddressByUserId,
    getOfferByuserAddress,
    endpoint,

    
  }
})
