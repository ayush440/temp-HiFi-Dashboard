<template>
  <div class="hidden sm:flex border border-white bg-white rounded-lg mt-5 w-auto justify-between items-center pl-10 pr-4 ml-6 mr-6 py-4">
    <!-- Page Name -->
    <div class="unselectable capitalize font-bold text-2xl text-fourth dark:text-tableText"> 
      <span v-if="!isDashboard">{{ title }}</span>
      <span v-if="isDashboard" >Hello {{ profile?.name }} 👋</span>
    </div>

    <div class="hidden sm:flex items-center pt-0 2xl:pt-2 pr-0 2xl:pr-2">
      <!-- Toggle Switch -->
      <div v-if="isDashboard" class="mr-4">
        <div 
          class="relative inline-flex items-center rounded-full cursor-pointer w-[160px] h-[32px] bg-white border border-gray-200" 
          @click="toggleMode"
        >
          <div 
            class="absolute w-[80px] h-[32px] bg-black rounded-full transition-transform duration-300 ease-in-out" 
            :class="[modelValue === 'live' ? 'translate-x-[80px]' : '']"
          ></div>
          <span 
            class="relative z-10 w-[80px] text-center text-sm font-medium transition-colors duration-300" 
            :class="[modelValue === 'paper' ? 'text-white' : 'text-gray-500']"
          >
            Paper
          </span>
          <span 
            class="relative z-10 w-[80px] text-center text-sm font-medium transition-colors duration-300" 
            :class="[modelValue === 'live' ? 'text-white' : 'text-gray-500']"
          >
            Live
          </span>
        </div>
      </div>

      <!-- Notification -->
      <PopupDropdown :isOpen="showNotificationModal" @close="closeNotificationModal" dropdownClass="dropdown-1 top-[100%] shadow-lg border border-third-light dark:border-third">
        <template #dropdown-toggle>
          <div class="p-2 2xl:p-2.5 mx-1 bg-secondary small-box-shadow rounded-full" @click="toggleNotificationModal">
            <BellIcon class="w-4 h-4 2xl:w-5 2xl:h-5 cursor-pointer" />
          </div>
        </template>

        <template #dropdown-body>
          <div class="max-h-[320px] overflow-y-scroll text-gray-600 dark:text-white text-center p-2">
            <div v-if="notifications.length > 0" class="cursor-pointer relative" v-for="notification in notifications" :key="notification.id">
              <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                  <a href="javascript:;" class="font-medium truncate mr-5">{{notification.heading}}</a>
                  <div class="text-xs text-slate-400 ml-auto whitespace-nowrap">
                    {{notification.time}}
                  </div>
                </div>
                <div class="text-left truncate text-slate-400 mt-0.5">
                  Strategy: {{ notification.strategy ? notification.strategy.name : 'N/A' }}
                </div>
                <div class="text-left truncate text-slate-400 mt-0.5">
                  Exchange: {{ notification.exchange }}
                </div>
                <div class="text-left truncate text-slate-400 mt-0.5">
                  Side: {{ notification.side }}
                </div>
                <div class="text-left truncate text-slate-400 mt-0.5">
                  Symbol: {{ notification.tradingsymbol }}
                </div>
                <div class="text-left truncate text-slate-400 mt-0.5">
                  {{notification.message}}
                </div>
              </div>
            </div>
            <span v-else>
              You have no notifications
            </span>
          </div>
        </template>
      </PopupDropdown>

      <!-- Profile -->
      <PopupDropdown :isOpen="showProfileModal" @close="closeProfileModal" dropdownClass="dropdown-1 max-w-56 top-[100%] right-[70%] shadow-lg border border-third-light dark:border-third">
        <template #dropdown-toggle>
          <div class="flex">
            <div class="p-2 2xl:p-2.5 mx-1 bg-secondary small-box-shadow rounded-full" @click="toggleProfileModal">
              <UserIcon class="w-4 h-4 2xl:w-5 2xl:h-5 cursor-pointer" />
            </div>
            <div class="hidden md:block">
              <div class="font-bold text-xs">{{ profile?.name }}</div>
              <p class="text-xs">{{ profile?.user_role }}</p>
            </div>
          </div>
        </template>
        <template #dropdown-body>
          <div class="font-bold text-xl">Profile</div>
          <div class="font-medium capitalize pb-2">
            {{ profile?.name }} <br>
            <span class="text-sm lowercase">{{ profile?.email }}</span>
          </div>
          <div @click="clickProfile" class="profile-option">
            <UserIcon class="icon-size ml-0" />My Profile
          </div>
          <div @click="clickRefresh" class="profile-option">
            <RefreshCwIcon class="icon-size p-[1px] ml-0" />Refresh
          </div>
          <div class="profile-option">
            <HelpCircleIcon class="icon-size ml-0" />Help
          </div>
          <div class="profile-option" @click="logout">
            <LockIcon class="icon-size ml-0" />Logout
          </div>
        </template>
      </PopupDropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useProfileStore } from '@/stores/matrix/profile'
import { useNotificationsStore } from '@/stores/matrix/notification'
import { useStrategiesStore } from '@/stores/matrix/strategy'
import { useNavlinksStore } from '@/stores/navlinks'
import PopupDropdown from '@/components/PopupDropdown.vue'
import { BellIcon, UserIcon, RefreshCwIcon, HelpCircleIcon, LockIcon } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: 'paper' | 'live'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: 'paper' | 'live'): void
}>()

const router = useRouter()
const route = useRoute()
const notificationStore = useNotificationsStore()
const strategiesStore = useStrategiesStore()
const navlinksStore = useNavlinksStore()
const profileStore = useProfileStore()

const { navlinks } = storeToRefs(navlinksStore)
const { notificationsData } = storeToRefs(notificationStore)
const { strategies } = storeToRefs(strategiesStore)
const { profile } = storeToRefs(profileStore)

const toggleMode = () => {
  emit('update:modelValue', props.modelValue === 'paper' ? 'live' : 'paper')
}

const title = computed(() => {
  let name = route.name?.toString() || ''
  if (name) {
    let titleData = navlinks.value.find((item: any) => item.name === name)
    return titleData && titleData.title ? titleData.title : name
  }
  return ''
})

const isDashboard = computed(() => {
  return route.name === 'dashboard'
})

const showNotificationModal = ref(false)
const showProfileModal = ref(false)

const notifications = computed(() => {
  if (
    notificationsData.value &&
    strategies.value &&
    strategies.value.length > 0 &&
    notificationsData.value.length > 0
  ) {
    const strategyMap = new Map(strategies.value.map((strategy: { id: any }) => [strategy.id, strategy]))
    return notificationsData.value.map((notification: { strategy_id: unknown }) => ({
      ...notification,
      strategy: strategyMap.get(notification.strategy_id) || null,
    }))
  }
  return []
})

const closeNotificationModal = () => {
  showNotificationModal.value = false
}

const toggleNotificationModal = () => {
  showNotificationModal.value = !showNotificationModal.value
}

const closeProfileModal = () => {
  showProfileModal.value = false
}

const toggleProfileModal = () => {
  showProfileModal.value = !showProfileModal.value
}

const clickProfile = () => {
  router.push({ name: 'profile' })
  showProfileModal.value = false
}

const clickRefresh = () => {
  window.location.reload()
}

const logout = () => {
  // Implement logout functionality
  console.log('Logout clicked')
}
</script>

<style scoped>
.profile-option {
  @apply hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-40 cursor-pointer flex bg-secondary dark:bg-primary dark:bg-opacity-50 dark:shadow-slate-600 rounded p-1 my-1 shadow-sm;
}

.icon-size {
  @apply m-1 h-4 w-4;
}
</style>