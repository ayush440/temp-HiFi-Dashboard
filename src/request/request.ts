import { ref, toRefs, reactive, computed } from 'vue';
import router from "@/router/index";
import { ManageApiResponse } from "./manageResponse";
import config from '../../matrixcnfg';
import { useToastStore } from '../stores/utils/toast'

const toastStore = useToastStore()
const { addToast } = toastStore



const token: any = ref(null);
const isAuthenticated = ref(false)

const userRole: any = ref(null)



token.value = localStorage.getItem('token');
if (token.value) {
  try {
    userRole.value = localStorage.getItem('role');
    isAuthenticated.value = true
  } catch (error) {
    isAuthenticated.value = false
    userRole.value = null
    localStorage.setItem('role', "");
  }

}


const setisAuthenticated = (value: boolean, role: any) => {
  isAuthenticated.value = value;
  userRole.value = role
};
const getisAuthenticated = () => {
  return isAuthenticated.value
};


const setToken = (tokendata: any) => {
  token.value = tokendata;
};
const getToken = () => {

  return token.value;
};




const channel = new BroadcastChannel('my-channel');
channel.addEventListener('message', (event) => {
  const message = event.data;
  if (message.type === 'logout') {
    logout()
  }
});

const canMakeRequest = ref<boolean>(true);

const logout = async () => {
  canMakeRequest.value = false
  await makeRequest("logout", "POST", {}, {}, {}, 0, null);

  if (localStorage.getItem('token') != "") {

    channel.postMessage({ type: 'logout', data: 'logged out' });
  }

  setToken(null);
  localStorage.setItem('token', "");
  localStorage.setItem('role', "");
  userRole.value = null




  router.push({ name: 'login' });
  // window.location.reload();
};

const showToast = (message: string, type: string='warning') => {
  addToast(message, type)
}


import axios from 'axios';
axios.defaults.silent = true;
axios.defaults.withCredentials = true;
let baseUrl: any
if (config.env == "production") {
  const currentRootUrl = window.location.origin;
  baseUrl = ref(currentRootUrl);
} else {

  baseUrl = ref("http://localhost:8081");
}




let domain = ''//'matrix/'

const endpoints: any = ref({
  login: '/auth/login/email',
  register: '/auth/user/signup',
  logout: '/auth/user/logout',
  verifyOTP: '/auth/email/verify',
  sendForgotOTP: '/auth/email/resend-otp',
  forgot: '/auth/forgot',
  profile: '/auth/user/profile',
  brokers: '/user/brokers',
  orders: `/user/${domain}orders`,
  positions: `/user/${domain}positions`,
  alerts: `/user/${domain}alerts`,
  notifications: '/user/notifications',
  plan_strategy: '/user/plans',
  positionsPaper: `/user/${domain}strategy_paper_pos`,
  videos: '/user/videos',
  errors: `/user/${domain}errors`,
  matrixJoiners: `/user/${domain}strategyJoin`,
  generateToken: '/user/generate-token',
  getBrokerOrders: '/user/broker/getorders',
  updateUser: '/auth/user/userupdate',
  changePassword: '/auth/user/changepassword',
  invoices: '/user/invoice',
  invoiceItems: '/user/invoice/item',
  invoiceConfigration: '/user/invoice/configration',
  getOfferByPromo: '/user/get-offer',
  strategy_details: `/user/${domain}strategy_details`,
  social: '/user/social/api',
  brokerOrder: '/user/broker-order/sqoff',
  orderPositions: '/user/broker/getorders',
  manualOrders: '/user/group/order',
  manualPositions: '/user/group/position',
  logo: '/user/getlogo',

  closeManualPosition: '/user/group/position/mark-closed',
  closePosition: `/user/${domain}positions/mark-closed`,
})



const getApiUrl = (endpoint: string) => {
  if (config.env != "production") {
    if (endpoint === "login" || endpoint === "logout" || endpoint === "profile" || endpoint === "updateUser" || endpoint === "changePassword" || endpoint === "register" || endpoint === "verifyOTP" || endpoint === "sendForgotOTP" || endpoint === "forgot") {
      baseUrl = ref("http://localhost:8081");
    } else {
      baseUrl = ref("http://localhost:8082");
    }
  }


  return `${baseUrl.value}${endpoints.value[endpoint]}`;
};

const state = reactive<Record<string | number, any>>({});

// Function to create the state properties for an endpoint
function createStateForEndpoint(endpoint: string) {
  if (!state[endpoint]) {
    state[endpoint] = {
      loading: true,
      data: null,
      error: {},
      updating: false
    }
  } else {
    state[endpoint].updating = true
  };
}


const makeApiRequest = async (config: any, wait: number, endpoint: string, id: any) => {
  if (isAuthenticated.value) {
    config.headers = {
      ...config.headers,
      Authorization: token.value,
    };
  } else if (endpoint != "login" && endpoint != "register" && endpoint != "verifyOTP" && endpoint !== 'logo') {
    router.push({ name: 'login' });
  }
  await sleep(wait)
  try {
    const response = await axios(config);

    state[endpoint].error = null;
    if (response.status === 200 && (endpoint === 'getBrokerOrders' || endpoint === 'login' || endpoint === 'sendForgotOTP' || endpoint === 'webhookAlerts' || (config.method === 'GET' && (!id || endpoint === 'webhookStrategyJoiners')))) {
      return response.data;
    } else {
      // console.log("Print response", response);
      ManageApiResponse(response, endpoint, config.method);
      return response.data
    }
  } catch (error: any) {
    if (error.message == "Network Error") {
      state[endpoint].error = { ...error, statusText: error.message }
    } else if (error.response.status == 401) {
      localStorage.setItem('token', "")
      localStorage.setItem('role', "");
      state[endpoint].error = error.response;
      router.push({ name: 'login' });
      // handle errror in console if token or Session is expired
      if (endpoint !== 'login' && endpoint !== 'register' && endpoint !== 'verifyOTP' && endpoint !== 'sendForgotOTP' && endpoint !== 'forgot') {
          window.location.reload();
      }
    
    } else {
      state[endpoint].error = error.response;
    }

    if (error.response.status !== 401 && error.response.status !== 503 && endpoint !== 'login' && endpoint !== 'register' && endpoint !== 'verifyOTP' && endpoint !== 'sendForgotOTP' && endpoint !== 'forgot' && endpoint !== 'webhookPositions' && endpoint !== 'positionsPaper' && endpoint !== 'notifications' && endpoint !== 'plans' && endpoint !== 'orders') {
      ManageApiResponse(error.response, endpoint, config.method);
    }
    state[endpoint].loading = false;

    return "";
  } finally {
    state[endpoint].loading = false;
    state[endpoint].updating = false;
  }
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const makeRequest = async (endpoint: string, method: string, data = {}, config = {}, params = {}, wait = 0, id: any = null, subEndpoint: any=null) => {
  let url = getApiUrl(endpoint);
  if(endpoint === "login" || endpoint === "register" || endpoint === "verifyOTP") canMakeRequest.value = true;
  if (((method === 'DELETE' || method === 'PUT') && id != null) || (method === 'GET' && id != null) ) {
    if(subEndpoint==null){
    url=`${url}/${id}`
    }else if(id === 0){
      url=`${url}/${subEndpoint}`
    }else{
      url=`${url}/${subEndpoint}/${id}`
    }
  }

  createStateForEndpoint(endpoint);
  // if(canMakeRequest.value || endpoint=== "logout"){
    if (method === 'GET') {
      if (userRole.value !== 'Demo' || endpoint === 'profile' || endpoint === 'plans') {
        const queryParams = new URLSearchParams(params);
        const fullUrl = queryParams.toString() ? `${url}?${queryParams.toString()}` : url;
        let response = await makeApiRequest({ ...config, method: 'GET', url: fullUrl }, wait, endpoint, id);
        return response
      } else {
        state[endpoint].loading = false;
        state[endpoint].updating = false;
        return []
      }
    } else if (method === 'POST') {
      let response = await makeApiRequest({ ...config, method: 'POST', url, data }, wait, endpoint, id);
      return response
    } else if (method === 'PUT') {
      let response = await makeApiRequest({ ...config, method: 'PUT', url, data }, wait, endpoint, id);
      return response
    } else if (method === 'DELETE') {
      let response = await makeApiRequest({ ...config, method: 'DELETE', url }, wait, endpoint, id);
      return response
    } else {
      throw new Error(`Invalid HTTP method: ${method}`);
    }
  }

// };

export { makeRequest,canMakeRequest,  state, setToken, getToken,isAuthenticated, getisAuthenticated, setisAuthenticated, logout, showToast, token };

