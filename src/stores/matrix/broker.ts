import { ref } from 'vue'
import { defineStore } from 'pinia'
import { makeRequest, state  } from '@/request/request'

export const useBrokersStore = defineStore('brokers', () => {
  const endpoint = 'brokers'
  const wait=0
  const brokers = ref<any[]>([])
  const brokersByUserId = ref([])
  const showAddEditModal = ref(false)
  const editBrokerData = ref({})
  const showDeleteConfirmationModal = ref(false)
  const idForDelete = ref(0)

  const showOrderOptionModal = ref<boolean>(false)
  const showWebhookOrdersModal = ref<boolean>(false)
  const showMatrixOrdersModal = ref<boolean>(false)
  const storeBrokerId = ref(0)

  const showOrderPositionModal = ref<boolean>(false)
  const brokerOrders = ref<any>([])
  const showPositions = ref<boolean>(false)
  const brokerPositions = ref<any>([])
  const showSqOffModal = ref<boolean>(false)
  const brokerPosSqOffData = ref<any>({})

  const showBrokerName = ref<string>('')
  const storedBrokerData = ref<any>({})

const mockdata ={
  "status": "success",
  "message": "Brokers fetched successfully",
  "data": [
      {
          "id": 2,
          "domain_id": 1,
          "user_id": 1,
          "broker_userid": "A537412",
          "broker_password": "0098",
          "broker_pin": "0098",
          "broker_qr_key": "2AZW5RYNRXEDXC5WRFXB2AR6GI",
          "broker_api": "9H7XvPCk",
          "broker_api_secret": "135",
          "broker_name": "angel",
          "token_status": "success",
          "broker_token": "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IkE1Mzc0MTIiLCJyb2xlcyI6MCwidXNlcnR5cGUiOiJVU0VSIiwidG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnlYM1I1Y0dVaU9pSmpiR2xsYm5RaUxDSjBiMnRsYmw5MGVYQmxJam9pZEhKaFpHVmZZV05qWlhOelgzUnZhMlZ1SWl3aVoyMWZhV1FpT2pFeExDSnpiM1Z5WTJVaU9pSXpJaXdpWkdWMmFXTmxYMmxrSWpvaVlqWmhPVGRqWVdNdE4yUmlPUzB6WVdVeExUZzNaV1F0Wm1KbU9ERmtNV1JpTVRBNElpd2lhMmxrSWpvaWRISmhaR1ZmYTJWNVgzWXhJaXdpYjIxdVpXMWhibUZuWlhKcFpDSTZNVEVzSW5CeWIyUjFZM1J6SWpwN0ltUmxiV0YwSWpwN0luTjBZWFIxY3lJNkltRmpkR2wyWlNKOWZTd2lhWE56SWpvaWRISmhaR1ZmYkc5bmFXNWZjMlZ5ZG1salpTSXNJbk4xWWlJNklrRTFNemMwTVRJaUxDSmxlSEFpT2pFM01qUTFOakF3TnpNc0ltNWlaaUk2TVRjeU5EUTNNelU1T1N3aWFXRjBJam94TnpJME5EY3pOVGs1TENKcWRHa2lPaUpoWldGaU1qa3lZeTAxT0RaaUxUUTRNamN0T0RRMk15MWtPRGhpTjJRNU1tWmhaRFFpZlEualhiMEJMdEgtNlZralRqNmZ1VmpDYWs0Mi1ETkEyNTc4Y0VVYUZ0Q2ZHSkMxNG5vU1dfRUh1VksxZXVOXzVvOVQ5NkpkdXNhOENFNGo2UElDUExfYmRiVEh0M09ENXdVODYxbkVvNzJ1WnVwWE45M005VE05cU02YlZaVDZvRlhxbHRpYXBleWVTUnZXLWhWcU9NOFpnd3I0X1BOSk5LSy01RWZMb2x4V3lRIiwiQVBJLUtFWSI6IjlIN1h2UENrIiwiaWF0IjoxNzI0NDczNjU5LCJleHAiOjE3MjQ1NjAwNzN9.ZfsiyFJsUPU9CggVSVEijASvMaGJk7GxfWU7kfEW6MGOZIyncshYNvzP2YxBp5U1goEr9rxJICI5pa0pCyT1ow",
          "broker_token_date": "2024-08-24T09:57:39Z",
          "is_active": false,
          "is_autologin": false,
          "is_disabled": false,
          "is_editable": false,
          "broker_image_url": "",
          "message": "Token successfully generated",
          "created_at": "2023-11-07T09:16:25Z",
          "updated_at": "2024-08-24T09:57:39Z"
      },
      {
          "id": 3,
          "domain_id": 1,
          "user_id": 1,
          "broker_userid": "AB046230",
          "broker_password": "1",
          "broker_pin": "4543",
          "broker_qr_key": "AppName ewtwet\nClientCode ewtewt\nClientPassword etetwe\nProvideDob 19991212\nOcpApimSubKey tewtew\nEncryKey tetwetw\nUserKey safsaf\nAppSource sfsaf\n",
          "broker_api": "ZCf46tl7zriTyCcxpteBtM8b2Q26VNs0QSgXOH8rvJHj8EvD2KI7crPiKkSq8aj2RZNRxXRoyQ5MTbhacD1Fxt9SzbpFL6ka0RCtu0IMZ6BRZk72tIPAWnRr0S2xi2Rn",
          "broker_api_secret": "5643",
          "broker_name": "iifl",
          "token_status": "failed",
          "broker_token": "",
          "broker_token_date": "2024-08-20T16:32:31Z",
          "is_active": false,
          "is_autologin": false,
          "is_disabled": false,
          "is_editable": false,
          "broker_image_url": "",
          "message": "",
          "created_at": "2023-11-20T14:14:12Z",
          "updated_at": "2024-08-24T09:52:07Z"
      },
      {
          "id": 6,
          "domain_id": 1,
          "user_id": 1,
          "broker_userid": "A5374126123344",
          "broker_password": "test123",
          "broker_pin": "2AZW5RYNRXEDXC",
          "broker_qr_key": "demoooo",
          "broker_api": "9H7XvPhbfg",
          "broker_api_secret": "1",
          "broker_name": "zerodha",
          "token_status": "",
          "broker_token": "",
          "broker_token_date": "2024-08-13T06:56:59Z",
          "is_active": true,
          "is_autologin": false,
          "is_disabled": false,
          "is_editable": false,
          "broker_image_url": "",
          "message": "",
          "created_at": "2024-04-01T17:53:24Z",
          "updated_at": "2024-08-14T12:27:00Z"
      },
      {
          "id": 7,
          "domain_id": 1,
          "user_id": 1,
          "broker_userid": "A537412612",
          "broker_password": "test123",
          "broker_pin": "2AZW5RYNRXEDXC",
          "broker_qr_key": "demoooo",
          "broker_api": "9H7XvPhbfg",
          "broker_api_secret": "1",
          "broker_name": "angel",
          "token_status": "failed",
          "broker_token": "",
          "broker_token_date": "2024-07-10T10:22:17Z",
          "is_active": false,
          "is_autologin": false,
          "is_disabled": false,
          "is_editable": false,
          "broker_image_url": "",
          "message": "",
          "created_at": "2024-04-01T17:54:26Z",
          "updated_at": "2024-08-27T13:26:33Z"
      },
      {
          "id": 25,
          "domain_id": 1,
          "user_id": 1,
          "broker_userid": "rqwerrwerwer",
          "broker_password": "rwerewrw",
          "broker_pin": "",
          "broker_qr_key": "AppName ewtwetwt\nClientCode etwetet\nClientPassword etete\nProvideDob 19981212\nOcpApimSubKey frewewewt\nEncryKey ewtetwet\nUserKey tetetet\nAppSource etete\n",
          "broker_api": "",
          "broker_api_secret": "",
          "broker_name": "iifl",
          "token_status": "failed",
          "broker_token": "",
          "broker_token_date": "2024-08-14T12:39:36Z",
          "is_active": false,
          "is_autologin": false,
          "is_disabled": false,
          "is_editable": false,
          "broker_image_url": "",
          "message": "",
          "created_at": "2024-04-20T17:38:38Z",
          "updated_at": "2024-08-28T14:32:17Z"
      },
      {
          "id": 34,
          "domain_id": 1,
          "user_id": 1,
          "broker_userid": "ryerye",
          "broker_password": "ryeryey",
          "broker_pin": "ryeryery",
          "broker_qr_key": "",
          "broker_api": "",
          "broker_api_secret": "",
          "broker_name": "mhtrade",
          "token_status": "failed",
          "broker_token": "",
          "broker_token_date": "2024-05-02T05:52:53Z",
          "is_active": true,
          "is_autologin": false,
          "is_disabled": false,
          "is_editable": false,
          "broker_image_url": "",
          "message": "401 Unauthorized",
          "created_at": "2024-04-24T15:49:12Z",
          "updated_at": "2024-05-22T17:51:36Z"
      },
      {
          "id": 37,
          "domain_id": 1,
          "user_id": 1,
          "broker_userid": "A53456474126",
          "broker_password": "test123",
          "broker_pin": "",
          "broker_qr_key": "AppName SSDAV\nClientCode gdsgedw\nClientPassword erwwrw\nProvideDob 19981212\nOcpApimSubKey rwrqwr\nEncryKey wrqwrq\nUserKey rwwqrw\nAppSource rwrwrw\n",
          "broker_api": "",
          "broker_api_secret": "",
          "broker_name": "iifl",
          "token_status": "failed",
          "broker_token": "",
          "broker_token_date": "2024-08-14T12:39:38Z",
          "is_active": false,
          "is_autologin": false,
          "is_disabled": false,
          "is_editable": false,
          "broker_image_url": "",
          "message": "",
          "created_at": "2024-08-13T16:49:14Z",
          "updated_at": "2024-08-28T11:47:05Z"
      },
      {
          "id": 57,
          "domain_id": 1,
          "user_id": 1,
          "broker_userid": "fsdfsdffsd",
          "broker_password": "sfsfsfsf",
          "broker_pin": "",
          "broker_qr_key": "sdfssfs",
          "broker_api": "sdssfs",
          "broker_api_secret": "",
          "broker_name": "shoonya",
          "token_status": "failed",
          "broker_token": "",
          "broker_token_date": "2000-01-01T00:00:00Z",
          "is_active": false,
          "is_autologin": false,
          "is_disabled": false,
          "is_editable": false,
          "broker_image_url": "",
          "message": "invalid qr key",
          "created_at": "2024-08-27T12:54:20Z",
          "updated_at": "2024-08-28T11:03:57Z"
      },
      {
          "id": 58,
          "domain_id": 1,
          "user_id": 1,
          "broker_userid": "stertrert",
          "broker_password": "temp1234",
          "broker_pin": "",
          "broker_qr_key": "",
          "broker_api": "",
          "broker_api_secret": "",
          "broker_name": "dhan",
          "token_status": "failed",
          "broker_token": "tretrtr",
          "broker_token_date": "2000-01-01T00:00:00Z",
          "is_active": false,
          "is_autologin": false,
          "is_disabled": false,
          "is_editable": true,
          "broker_image_url": "",
          "message": "Invalid access token:401 Unauthorized",
          "created_at": "2024-08-28T09:26:30Z",
          "updated_at": "2024-08-28T11:46:27Z"
      },
      {
          "id": 59,
          "domain_id": 1,
          "user_id": 1,
          "broker_userid": "HFGR53455",
          "broker_password": "sfsfsfsf",
          "broker_pin": "2AZW5RYNRXEDXC5WRFXB2AR6GI",
          "broker_qr_key": "sdfssfs",
          "broker_api": "sdssfs",
          "broker_api_secret": "test123",
          "broker_name": "alice",
          "token_status": "failed",
          "broker_token": "",
          "broker_token_date": "2000-01-01T00:00:00Z",
          "is_active": false,
          "is_autologin": false,
          "is_disabled": false,
          "is_editable": true,
          "broker_image_url": "",
          "message": "API key not available. Please generate API key",
          "created_at": "2024-08-28T17:23:30Z",
          "updated_at": "2024-08-29T11:46:26Z"
      }
  ]
}
  const getBrokers = async () => {
    try {
      const response = await mockdata
      if (response.data){
        brokers.value = response.data
      } else {
          brokers.value = [];
      }
    } catch (error) {
      throw error
    }
  }
  
  const getBrokersById = (id: number) => {
    return brokers.value.find((broker: any) => broker.id === id);
  }

  const getBrokersByUserId = async (id: number, subEndpoint: string) => {
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, {}, 0, id, subEndpoint)
      if (response.data) {
        brokersByUserId.value = response.data
      } else {
        brokersByUserId.value = []
      }
    } catch (error) {
      throw error
    }
  }

  const showOrdersview = async (broker: any) => {
    state['getBrokerOrders']={
      loading: true,
      data: null,
      error: {},
      updating:false
    }
    
    let response = await makeRequest("getBrokerOrders", "GET", {}, {}, {}, 0, broker.id, );
    
    try{
        if(response.data){
          if(response.data.order){
              brokerOrders.value=response.data.order || []
          }else{
              brokerOrders.value=[]
          }
          if (response.data.position){
              brokerPositions.value=response.data.position || []
          }else{
              brokerPositions.value=[]
          }
        } else {
            brokerOrders.value=[]
            brokerPositions.value=[]
        }
        
        showBrokerName.value = broker.broker_name;
        
        
        brokerPosSqOffData.value.broker_id = broker.id
        brokerPosSqOffData.value.user_id = broker.user_id
        brokerPosSqOffData.value.broker_userid = broker.broker_userid
        brokerPosSqOffData.value.broker_api = broker.broker_api
        brokerPosSqOffData.value.broker_api_secret = broker.broker_api_secret
        brokerPosSqOffData.value.broker_name = broker.broker_name


    } catch (error) {
      brokerOrders.value=[]
      brokerPositions.value=[]
      throw error
    }
}

const findBrokerById = (id: number) => {
  return brokers.value.find((broker: any) => broker.id === id);
};

  const deleteBroker = async (id: number) => {
    try {
      await makeRequest(endpoint, 'DELETE', {}, {}, {}, 0, id)
      // getBrokers()
    } catch (error) {
      throw error
    }
  }

  // addEditBroker function edit broker
  async function addEditBroker(id: number, formdata: any) {
    try {
      if (id) {
        await makeRequest(endpoint, 'PUT', formdata, {}, {},0, id)
      } else {
        await makeRequest(endpoint, 'POST', formdata, {}, {}, 0)
      }
      // getBrokers()
    } catch (error) {
      throw error
    }
  }

  getBrokers()

  return {
    endpoint,
    wait,
    state,
    brokers,
    brokersByUserId,
    getBrokers,
    findBrokerById,
    deleteBroker,
    getBrokersById,
    getBrokersByUserId,
    addEditBroker,
    showOrdersview,

    showAddEditModal,
    editBrokerData,
    showDeleteConfirmationModal,
    idForDelete,
    showOrderOptionModal,
    showWebhookOrdersModal,
    showMatrixOrdersModal,
    storeBrokerId,

    showOrderPositionModal,
    showBrokerName,
    storedBrokerData,
    brokerOrders,
    showPositions,
    brokerPositions,
    showSqOffModal,
    brokerPosSqOffData,
  }
})
