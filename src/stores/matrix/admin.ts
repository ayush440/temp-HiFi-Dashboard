import { ref } from 'vue'
import { defineStore } from 'pinia'
import { makeRequest } from '@/request/request'

export const useAdminsStore = defineStore('admins', () => {
  const endpoint = 'admins'
  const admins = ref([])
  const wait=0

  const showAddEditModal = ref<boolean>(false)
  const editAdminData = ref<any>({})

  const showDeleteConfirmationModal = ref<boolean>(false)
  const idForDelete = ref<any>(null)

  const searchInputText = ref<string>('');
  const currentPageNumber = ref<number>(1);
  const totalPages = ref<number>(0);
  const showStartRecords = ref<number>(1);
  const showEndRecords = ref<number>(0);
  const totalRecords = ref<number>(1);

  const getAdmins = async () => {
    var page_id = currentPageNumber.value
    var page_size = 10
    var search = searchInputText.value
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, { page_id, page_size,search }, wait)
      if (response.data){
        admins.value = response.data
      } else {
          admins.value = [];
      }
    } catch (error) {
      throw error
    }
  }

  // deleteAdmin function delete Admin from db
  async function deleteAdmin(id: number) {
    try {
      idForDelete.value = null
      await makeRequest(endpoint, 'DELETE', {}, {}, {}, 0, id)
      // getAdmins()
    } catch (error) {
      throw error
    }
  }

  // editAdmin function edit admin
  async function editAdmin(id: number, formdata: any) {
    try {
      if (id) {
        await makeRequest(endpoint, 'PUT', formdata, {}, {},0, id)
        // getAdmins()
      }
    } catch (error) {
      throw error
    }
  }
  getAdmins()

  return {
    endpoint,
    admins,
    getAdmins,
    editAdmin,
    deleteAdmin,
    showAddEditModal,
    editAdminData,

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
