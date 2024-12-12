<template>
  <div class=" md:ml-0 "> 

    <div class="intro-y border rounded flex items-center mt-2 dark:text-tableText  ml-6 mr-6  ">
      <h2 class="flex flex-wrap text-lg mr-auto p-2 ">
        <span class="font-medium  capitalize">Welcome {{ profile.name }}, &nbsp;</span>
        <div class="font-semibold"> {{ profile.mesage}} </div>
      </h2>
      
    </div>
    <div>
      <!-- BEGIN: Profile Info -->
      <div class="intro-y border shadow rounded box px-5 pt-5 mt-5  ml-6 mr-6  ">
        <div
          class="flex flex-col lg:flex-row border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5"
        >
          <div
            class="flex flex-1 px-5 items-center justify-center lg:justify-start"
          >
            <div
              class="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative"
            >
              <img
                alt="profile picture"
                class="rounded-full"
                :src="profile.profile_picture_url ? profile.profile_picture_url : images['profileLarge']"
              />
            </div>
            <div class="ml-5">
              <div
                class="max-w-24 sm:max-w-40 truncate sm:whitespace-normal font-medium text-lg"
              >
                {{ profile.name }}
              </div>
              <div class="text-slate-500 dark:text-slate-200">{{ profile.user_role }}</div>
            </div>
          </div>
          <div
            class="mt-6 lg:mt-0 flex-1 px-5 border-l-0 lg:border-l dark:border-darkmode-400 dark:text-white pt-5 lg:pt-0"
          >
            <div class="flex justify-center lg:justify-start">
              
              <div
                class="ml-[-20px] lg:ml-0 flex flex-col justify-center"
              >
                <div class="font-medium flex justify-center lg:justify-start lg:mt-3 mb-4 " >
                  Contact Details
                </div>
                <div class="truncate sm:whitespace-normal flex items-center">
                  <MailIcon class="w-4 h-4 mr-2" />
                  {{ profile.email }}
                </div>
                <div class="truncate sm:whitespace-normal flex items-center mt-3">
                  <SmartphoneIcon class="w-4 h-4 mr-2"
                  />
                  {{ profile.mobile_prefix }} {{ profile.mobile }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-2 mb-2 flex justify-center">
      <div class="md:hidden w-full sm:w-60">
        <select
          v-model="selectedwindow"
          class="bg-gray-50 border shadow text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:shadow block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="Profile">Profile</option>
          <option value="Social">Social</option>
          <option v-if="isConfig" value="Billing">Billing</option>
          <option value="ChangePassword">ChangePassword</option>
        </select>
      </div>
    </div>
  
        <div
          class="hidden md:flex nav-link-tabs dark:text-white  justify-start text-center"
        >
          <div v-for="selectedTab in selectItmesList" :key="selectedTab.name" :fullWidth="false" :class="['py-4', 'flex', 'items-center', 'cursor-pointer', selectedwindow === selectedTab.name ? 'border-b border-primary dark:border-white' : '', selectedwindow !== selectedTab.name ? 'deactived' : '']" @click="setselectedwindow(selectedTab.name)">
            <component :is="selectedTab.icon" class="w-4 h-4 mr-1" />
            <span class="mr-4"> {{ selectedTab.name }} </span>
          </div>
        </div>
        
      </div>
      <!-- END: Profile Info -->
      <div class="mt-5">
          <div class="grid grid-cols-12 gap-4">
            
            <editprofilevue :profile="profile" v-if="selectedwindow=='Profile'" />
            <socialvue   v-if="selectedwindow=='Social'" />
            <changepasswordvue :profile="profile" v-if="selectedwindow=='ChangePassword'" />
            <billing :profile="profile" v-if="selectedwindow=='Billing'" />
           
            <quote :quote ="{item: profile.quote_of_the_day}" />
          </div>
      </div>
    </div>

  </div>
  
                  
  </template>
  
  <script setup lang="ts">
  import { images } from "@/assets/img";
  import { storeToRefs } from "pinia";
  import { ref, computed, watch,onMounted } from "vue";
  import editprofilevue from "./editProfile.vue";
  import socialvue from "./social.vue";
  import changepasswordvue from "./changePassword.vue";
  import billing from "./billing.vue";
  import quote from "./quote.vue";
  import { useProfileStore } from "@/stores/matrix/profile";
  import { useInvoiceConfigrationStore } from '@/stores/matrix/invoiceConfigration';
  const profileStore = useProfileStore();
  const invoiceConfigrationStore = useInvoiceConfigrationStore();

  const { invoiceConfigrations } = storeToRefs(invoiceConfigrationStore);
  const profile = computed(() => {
    return profileStore.profile;
  });
  
  
  import { useRoute } from 'vue-router';
import Billing from "./billing.vue";
  
  const route = useRoute();
  const item = ref(route.params.item);
  
  let selectItmesList = ref([
    {
      name: "Profile",
      icon: "UserIcon",
    },
    {
      name: "Social",
      icon: "UsersIcon",
    },
    {
      name: "Billing",
      icon: "ShieldIcon",
    },
    {
      name: "ChangePassword",
      icon: "LockIcon",
    },
  ]);
  
  
  const selectedwindow = ref("Profile");
  const setselectedwindow = (window: string) => {
    selectedwindow.value = window;
  };
  
  onMounted(() => {
    if(item.value === 'Social') {
      selectedwindow.value = "Social"
    }
  });

  const isConfig = ref(false);
  watch(invoiceConfigrations, (newInvoiceConfigrations, oldInvoiceConfigrations) => {
    if(Object.keys(newInvoiceConfigrations).length) {
      isConfig.value = true
      if(!selectItmesList.value.find((item: any) => item.name === "Billing")){
        selectItmesList.value.push({ name:"Billing", icon:"ShieldIcon" });
      }
    } else{
      isConfig.value = false
      selectItmesList.value = selectItmesList.value.filter((item: any) => item.name !== "Billing");
    }
  });
  
  let isEditing = ref(false);
  const toggleEdit = () => {
    isEditing.value = !isEditing.value; // Toggle the editing state
  };
  </script>
  
  <style lang="scss" scoped>
  .deactived{    --tw-border-opacity: 1;
      border-bottom-color:rgb(var(--color-primary) / 0) !important;
      font-weight: 400 !important;
    }
      
  .actived{    --tw-border-opacity: 1;
      border-bottom-color: rgb(var(--color-primary) / var(--tw-border-opacity)) !important;
      font-weight: 500;
      --tw-text-opacity: 1;
  }
  .intro-y {
    @apply bg-third dark:bg-primary dark:border-none;

  }
  
  </style>
  