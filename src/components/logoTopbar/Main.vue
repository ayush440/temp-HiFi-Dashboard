<template>
    <!-- logo-topbar -->
    <div class="logo-topbar flex justify-between items-center relative p-2 pb-1">

        <RouterLink to="/" class="w-[200px] h-18 top-logo flex items-center justify-center xl:justify-start  rounded-lg overflow-hidden">
            <img src="@/assets/img/hifilogo.png" @load="handleImageLoad" @error="handleImageError" class="w-[150px] h-18"/>
            <img v-if="imgName" :src="'' + imgName + '.png'" @load="handleImageLoad" @error="handleImageError" class="w-[228px] h-16" :class="{ 'hidden': !imgLoad }" />
            <div v-if="!imgLoad" class="flex h-16 w-full font-bold justify-center  border border-red-600 items-center mt-[-5px] text-3xl text-gray-600 dark:text-tableText">
                {{ domainName }}
            </div>
        </RouterLink>


        <div class="flex items-center">
            <!-- <DarkModeSwicher /> -->
            <div class="cursor-pointer ml-2 hover:bg-third-bold rounded-lg transition duration-200 dark:text-tableText" :class="{ 'rotate-0': !toggle, 'rotate-[180deg]': toggle }">
                <MenuIcon v-if="!toggle" class="m-2 w-7 h-7 transition transition-delay-300 hover:scale-110"  @click="toggle = !toggle, mobileToggle = !mobileToggle"/>
                <CloseIcon v-else @click="toggle = !toggle, mobileToggle = !mobileToggle" class="m-2 w-7 h-7  transition transition-delay-300 hover:scale-110" :class="{ 'rotate-0': toggle, 'rotate-[180deg]': !toggle }"/>
            </div>
        </div>
        
    </div>

    <teleport to="body">
        <div class="visible lg:hidden h-full text-black dark:text-tableText bg-secondary">
            <transition name="slide-fade">
                <div v-if="toggle" @click.self="closeLogoTopbar" class="fixed h-full w-full menuBar overflow-y-scroll top-0 left-0"  :style="{ zIndex: zIndexValue+2 }">
                    <div ref="logoTopbar"  class="bg-secondary overflow-y-auto overflow-x-hidden h-full menuBar-shadow w-[250px] transform" :class="{ 'translate-x-0': toggle, '-translate-x-full': !toggle }">

                        <!-- profile and notification menu -->


                        <!-- <div class="flex justify-between mr-2">  -->
                        <div class="pb-4  ml-1 flex flex-col shadow"> 

                            <PopupDropdown :isOpen="showProfileModal" @close="closeProfileModal" dropdownClass ="dropdown-1 bg-secondary top-[100%] left-[8px] w-[220px] cursor-pointer shadow-lg border border-secondary m-1">
                                <template #dropdown-toggle> 
                                    <div class="unselectable flex flex-col p-1 pt-8 pl-2">
                                        <div class="flex items-center cursor-pointer" @click="toggleProfileModal">
                                            <img class="w-12 h-12 rounded-full" :src="profile.profile_picture_url ? profile.profile_picture_url : images['profile']" alt=""/>
                                            <div class="ml-2">
                                                <div class="font-bold">{{ profile?.name }}</div>
                                                <div class="text-gray-500 dark:text-tableText">
                                                    {{ profile?.user_role }} 
                                                    <RightArrowIcon class="w-[14px] h-[14px] inline ml-1 transform rotate-90 transition transition-delay-300" :class="{ 'rotate-[-90deg]': showProfileModal, 'rotate-90': !showProfileModal }" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template #dropdown-body> 
                                    <div class="font-bold text-xl">Profile</div>
                                    <div class="font-medium capitalize pb-2">
                                        {{  profile?.name }} <br>
                                        <span class="text-sm lowercase"> {{ profile?.email }} </span>
                                        </div>
                                        <div @click="clickProfile" class="profile-option"><userIcon class="icon-size ml-0" />My Profile</div>
                                        <div @click="clickRefresh" class="profile-option"><ReloadIcon class="icon-size p-[1px] ml-0" />Refresh</div>
                                        <div class="profile-option"><HelpIcon class="icon-size ml-0" />Help</div>
                                        <!-- <div>{{ profile?.email }}</div>
                                        <div>{{ profile?.mobile }}</div> -->

                                        <div class="profile-option"  @click="logout"><LockIcon class="icon-size ml-0" />Logout</div>
                                </template>
                            </PopupDropdown>


                            <PopupDropdown :isOpen="showNotificationModal" @close="closeNotificationModal" dropdownClass ="dropdown-1 bg-secondary top-[100%] left-[5%] w-[230px] shadow-lg border border-secondary">
                                <template #dropdown-toggle>
                                    <div @click="toggleNotificationModal" class="unselectable flex flex-col cursor-pointer p-2 pt-4 pl-2">
                                        <div class = "flex items-center cursor-pointer font-semibold text-lg">
                                            <ActiveAlertIcon class="w-6 h-6 mr-2" />
                                            <div class="mt-[-4px]"> Notifications </div>
                                            <RightArrowIcon class="w-[14px] h-[14px] inline ml-1 transform rotate-90 transition transition-delay-300" :class="{ 'rotate-[-90deg]': showNotificationModal, 'rotate-90': !showNotificationModal }" />
                                        </div>
                                    </div>
                                </template>

                                <template #dropdown-body>
                                    <div class="max-h-[320px] text-sm overflow-y-scroll text-gray-600 dark:text-white  text-center p-2">
                                        <div v-if="notifications.length > 0" class="cursor-pointer relative " v-for="notification in notifications" >
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
                                            <div class="text-left text-wrap text-xs sm:text-sm truncate text-slate-400 mt-0.5">
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


                        </div>

                        <ul class="flex flex-col p-1 mt-4 pl-2" v-if="navlinks.length > 0 && allRoutes.length > 0">

                            <routeName v-for="(navData, index) in navlinks" :key="index" :item="navData" :route="findRoutes(navData.name)"/>

                        </ul>



                    </div>
                </div>
            </transition>
        </div>
    </teleport>
</template>


<script setup lang="ts">
    import { storeToRefs } from 'pinia'
    import { logout } from '@/request/request'
    import router from '@/router/index'
    import { ref, computed, watchEffect, onBeforeMount } from 'vue'
    import { images } from '@/assets/img'
    import DarkModeSwicher from '@/components/darkModeSwicher.vue'
    import { useNavlinksStore } from '@/stores/navlinks'
    import routeName from './routeName.vue'
    import { useProfileStore  } from '@/stores/matrix/profile'
    import { useNotificationsStore } from '@/stores/matrix/notification';
    import { useStrategiesStore } from '@/stores/matrix/strategy'
    import { useLogoStore } from '@/stores/utils/logo'

    const notificationStore = useNotificationsStore()
    const strategiesStore = useStrategiesStore()

    let { notificationsData } = storeToRefs(notificationStore)

    const { strategies } = storeToRefs(strategiesStore)

    const navlinkStore = useNavlinksStore()
    const { navlinks, mobileToggle } = storeToRefs(navlinkStore)
    const profileStore = useProfileStore()
    const { profile } = storeToRefs(profileStore)  

    const logoStore = useLogoStore()
    const { logoData } = storeToRefs(logoStore)


    const toggle = ref(false)
    const showProfileModal = ref(false);
    const showNotificationModal = ref(false);

    const allRoutes = computed(() => router.getRoutes())


    const findRoutes = (name: string) => {
        return allRoutes.value.find((route) => route.name === name)
    }


    onBeforeMount(() => {
        const url = window.location.href
        getDomain(url)
    })

    const imgName = ref('')
    const imgLoad = ref(false)


    const domainName = computed(() => {
        return logoData.value
    })


    function  handleImageLoad() {
        imgLoad.value = true
    }
    function handleImageError(error: any) {
        imgLoad.value = false
    }

    const getDomain = (url: string) => {
        const parsedUrl = new URL(url);
    // const parsedUrl = new URL('https://www.admin.xyz.in.netlify.app/');
        let count = 0, newHostname = '';
        let urlHostNameArray = parsedUrl.hostname.split(".");

        for (let i = 0; i < urlHostNameArray.length; i++) {
            if(urlHostNameArray[i] == "www" && count == 0){
                continue;
            } else if(count == 0){
                count = 1;
            } else {
                newHostname += urlHostNameArray[i] + "_"
            }
        }

        imgName.value = newHostname.slice(0, -1);
    }

    watchEffect(() => {
        if(!mobileToggle.value) {
            toggle.value = false
        }
    })

    let notifications = computed<any>(() => {
        if (
            notificationsData.value &&
            strategies.value &&
            strategies.value.length > 0 &&
            notificationsData.value.length > 0
        ) {
            // Map strategy IDs to their corresponding strategies for efficient lookup
            const strategyMap = new Map(strategies.value.map((strategy: { id: any; }) => [strategy.id, strategy]));

            // Associate each notification with its corresponding strategy
            const notificationsWithStrategies = notificationsData.value.map((notification: { strategy_id: unknown; }) => {
            const strategy = strategyMap.get(notification.strategy_id);
            return {
                ...notification,
                strategy: strategy || null, 
            };
            });
            return notificationsWithStrategies;
        }

        return []; 
    });



    const clickProfile = () => {
        router.push({ name: 'profile' })
        showProfileModal.value = true
        closeLogoTopbar()
    }

    const clickRefresh = () => {
        window.location.reload()
    }
    
    const closeProfileModal = () => {
        showProfileModal.value = false  
    }

    const toggleProfileModal = () => {
        showProfileModal.value = !showProfileModal.value
    }

    const closeNotificationModal = () => {
        showNotificationModal.value = false
    }

    const toggleNotificationModal = () => {
        showNotificationModal.value = !showNotificationModal.value
    }



    function getHighestZIndex() {
        const elements = [...document.querySelectorAll('body *')] as HTMLElement[]
        const zIndexes = elements.map(el => parseFloat(window.getComputedStyle(el).zIndex))
        .filter(zIndex => !isNaN(zIndex))
        return Math.max(0, ...zIndexes)
    }

    // Compute the zIndex value dynamically
    const zIndexValue = computed(() => getHighestZIndex() + 1)


    const closeLogoTopbar = () => {
        toggle.value = false
        mobileToggle.value = false
    }

</script>


<style lang="scss" scoped>
@media (max-width: 1020px) {
    .menuBar {
        display: block;
    }
}

.menuBar-shadow{
    box-shadow: 0 1px 30px 1px rgba(0, 0, 0, 0.4);
}

.profile-option {
  @apply hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-40 cursor-pointer flex bg-secondary dark:bg-primary dark:bg-opacity-50 dark:shadow-slate-600 rounded p-1 my-1 shadow-sm ;
}

.icon-size{
  @apply  m-1 h-4 w-4;
}


.menuBar {
  transition: transform 0.7s ease-in-out;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: transform 0.7s ease-in-out;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateX(-100%);
}
</style>