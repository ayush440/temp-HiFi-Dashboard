import { ref } from 'vue'
import { defineStore } from 'pinia'
import { makeRequest } from '@/request/request'

export const useRolesStore = defineStore('roles', () => {
  const endpoint = 'roles'
  const roles = ref([])
  const page_id = 1
  const page_size = 10

  const getRoles = async () => {
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, { page_id, page_size })
      if (response.data) {
        roles.value = response.data
      } else {
        roles.value = []
      }
    } catch (error) {
      throw error
    }
  }
  getRoles()

  return {
    endpoint,
    roles,
    getRoles
  }
})
