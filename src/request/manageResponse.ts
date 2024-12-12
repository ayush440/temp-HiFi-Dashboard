import { ref } from 'vue';
import { computed } from 'vue';
import { useProfileStore } from '../stores/matrix/profile';
import { useBrokersStore } from '../stores/matrix/broker';
import { useInvoicesStore } from '../stores/matrix/invoice';
import { useInvoiceConfigrationStore } from '../stores/matrix/invoiceConfigration';
import { useMatrixJoinersStore } from '../stores/matrix/matrixJoiner';
import { useNotificationsStore } from '../stores/matrix/notification';
import { useOrdersStore } from '../stores/matrix/order';
import { usePaperPositionsStore } from '../stores/matrix/paperPositions';
import { usePositionsStore } from '../stores/matrix/position';
import { useManualPositionsStore } from '../stores/groups/manualPosition';
import { useManualOrdersStore } from '../stores/groups/manualOrders';
import { useSocialStore } from '../stores/matrix/social';
import { useStrategiesStore } from '../stores/matrix/strategy';
import { useVideosStore } from '../stores/matrix/video';

import { useToastStore } from '../stores/utils/toast'

import { makeRequest } from "./request";
const toastStore = useToastStore()
const { addToast } = toastStore
// let messageType=ref('');
const websocketResponseType = ref<any>([]);
let debounceTimer: NodeJS.Timeout | null = null;


const getMethods = ref<any>({
    brokers: 'getBrokers',
    invoices: 'getInvoices',
    invoiceConfigration: 'getInvoiceConfigration',
    matrixJoiners: 'getMatrixJoiners',
    orders: 'getOrders',
    positions: 'getPositions',
    manualPositions: 'getManualPositions',
    manualOrders: 'getManualOrders',
    positionsPaper: 'getPositionsPaper',
    updateUser: 'getUserInfo',
    social: 'getSocialInfo',
    plan_strategy: 'getStrategies',
    videos: 'getVideos',
  });
  
  const statusMessages: { [key: number]: string } = {
    200: 'Success: ',
    201: 'Created: ',
    400: 'Bad Request: ',
    401: 'Unauthorized: ',
    403: 'Forbidden: ',
    404: 'Not Found: ',
    500: 'Internal Server Error: ',
    502: 'Bad Gateway: ',
    503: 'Service Unavailable: ',
    504: 'Gateway Timeout: ',
  };
  
  const statusCodes: { [key: number]: string } = {
    200: 'success',
    201: 'success',
    400: 'error',
    401: 'error',
    403: 'warning',
    404: 'error',
    500: 'warning',
    502: 'error',
    503: 'error',
    504: 'error',
  };

  const endpointMessages: { [key: string]: string } = {
    brokers: 'Broker',
    invoices: 'Invoice',
    invoiceConfigration: 'Invoice Configration',
    matrixJoiners: 'Joiner',
    orders: 'Order',
    positions: 'Position',
    manualPositions: 'Manual Position',
    manualOrders: 'Manual Order',
    positionsPaper: 'Position Paper',
    updateUser: 'User',
    social: 'Social',
    plan_strategy: 'Strategy',
    videos: 'Video',
  };
  
  function playAudio(sound: string) {
    const audioSource = `./src/assets/sounds/${sound}.mp3`;
    const audio = new Audio(audioSource);
    audio.play();
  }
  
  function showToast(message: string, type: string = 'warning') {
    addToast(message, type);
  }
  
  function callStoreFunction(endpoint: string, method: string) {
    const storeFunction = storeFunctions[endpoint];
  
    if (typeof storeFunction === 'function') {
      storeFunction()[getMethods.value[endpoint]]();
    } else {
      console.error('Store function not found for endpoint:', endpoint);
    }
  }
  
  async function ManageApiResponse(response: any, endpoint: string, method: string) {
    if (response) {
      try {
        if (endpoint !== 'profile' && endpoint !== "videos" && endpoint !== "logout") {

            let message = statusMessages[response.status] + (response.data.message || 'Unknown status code');
    
            if (response.status === 404 && response.data === '404 page not found') {
            message = 'Internal Server Error: Something went wrong';
            }

            if (endpoint === 'matrixJoiners' && response.data.data) {

                const brokerStore = useBrokersStore();
                const broker = brokerStore.findBrokerById(response.data.data.broker_id);
                const strategisStore = useStrategiesStore();
                const strategy = strategisStore.findStrategyById(response.data.data.strategy_id);
                if (method === 'DELETE') {
                    message = 'Success: ' + broker.broker_userid + ' Deleted ' + strategy.name + ' (' + strategy.script + ')' + ' Successfully';
                } else if (method === 'PUT') {
                    message = 'Success: ' + broker.broker_userid + ' Updated ' + strategy.name + ' (' + strategy.script + ')' + ' Successfully';
                }
            }
            showToast(message, statusCodes[response.status]);

            
    
            if ((response.status >= 200 && response.status < 300) && endpoint !== 'changePassword' && endpoint !== 'register' && endpoint !== 'forgot' && endpoint !== 'verifyOTP' && endpoint !== 'getBrokerOrders' && endpoint !== 'brokerOrder' && endpoint !== 'orderPositions') {
              if(endpoint == 'closePosition') {
                endpoint = 'positions'
              }
              else if(endpoint == 'closeManualPosition') {
                endpoint = 'manualPositions'
              }
              else if (endpoint === 'positions') {
                  callStoreFunction('matrixJoiners', method);
              }
              else if (endpoint === 'generateToken') {
                  endpoint = 'brokers'
              }
              callStoreFunction(endpoint, method);
            }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
  
  async function ManageWebsocketResponse(response: any, lastRequest: boolean = false) {
    if (response.type) {

      // disable same response type operations and delay for 1 seconds
      const existingIndex = websocketResponseType.value.findIndex((item: any) => item.type === response.type);

      if(existingIndex !== -1) {
        websocketResponseType.value[existingIndex].data = response;

        if (debounceTimer) {
          clearTimeout(debounceTimer);

          debounceTimer = setTimeout(() => {
              let responseType = websocketResponseType.value.shift();
              if (responseType) {
                  ManageWebsocketResponse(responseType.data, true);
              }
              debounceTimer = null;
          }, 1000);
        }

        return
      }

      if(!lastRequest) {
        let data =  {
          type: response.type,
          data: response
        }
        websocketResponseType.value.push(data);
      }

      debounceTimer = setTimeout(() => {
          let responseType = websocketResponseType.value.shift();
          if (responseType) {
              ManageWebsocketResponse(responseType.data, true);
          }
      }, 1000);

      if(!lastRequest)  return



      try {
        const excludedTypes = ['brokers', 'webhookStrategies', 'webhookStrategyJoiners', 'updateUser', 'matrixJoiners', 'invoice', 'strategies', 'social', 'videos'];
  
        if (!excludedTypes.includes(response.type) && response.data) {
          if (response.type === 'brokerOrder') {
            const ordResponse = await makeRequest('getBrokerOrders', 'GET', {}, {}, {}, 0, response.data.id);
            const brokersStore = useBrokersStore() //storeFunctions.brokers();
            brokersStore.brokerOrders = ordResponse.data.order ? ordResponse.data.order : [];
            brokersStore.brokerPositions = ordResponse.data.position ? ordResponse.data.position : [];
          } else {
            let formattedTime = ''
            if (response.method === 'POST') {
                formattedTime = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' }).format(new Date(response.data.created_at));
            } else if (response.method === 'PUT') {
              if(response.type === 'groupOrders') {
                formattedTime = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' }).format(new Date(response.data.updated_at));
              }else{
                formattedTime = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' }).format(new Date(response.data.data.updated_at));
              }
            }
            let side = ''
            if (response.type === 'orders' ) {
                side = response.data.data.transaction_type
                try {
                    playAudio('order');
                } catch(error) {
                    console.error('Error playing audio:', error);
                }
            } else if (response.type === 'positions' || response.type === 'webhookPositions') {
                side = response.data.data.side
                try {
                    playAudio('order');
                } catch(error) {
                    console.error('Error playing audio:', error);
                }
            }

            let strategyId = ''
            if (response.type === 'webhookOrders' || response.type === 'webhookPositions') {
                strategyId = response.data.data.webhook_strategy_id
            } else {
                strategyId = response.data.data.strategy_id
            }

            const notificationsStore = storeFunctions.notifications();
            notificationsStore.notificationsData.push({
                id: response.data.id,
                strategy_id: strategyId,
                status: response.data.data.status,
                heading: response.type,
                exchange: response.data.data.exchange,
                tradingsymbol: response.data.data.tradingsymbol,
                side: side,
                time: formattedTime,
                message: response.data.description
            });
          }
  
          const message = 'Success: ' + response.data.description;
          showToast(message, statusCodes[200]);
        }

        if (response.type === 'groupOrders') {
            response.type ='manualOrders'
        }
  
        if (response.type !== 'brokerOrder') {
            if (response.type === 'positions') {
                const storeFunctiontemp = storeFunctions['matrixJoiners'];
                storeFunctiontemp()[getMethods.value['matrixJoiners']]();
            } 
          callStoreFunction(response.type, response.method);
        }
      } catch (error) {
        console.error('Error in websocket manage:', error);
      }
    }
  }
  
  const storeFunctions: any = {
    updateUser: () => useProfileStore(),
    brokers: () => useBrokersStore(),
    matrixJoiners: () => useMatrixJoinersStore(),
    positions: () => usePositionsStore(),
    manualPositions: () => useManualPositionsStore(),
    manualOrders: () => useManualOrdersStore(),
    positionsPaper: () => usePaperPositionsStore(),
    invoices: () => useInvoicesStore(),
    invoiceConfigration: () => useInvoiceConfigrationStore(),
    notifications: () => useNotificationsStore(),
    orders: () => useOrdersStore(),
    social: () => useSocialStore(),
    plan_strategy: () => useStrategiesStore(),
    videos: () => useVideosStore(),
  };
  
  export { ManageApiResponse, ManageWebsocketResponse };