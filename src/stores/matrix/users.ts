import { ref } from 'vue'
import { defineStore } from 'pinia'
import { makeRequest } from '@/request/request'

export const useUsersStore = defineStore('users', () => {
  const users = ref<any>([])
  const endpoint = 'users'

  const requested = ref<number[]>([])
  const ignoreId = ref<number[]>([])

  const showAddEditModal = ref<boolean>(false)
  const addEditUserData = ref<any>({})

  const showDeleteConfirmationModal = ref<boolean>(false)
  const idForDelete = ref<any>(null)

  const showBrokersModal = ref<boolean>(false)
  const showPositionsModal = ref<boolean>(false)
  const storeUserId = ref(0)

  const showOrderOptionModal = ref<boolean>(false)
  const showWebhookOrdersModal = ref<boolean>(false)
  const showMatrixOrdersModal = ref<boolean>(false)

  const showJoinerOptionModal = ref<boolean>(false)
  const showWebhookJoinersModal = ref<boolean>(false)
  const showMatrixJoinersModal = ref<boolean>(false)

  const showOrdersModal = ref<boolean>(false)
  const showStrategiesModal = ref<boolean>(false)

  const searchInputText = ref<string>('');
  const currentPageNumber = ref<number>(1);
  const totalPages = ref<number>(0);
  const showStartRecords = ref<number>(1);
  const showEndRecords = ref<number>(0);
  const totalRecords = ref<number>(1);

  const getUsers = async () => {
    var page_id = currentPageNumber.value
    var page_size = 10
    var search = searchInputText.value
    
    try{
      const response = await makeRequest('users', 'GET', {}, {}, { page_id, page_size, search })
      if (response.data){
        users.value = response.data
      } else {
        users.value = [];
      }

    }catch (error) {
      throw error
    }
  }
  
  const getUsersById = async (id: number) => {
    return users.value.find((user: any) => user.id === id);
  }

  // deleteuser function delete user from db
  async function deleteUser(id: number) {
    try {
      idForDelete.value = null
      await makeRequest(endpoint, 'DELETE', {}, {}, {}, id)
      getUsers()
    } catch (error) {
      throw error
    }
  }

  // addEditUser function edit user
  async function addEditUser(id: number, formdata: any) {
    try {
      if (id) {
        await makeRequest(endpoint, 'PUT', formdata, {}, {}, id)
        getUsers()
      }
    } catch (error) {
      throw error
    }
  }

  getUsers()

  return {
    endpoint,
    users,
    getUsers,
    getUsersById,
    addEditUser,
    deleteUser,

    showAddEditModal,
    addEditUserData,

    showDeleteConfirmationModal,
    idForDelete,

    showBrokersModal,

    storeUserId,
    showOrderOptionModal,
    showWebhookOrdersModal,
    showMatrixOrdersModal,

    showJoinerOptionModal,
    showWebhookJoinersModal,
    showMatrixJoinersModal,

    showOrdersModal,
    showPositionsModal,
    showStrategiesModal,

    searchInputText,
    currentPageNumber,
    totalPages,
    showStartRecords,
    showEndRecords,
    totalRecords,
  }
})
