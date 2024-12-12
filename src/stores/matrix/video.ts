import { ref } from 'vue'
import { defineStore } from 'pinia'
import { makeRequest, state } from '@/request/request'

export const useVideosStore = defineStore('videos', () => {
  const endpoint = 'videos'

  // Inline type assertion for videos ref
  const videos = ref<{ 
    id: number;
    domain_id: number;
    title: string;
    description: string;
    url: string;
    type: string;
    created_at: string;
    updated_at: string;
  }[]>([]) 

  const wait = 0

  const showAddEditModal = ref(false)
  const addEditVideoData = ref({})
  const showDeleteConfirmationModal = ref(false)
  const idForDelete = ref(0)

  let page_id = 1
  let page_size = 20

  const mockdata = {
    "status": "success",
    "message": "Videos fetched successfully",
    "data": [
      {
        "id": 1,
        "domain_id": 1,
        "title": "IRON MAN 4: Resurrection – Teaser Trailer | Morgan Stark",
        "description": "Check out the concept teaser trailer for Iron Man 4 - Resurrection, arriving in 2025.",
        "url": "6_4VF4-ftQ8",
        "type": "free",
        "created_at": "2024-06-10T17:32:15Z",
        "updated_at": "2024-06-10T17:32:15Z"
      },
      // more videos...
    ]
  }

  const getVideos = async () => {
    try {
      const response = mockdata
      if (response.data) {
        videos.value = response.data
      } else {
        videos.value = []
      }
    } catch (error) {
      throw error
    }
  }

  async function deleteVideo(id: number) {
    try {
      idForDelete.value = 0
      await makeRequest(endpoint, 'DELETE', {}, {}, {}, 0, id)
      getVideos()
    } catch (error) {
      throw error
    }
  }

  async function addEditVideo(id: number, formdata: any) {
    try {
      if (id) {
        await makeRequest(endpoint, 'PUT', formdata, {}, {}, 0, id)
      } else {
        await makeRequest(endpoint, 'POST', formdata, {}, {}, 0)
      }
      getVideos()
    } catch (error) {
      throw error
    }
  }

  getVideos()

  return {
    endpoint,
    state,
    videos,
    getVideos,
    addEditVideo,
    deleteVideo,
    showAddEditModal,
    addEditVideoData,
    showDeleteConfirmationModal,
    idForDelete
  }
})
