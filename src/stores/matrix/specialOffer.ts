import { ref } from 'vue'
import { defineStore } from 'pinia'
import { makeRequest } from '@/request/request'

export const useSpecialOffersStore = defineStore('specialOffers', () => {
  const endpoint = 'specialOffers'
  const specialOffers = ref([])

  const showAddEditModal = ref(false)
  const addEditSpecialOfferData = ref({})
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

  const getSpecialOffers = async () => {
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, { page_id, page_size })
      if (response.data) {
        specialOffers.value = response.data
      }
    } catch (error) {
      throw error
    }
  }

  // deleteSpecialOffer function delete specialOffers from db
  async function deleteSpecialOffer(id: number) {
    try {
      idForDelete.value = 0
      await makeRequest(endpoint, 'DELETE', {}, {}, {}, id)
      getSpecialOffers()
    } catch (error) {
      throw error
    }
  }

  // addEditSpecialOffer function edit specialOffers
  async function addEditSpecialOffer(id: number, formdata: any) {
    try {
      if (id) {
        await makeRequest(endpoint, 'PUT', formdata, {}, {}, id)
      } else {
        await makeRequest(endpoint, 'POST', formdata, {}, {})
      }
      getSpecialOffers()
    } catch (error) {
      throw error
    }
  }

  getSpecialOffers()

  return {
    specialOffers,
    getSpecialOffers,
    addEditSpecialOffer,
    deleteSpecialOffer,

    showAddEditModal,
    addEditSpecialOfferData,
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
