import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { defineStore } from 'pinia'
import { makeRequest,state } from '@/request/request'
import { useStrategiesStore } from '@/stores/matrix/strategy'
import { useBrokersStore } from '@/stores/matrix/broker'

export const useMatrixJoinersStore = defineStore('matrixJoiners', () => {
  const strategiesStore = useStrategiesStore()
  const brokersStore = useBrokersStore()
  const { strategies } = storeToRefs(strategiesStore)
  const { brokers } = storeToRefs(brokersStore)

  const endpoint = 'matrixJoiners'
  const wait =0
  const matrixJoiners = ref<any>([])
  const joinStrategyId = ref(0)

  const matrixJoinersByUserId = ref([])
  const selectedBrokerOptions = ref([])

  const showAddEditModal = ref(false)
  const addEditMatrixJoinerData = ref({})
  const showDeleteConfirmationModal = ref(false)
  const idForDelete = ref(0)

  const searchInputText = ref<string>('');
  const currentPageNumber = ref<number>(1);
  const totalPages = ref<number>(0);
  const showStartRecords = ref<number>(1);
  const showEndRecords = ref<number>(0);
  const totalRecords = ref<number>(1);


  const mockdata ={
    "status": "success",
    "message": "Strategy joins fetched successfully",
    "data": [
        {
            "id": 106,
            "broker_id": 2,
            "strategy_id": 12,
            "domain_id": 1,
            "lots": 2,
            "re_entry": 2,
            "re_entry_triggered": 0,
            "is_active": true,
            "created_at": "2024-08-30T09:13:54Z",
            "updated_at": "2024-08-30T09:13:54Z"
        },
        {
            "id": 110,
            "broker_id": 7,
            "strategy_id": 12,
            "domain_id": 1,
            "lots": 1,
            "re_entry": 1,
            "re_entry_triggered": 0,
            "is_active": false,
            "created_at": "2024-08-30T09:13:54Z",
            "updated_at": "2024-08-30T09:13:54Z"
        },
        {
            "id": 113,
            "broker_id": 34,
            "strategy_id": 12,
            "domain_id": 1,
            "lots": 1,
            "re_entry": 1,
            "re_entry_triggered": 0,
            "is_active": false,
            "created_at": "2024-08-30T09:13:54Z",
            "updated_at": "2024-08-30T09:13:54Z"
        },
        {
            "id": 114,
            "broker_id": 37,
            "strategy_id": 12,
            "domain_id": 1,
            "lots": 1,
            "re_entry": 1,
            "re_entry_triggered": 0,
            "is_active": false,
            "created_at": "2024-08-30T09:13:54Z",
            "updated_at": "2024-08-30T09:13:54Z"
        },
        {
            "id": 115,
            "broker_id": 2,
            "strategy_id": 7,
            "domain_id": 1,
            "lots": 1,
            "re_entry": 1,
            "re_entry_triggered": 0,
            "is_active": false,
            "created_at": "2024-08-30T09:13:54Z",
            "updated_at": "2024-08-30T09:13:54Z"
        },
        {
            "id": 116,
            "broker_id": 3,
            "strategy_id": 7,
            "domain_id": 1,
            "lots": 1,
            "re_entry": 1,
            "re_entry_triggered": 0,
            "is_active": false,
            "created_at": "2024-08-30T09:13:54Z",
            "updated_at": "2024-08-30T09:13:54Z"
        },
        {
            "id": 118,
            "broker_id": 6,
            "strategy_id": 7,
            "domain_id": 1,
            "lots": 1,
            "re_entry": 1,
            "re_entry_triggered": 0,
            "is_active": true,
            "created_at": "2024-08-30T09:13:54Z",
            "updated_at": "2024-08-30T09:13:54Z"
        },
        {
            "id": 119,
            "broker_id": 7,
            "strategy_id": 7,
            "domain_id": 1,
            "lots": 1,
            "re_entry": 1,
            "re_entry_triggered": 0,
            "is_active": false,
            "created_at": "2024-08-30T09:13:54Z",
            "updated_at": "2024-08-30T09:13:54Z"
        },
        {
            "id": 120,
            "broker_id": 25,
            "strategy_id": 7,
            "domain_id": 1,
            "lots": 1,
            "re_entry": 1,
            "re_entry_triggered": 0,
            "is_active": false,
            "created_at": "2024-08-30T09:13:54Z",
            "updated_at": "2024-08-30T09:13:54Z"
        },
        {
            "id": 121,
            "broker_id": 34,
            "strategy_id": 7,
            "domain_id": 1,
            "lots": 1,
            "re_entry": 1,
            "re_entry_triggered": 0,
            "is_active": false,
            "created_at": "2024-08-30T09:13:54Z",
            "updated_at": "2024-08-30T09:13:54Z"
        },
        {
            "id": 122,
            "broker_id": 37,
            "strategy_id": 7,
            "domain_id": 1,
            "lots": 1,
            "re_entry": 1,
            "re_entry_triggered": 0,
            "is_active": false,
            "created_at": "2024-08-30T09:13:54Z",
            "updated_at": "2024-08-30T09:13:54Z"
        }
    ]
}

  const getMatrixJoiners = async () => {
    try {
      const response = await mockdata

      if (response.data){
        matrixJoiners.value = response.data
      } else {
          matrixJoiners.value = [];
      }

    } catch (error) {
      throw error
    }
  }

  watchEffect(() => {
    if(strategies.value.length > 0 && brokers.value.length > 0 && matrixJoiners.value.length > 0) {
      for (let i = 0; i < matrixJoiners.value.length; i++) {
        const strgy = strategies.value.find(
          (s:any) => s.id === matrixJoiners.value[i].strategy_id
        );
        const brkr = brokers.value.find(
          (s:any) => s.id === matrixJoiners.value[i].broker_id
        )
        matrixJoiners.value[i].broker = brkr;
        matrixJoiners.value[i].strategy = strgy;
      }
    }
  })

  const getMatrixJoinersByUserId = async (id: number, subEndpoint: string) => {
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, {},0, id, subEndpoint)
      if (response.data) {
        matrixJoinersByUserId.value = response.data
      } else {
        matrixJoinersByUserId.value = []
      }
    } catch (error) {
      throw error
    }
  }

  // deleteMatrixJoiner function delete MatrixJoiner from db
  async function deleteMatrixJoiner(id: number) {
    try {
      idForDelete.value = 0
      await makeRequest(endpoint, 'DELETE', {}, {}, {},0, id)
      // getMatrixJoiners()
    } catch (error) {
      throw error
    }
  }

  // addEditMatrixJoiner function edit MatrixJoiner
  async function addEditMatrixJoiner(id: number, formdata: any) {
    try {
      if (id) {
        await makeRequest(endpoint, 'PUT', formdata, {}, {},0, id)
      } else {
        await makeRequest(endpoint, 'POST', formdata, {}, {}, 0)
      }
      // getMatrixJoiners()
    } catch (error) {
      throw error
    }
  }

  getMatrixJoiners()

  return {
    endpoint,
    state,
    matrixJoiners,
    joinStrategyId,
    matrixJoinersByUserId,
    getMatrixJoiners,
    getMatrixJoinersByUserId,
    addEditMatrixJoiner,
    deleteMatrixJoiner,
    selectedBrokerOptions,

    showAddEditModal,
    addEditMatrixJoinerData,
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
