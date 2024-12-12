import { ref } from 'vue'
import { defineStore } from 'pinia'
import { makeRequest } from '@/request/request'
import { useTickerStore } from "@/stores/matrix/ticker/ticker"

export const useProfileStore = defineStore('profile', () => {
  const endpoint = 'profile'
  const profile: any = ref({})

  const ticker = useTickerStore()
  let setedToken=localStorage.getItem('token')
  if (setedToken !== null) {
    ticker.startWebSocket(setedToken);
  } else {
    // Handle the case where the token is null
    console.error("Token is null. Unable to start WebSocket.");
  }


  const getProfile = async () => {
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, {},0)
      if (response.data) {
        
        profile.value = response.data
        profile.value.profile_picture_url = profile.value.profile_picture_url !=='' ? '/images/user/profilepictures/' + profile.value.profile_picture_url : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      } else {
        profile.value = {}
      }
    } catch (error) {
      throw error
    }
  }

  getProfile()
  return {
    endpoint,
    profile,
    getProfile
  }
})