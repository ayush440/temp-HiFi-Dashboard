<template>
  <div class="relative">
    <!-- Mobile toggle button (visible only on small screens) -->
    <button
      @click="toggleSidebar"
      class="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
    >
      <MenuIcon v-if="!isOpen" class="w-6 h-6" />
      <XIcon v-else class="w-6 h-6" />
    </button>

    <!-- Sidebar -->
    <div 
      :class="[
        'fixed inset-y-0 left-0 z-40 bg-white shadow-lg transform transition-all duration-300 ease-in-out overflow-hidden',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0',
        'md:w-[68px]', // Fixed width for icon-only view on md screens
        'xl:w-64' // Expanded width for xl screens and above
      ]"
    >
      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="flex-shrink-0 p-4 border-b border-gray-200">
    <div class="flex items-center justify-center xl:justify-start">
      <RouterLink to="/" class="relative flex items-center justify-center w-16 sm:w-20 xl:w-[233px] h-16 overflow-hidden">
        <!-- Desktop Image (xl screens and above) -->
        <img 
          src="@/assets/img/hifilogo.png" 
          alt="HiFi Logo Desktop"
          class="hidden xl:block w-full h-full object-contain"
        />

        <!-- Tablet Image (sm to lg screens) -->
        <img 
          src="@/assets/img/mdlogo.png" 
          alt="HiFi Logo Tablet"
          class="hidden sm:block xl:hidden w-full h-full object-contain"
        />

       

        <!-- Fallback text if images fail to load -->
        <div 
          v-if="!imgLoad" 
          class="flex w-full font-bold justify-center mt-[-5px] text-3xl text-gray-600 dark:text-tableText"
        >
          {{ domainName }}
        </div>
      </RouterLink>
    </div>
  </div>
        
        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto scrollbar-hide">
          <div class="px-2 space-y-2 py-4">
            <router-link 
              v-for="item in navlinks" 
              :key="item.name" 
              :to="{ name: item.name }" 
              :class="[ 
                'flex items-center px-4 py-2 text-gray-700 rounded-lg transition-colors duration-200',
                $route.name === item.name ? 'bg-black text-white' : 'hover:bg-indigo-100'
              ]"
              @click="closeSidebar"
            >
              <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
              <span class="ml-3 truncate xl:inline hidden">{{ item.title }}</span>
            </router-link>
          </div>
        </nav>
      </div>
    </div>

    <!-- Overlay (visible only on small screens) -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
      @click="closeSidebar"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, onMounted, onUnmounted, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useNavlinksStore } from '@/stores/navlinks'
import { useLogoStore } from '@/stores/utils/logo'
import { useProfileStore } from '@/stores/matrix/profile'
import { UserIcon, MenuIcon, XIcon, BookOpenIcon } from 'lucide-vue-next'

const router = useRouter()
const isOpen = ref(false)
const showProfileMenu = ref(false)
const isXlScreen = ref(false)

// Check screen size
const checkScreenSize = () => {
  isXlScreen.value = window.innerWidth >= 1280 // xl breakpoint
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const closeSidebar = () => {
  isOpen.value = false
  showProfileMenu.value = false
}

const handleProfileClick = () => {
  if (isXlScreen.value) {
    router.push('/profile')
  } else {
    showProfileMenu.value = !showProfileMenu.value
  }
}

const navigateToProfile = () => {
  router.push('/profile')
  showProfileMenu.value = false
  closeSidebar()
}

const handleRefresh = () => {
  window.location.reload()
}

const handleLogout = () => {
  // Implement logout logic
  showProfileMenu.value = false
  closeSidebar()
}

// Click outside to close profile menu
const closeProfileMenu = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.profile-menu')) {
    showProfileMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeProfileMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeProfileMenu)
})

const route = useRoute()
const navlinkStore = useNavlinksStore()
const logoStore = useLogoStore()
const profileStore = useProfileStore()

const { navlinks } = storeToRefs(navlinkStore)
const { logoData } = storeToRefs(logoStore)
const { profile } = storeToRefs(profileStore)

const allRoutes = computed(() => router.getRoutes())

const findRoutes = (name: string) => {
  return allRoutes.value.find((route) => route.name === name)
}

onBeforeMount(() => {
  const url = window.location.href
  getDomain(url)
})

const imgName = ref('')
const imgName2 = ref('')
const imgLoad = ref(false)
const imgLoad2 = ref(false)

const domainName = computed(() => {
  return logoData.value
})

function handleImageLoad() {
  imgLoad.value = true
}

function handleImageError(error: any) {
  imgLoad.value = false
}

function handleImageLoad2() {
  imgLoad2.value = true
}

function handleImageError2(error: any) {
  imgLoad2.value = false
}

const getDomain = (url: string) => {
  const parsedUrl = new URL(url)
  let count = 0, newHostname = ''
  let urlHostNameArray = parsedUrl.hostname.split(".")

  for (let i = 0; i < urlHostNameArray.length; i++) {
    if(urlHostNameArray[i] == "www" && count == 0){
      continue
    } else if(count == 0){
      count = 1
    } else {
      newHostname += urlHostNameArray[i] + "_"
    }
  }

  imgName.value = newHostname.slice(0, -1)
  imgName2.value = newHostname + "small_logo"
}

// Add the course section to the navlinks
watchEffect(() => {
  if (navlinks.value) {
    navlinks.value.push({
      name: 'course',
      title: 'Courses',
      icon: BookOpenIcon,
    })
  }
})
</script>

<style scoped lang="scss">
.menu ul {
  transition: all 0.3s ease;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Ensure smooth transitions */
.transform {
  will-change: transform;
}
</style>