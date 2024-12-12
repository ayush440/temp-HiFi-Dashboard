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
const mockData ={
  "status": "success",
  "message": "",
  "data": {
      "email": "kuldeep@gmail.com",
      "expire_at": "2024-11-12T00:00:00Z",
      "user_role": "Trader",
      "gender": "Male",
      "trading": true,
      "message": "message1",
      "mobile": "9689898958",
      "mobile_prefix": "+91",
      "name": "kuldeep",
      "plan_id": 4,
      "plan_name": "Elite",
      "profile_picture_url": "",
      "created_at": "2023-12-09T13:13:59Z",
      "updated_at": "2024-08-20T09:31:28Z",
      "address": {
          "address_1": "",
          "address_2": "",
          "district": "",
          "state": "",
          "pincode": ""
      },
      "quote_of_the_day": "\"Success is not final, failure is not fatal: It is the courage to continue that counts.\" - Winston Churchill"
  }
}

  const getProfile = async () => {
    try {
      const response = await mockData
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