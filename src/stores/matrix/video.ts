import { ref } from 'vue'
import { defineStore } from 'pinia'
import { makeRequest, state } from '@/request/request'

export const useVideosStore = defineStore('videos', () => {
  const endpoint = 'videos'
  const videos = ref([])
  const wait =0

  const showAddEditModal = ref(false)
  const addEditVideoData = ref({})
  const showDeleteConfirmationModal = ref(false)
  const idForDelete = ref(0)

  let page_id = 1
  let page_size = 20

  const getVideos = async () => {
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, { page_id, page_size }, wait)
      if (response.data) {
        videos.value = response.data
      } else {
        videos.value = []
      }
    } catch (error) {
      throw error
    }
  }

  // deleteVideo function delete video from db
  async function deleteVideo(id: number) {
    try {
      idForDelete.value = 0
      await makeRequest(endpoint, 'DELETE', {}, {}, {},0, id)
      getVideos()
    } catch (error) {
      throw error
    }
  }

  // addEditVideo function edit video
  async function addEditVideo(id: number, formdata: any) {
    try {
      if (id) {
        await makeRequest(endpoint, 'PUT', formdata, {}, {},0, id)
      } else {
        await makeRequest(endpoint, 'POST', formdata, {}, {},0)
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
