import { ref } from 'vue'
import { defineStore } from 'pinia'
import { makeRequest } from '@/request/request'

export const useSocialStore = defineStore('social', () => {
  const endpoint = 'social'
  const social = ref([])
  
  const getSocialInfo = async () => {
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, { },0)
      if (response.data) {
        social.value = response.data
      } else {
        social.value = []
      }
    } catch (error) {
      throw error
    }
  }
  getSocialInfo()

  return {
    endpoint,
    social,
    getSocialInfo
  }
})
