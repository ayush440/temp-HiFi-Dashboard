import { ref } from 'vue'
import { defineStore } from 'pinia'
import { makeRequest } from '@/request/request'

export const useGeneralOffersStore = defineStore('generalOffers', () => {
  const endpoint = 'generalOffers'
  const generalOffers = ref([])

  const showAddEditModal = ref(false)
  const addEditGeneralOfferData = ref({})
  const showDeleteConfirmationModal = ref(false)
  const idForDelete = ref(0)

  const searchInputText = ref<string>('');
  const currentPageNumber = ref<number>(1);
  const totalPages = ref<number>(0);
  const showStartRecords = ref<number>(1);
  const showEndRecords = ref<number>(0);
  const totalRecords = ref<number>(1);

  let page_id = 1
  let page_size = 100
  let search = ''

  const getGeneralOffers = async () => {
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, { page_id, page_size, search })
      if (response.data) {
        generalOffers.value = response.data
      } else {
        generalOffers.value = []
      }
    } catch (error) {
      throw error
    }
  }

  // deleteGeneralOffer function delete generalOffers from db
  async function deleteGeneralOffer(id: number) {
    try {
      idForDelete.value = 0
      await makeRequest(endpoint, 'DELETE', {}, {}, {}, id)
      getGeneralOffers()
    } catch (error) {
      throw error
    }
  }

  // addEditGeneralOffer function edit generalOffers
  async function addEditGeneralOffer(id: number, formdata: any) {
    try {
      if (id) {
        await makeRequest(endpoint, 'PUT', formdata, {}, {}, id)
      } else {
        await makeRequest(endpoint, 'POST', formdata, {}, {})
      }
      getGeneralOffers()
    } catch (error) {
      throw error
    }
  }

  getGeneralOffers()

  return {
    generalOffers,
    getGeneralOffers,
    addEditGeneralOffer,
    deleteGeneralOffer,

    showAddEditModal,
    addEditGeneralOfferData,
    showDeleteConfirmationModal,
    idForDelete,

    searchInputText,
    currentPageNumber,
    totalPages,
    showStartRecords,
    showEndRecords,
    totalRecords,
    
  }
})
