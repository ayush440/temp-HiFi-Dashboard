<template>
    <div class="intro-x  border shadow dark:text-white box col-span-12 lg:col-span-6">
      <div class="flex items-center px-5 py-5 sm:py-3 border-b shadow dark:border-darkmode-400">
        <h2 class="font-medium text-base mr-auto">Social</h2>
  
        <button class="btn  btn-primary  " @click="toggleEdit">
          {{ isEditing ? "Editing" : "Edit" }}
        </button>
      </div>
      <div class="p-5">
        <!-- BEGIN:  Form -->
        <form class="validate-form" @submit.prevent="submitSocialForm()">
          <div class="ml-4">
            <label for="trading_view_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tradingview
              ID</label>
              
            <input type="text" id="trading_view_id"
              class="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :class="isEditing ? 'border-blue-500' : 'border-gray-300'" :placeholder="social.trading_view_id"
              v-model="social.trading_view_id" :disabled="!isEditing" />
          </div>
          <div class="ml-4 mt-4">
            <label for="api" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telegram Api</label>
            <input type="text" id="api"
              class="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :class="isEditing ? 'border-blue-500' : 'border-gray-300'" :placeholder="social.api" 
              v-model="socialData.api" :disabled="!isEditing" />
          </div>
  
          <div class="ml-4 mt-4">
            <label for="chat_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telegram Chat ID </label>
            <input type="text" id="chat_id"
              class="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :class="isEditing ? 'border-blue-500' : 'border-gray-300'" :placeholder="social.chat_id" 
              v-model="socialData.chat_id" :disabled="!isEditing" />
          </div>
  
  
          <div class="ml-4 mt-4">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="status">
                  Status
            </label>
            <div class="mt-2">
                <ButtonSwitch id="is_active" :disabled="!isEditing" name="is_active" v-model.trim="socialData.status" @update:modelValue.trim="(value: any) => {
                    socialData.status = value
                }
                " />
                <!-- <input v-model.trim="socialData.status" id="status" name="status" type="checkbox" :disabled="!isEditing" class="form-check-input w-50" /> -->
              </div>
          </div>
  
          <div class="flex justify-end" v-if="isEditing">
            <button type="submit" class="btn-submit ml-4 mt-4 w-97">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed,watch } from "vue";
  import { makeRequest } from "@/request/request";
  import { useSocialStore } from "@/stores/matrix/social";
  const socialStore = useSocialStore();

  interface Social {
    id?: number
    api?: string
    chat_id?: string
    status?: boolean
    trading_view_id?: string
    trading_view_message?: string
    

      
  }
  
  
  const social = computed<Social>(() => {
    if(socialStore.social === undefined){
      return {}
    }
    return socialStore.social;
  });
  
  const tid = computed(() => {
    return social.value.trading_view_id
  })
  
  
  
  let isEditing = ref(false);
  const toggleEdit = () => {
    isEditing.value = !isEditing.value;
  };
  
  const socialData  = ref<Social>({
    api: social.value.api !== undefined ? social.value.api : "",
    chat_id: social.value.chat_id !== undefined ? social.value.chat_id : "",
    status:social.value.status !== undefined ? social.value.status : false,
    trading_view_id:social.value.trading_view_id !== undefined ? social.value.trading_view_id : "",
    trading_view_message:social.value.trading_view_message !== undefined ? social.value.trading_view_message : "",
  });
  
  
  
    
  
  const submitSocialForm = async () => {
  
      try {
        //for update trading_view_id only
        await makeRequest("updateUser", "PUT", {"trading_view_id": socialData.value.trading_view_id}, {}, {}, 0, null);
  
        //for update social data
        if ("status" in socialData.value){
          
        }else{
          socialData.value.status=false
        }
        let rt
        if (Object.keys(socialStore.social).length>2){
  
          rt="PUT"
        }else{
          rt="POST"
        }
        if(!socialData.value.status){
          socialData.value.status=false
        }
        if(tid.value!=socialData.value){
          socialData.value.trading_view_message="updated"
        }else{
          socialData.value.trading_view_message=""
        }
        await makeRequest(socialStore.endpoint, rt, socialData.value, {}, {}, 0, social.value.id);
  
        isEditing.value = false;
   
          
      } catch (error) {
          console.error(error);
      }
  }
  
  </script>
  
  
<style lang="scss" scoped>
.intro-x {
  @apply border rounded bg-third dark:bg-primary dark:border-none;
}
</style>