<template>
  <tr class="hidden sm:table-row intro-x">
    <td class="capitalize">
      <div class="flex items-center text-nowrap px-2">
        <img class="shadow-none w-4 h-4 mr-1" :src="images[broker.broker_name]" :alt="broker.broker_name" />
        {{ broker.broker_name }}
      </div>
    </td>
    <td class="text-left">{{ broker.broker_userid }}</td>
    <td class="text-center text-nowrap">
      {{ formatDate(broker.broker_token_date) }}
    </td>
    <td class="text-center flex justify-center">
      <ButtonSwitch @change="handleActiveChange" :id="`${broker.id}`" name="is_active" v-model="broker.is_active" />
    </td>
    <td class="text-center">
      <a class="flex items-center justify-center mr-3" @click="tokenGenerate(broker)" href="javascript:;" :class="getConnectButtonClass()">
        <Tippy class="tooltip flex items-center justify-center" :content="getConnectTooltipContent()">
          <span class="flex items-center">
            <component :is="getConnectIcon()" class="w-4 h-4 mr-1" :class="{ 'text-success': isConnected }" />
            {{ getConnectText() }}
          </span>
        </Tippy>
      </a>
    </td>
    <td>
      <div class="flex justify-center items-center">
        <button class="mr-2 flex items-center" @click="showEdit(broker)">
          <EditIcon class="w-4 h-4" /> Edit
        </button>
        <button class="mr-2 flex items-center" @click="showOrdersPosition(broker)">
          <EditIcon class="w-4 h-4" /> Orders/Positions
        </button>
      </div>
    </td>
  </tr>

  <!-- Mobile view -->
  <div class="intro-x visible sm:hidden relative my-1" :class="{ 'shadow-md dark:shadow-slate-600': fullDetails, 'shadow-sm dark:shadow-slate-600': !fullDetails }">
    <div class="px-4" :class="{ 'bg-secondary-dark font-semibold': fullDetails }">
      <div @click="fullDetails = !fullDetails" class="flex justify-between items-center py-3 text-sm cursor-pointer">
        <div class="flex items-center text-nowrap pl-2">
          <img class="shadow-none w-4 h-4 mr-2" :src="images[broker.broker_name]" :alt="broker.broker_name" />
          {{ `${broker.broker_name} - ${broker.broker_userid}` }}
          <RightArrowIcon class="w-[12px] h-[12px] inline ml-1 transform transition transition-delay-300" :class="{ 'rotate-[-90deg]': fullDetails, 'rotate-90': !fullDetails }" />
        </div>
        <ButtonSwitch @change="handleActiveChange" :id="`${broker.id}is_active`" name="is_active" v-model="broker.is_active" />
      </div>
    </div>

    <div v-if="fullDetails" class="p-2 capitalize bg-secondary-dark">
      <div class="flex flex-col text-sm overflow-hidden bg-secondary border dark:border-slate-600 p-2 pl-4 rounded-lg">
        <div class="flex items-center">
          <div class="font-semibold">Token Date:</div>
          <div class="ml-4">{{ formatDate(broker.broker_token_date) }}</div>
        </div>

        <div class="flex items-center my-1">
          <div class="flex flex-wrap justify-left">
            <div class="font-semibold mr-2">ACTIONS:</div>
            <button class="mr-2 flex items-center" @click="showEdit(broker)">
              <EditIcon class="w-4 h-4" />Edit
            </button>
            <button class="mr-2 flex items-center" @click="showOrdersPosition(broker)">
              <EditIcon class="w-4 h-4" />Orders/Positions
            </button>
          </div>
        </div>

        <div class="flex items-center">
          <div class="font-semibold">Connect:</div>
          <div class="ml-4">
            <a class="flex items-center mr-3" @click="tokenGenerate(broker)" href="javascript:;" :class="getConnectButtonClass()">
              <span class="flex items-center">
                <component :is="getConnectIcon()" class="w-3 h-3 mr-1 mt-1" :class="{ 'text-success': isConnected }" />
                {{ getConnectText() }}
              </span>
            </a>
          </div>
        </div>

        <div v-if="broker.message" class="flex items-center">
          <div class="font-semibold">Message:</div>
          <div class="ml-4" :class="getConnectButtonClass()">
            {{ getConnectTooltipContent() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBrokersStore } from '@/stores/matrix/broker'
import { useProfileStore } from '@/stores/matrix/profile'
import { images } from '@/assets/img'
import { makeRequest } from '@/request/request'
import { AlertCircleIcon, CheckCircleIcon, Link2Icon, EditIcon, ChevronRight} from 'lucide-vue-next'
import ButtonSwitch from '@/components/buttonSwitch.vue'
import Tippy from '@/components/tippy.vue'

const profileStore = useProfileStore()
const { profile } = storeToRefs(profileStore)

const brokersStore = useBrokersStore()
const { showAddEditModal, editBrokerData, showBrokerName, showOrderPositionModal, storedBrokerData } = storeToRefs(brokersStore)
const { getBrokers, addEditBroker, showOrdersview } = brokersStore

interface Broker {
  id: number
  broker_name: string
  user_id: number
  user_name: string
  broker_userid: string
  broker_token_date: string
  is_disabled: boolean
  is_active: boolean
  updated_at: string
  message: string
  token_status: string
}

const props = defineProps<{
  item: Broker
  index: number
}>()

const fullDetails = ref(false)
const broker = computed(() => props.item)

const tokenGenerate = async (broker: Broker): Promise<void> => {
  try {
    const response = await makeRequest("generateToken", "GET", {}, {}, {}, 0, broker.id)
    if (response.data && ["zerodha", "upstox", "gopocket"].includes(broker.broker_name)) {
      window.open(response.data.redirect_url, '_blank')
    }
  } catch (error) {
    console.error("Error in token generation:", error)
  }
}

const formatDate = (date: string): string => {
  return date.replace('T', ' ').replace('Z', '')
}

const isTokenDateToday = computed(() => {
  const brokerDate = new Date(broker.value.broker_token_date.replace("Z", "")).toLocaleDateString('en-CA')
  return brokerDate === new Date().toLocaleDateString('en-CA')
})

const isUpdatedToday = computed(() => {
  const updatedAt = new Date(broker.value.updated_at)
  const today = new Date()
  return updatedAt.toDateString() === today.toDateString()
})

const isConnected = computed(() => isTokenDateToday.value && broker.value.token_status === 'success')

const handleActiveChange = async () => {
  broker.value.is_active = !broker.value.is_active
  await addEditBroker(broker.value.id, { "is_active": !broker.value.is_active })
}

const showEdit = (broker: Broker) => {
  showAddEditModal.value = true
  editBrokerData.value = broker
}

const showOrdersPosition = (data: Broker) => {
  showBrokerName.value = data.broker_name
  storedBrokerData.value = data
  showOrderPositionModal.value = true
  showOrdersview(data)
}

const getConnectButtonClass = () => {
  if (isConnected.value) return 'text-success'
  if (isUpdatedToday.value && broker.value.token_status !== 'success') return 'text-danger'
  return ''
}

const getConnectIcon = () => {
  if (isUpdatedToday.value && broker.value.token_status === 'failed') return AlertCircleIcon
  if (isTokenDateToday.value) return CheckCircleIcon
  return Link2Icon
}

const getConnectText = () => {
  if (isConnected.value) return 'Connected'
  return 'Connect'
}

const getConnectTooltipContent = () => {
  if (isUpdatedToday.value && broker.value.token_status === 'failed') return broker.value.message || 'Error'
  if (isTokenDateToday.value) return broker.value.message || 'Connected'
  return 'Connect'
}
</script>