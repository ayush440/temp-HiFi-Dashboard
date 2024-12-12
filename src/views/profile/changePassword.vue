<template>
    <div class="intro-x dark:text-white border shadow box col-span-12 lg:col-span-6">
      <div class="flex items-center px-5 py-5 sm:py-3 border-b shadow dark:border-darkmode-400">
        <h2 class="font-medium text-base mr-auto">Change Password</h2>
  
  
      </div>
      <div class="p-5">
        <form class="validate-form" @submit.prevent="submitChangePassword">
          <div class="ml-4">
            <label for="current_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current
              Password</label>
            <div class="relative">
              <input autocomplete="off" id="current_password" name="current_password"
                v-model.trim="validate.current_password.$model"
                :type="passwordFields.showCurrentPassword ? 'text' : 'password'"
                :class="{ 'is-invalid': validate.current_password.$error }"
                class="bg-gray-50 border order-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Current Password" />
  
              <span @click="togglePasswordVisibility('showCurrentPassword')"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 z-50">
                <EyeOffIcon v-if="passwordFields.showCurrentPassword" class="block mx-auto w-5 cursor-pointer" />
                <EyeIcon v-else class="block mx-auto w-5 cursor-pointer" />
              </span>
            </div>
            <template v-if="validate.current_password.$error">
              <div v-for="(error, index) in validate.current_password.$errors" :key="index" class="text-danger mt-2">
                {{ error.$message }}
              </div>
            </template>
          </div>
          <div class="ml-4 mt-2">
            <label for="new_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New
              Password</label>
            <div class="relative">
              <input autocomplete="off" id="new_password" name="new_password"
                v-model.trim="validate.new_password.$model"
                :type="passwordFields.showNewPassword ? 'text' : 'password'"
                :class="{ 'is-invalid': validate.new_password.$error }"
                class="bg-gray-50 border order-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter New Password" />
  
              <span @click="togglePasswordVisibility('showNewPassword')"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 z-50">
                <EyeOffIcon v-if="passwordFields.showNewPassword" class="block mx-auto w-5 cursor-pointer" />
                <EyeIcon v-else class="block mx-auto w-5 cursor-pointer" />
              </span>
            </div>
  
            <template v-if="validate.new_password.$error">
              <div v-for="(error, index) in validate.new_password.$errors" :key="index" class="text-danger mt-2">
                {{ error.$message }}
              </div>
            </template>
          </div>
          <div class="ml-4 mt-2">
            <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
              Password</label>
            <div class="relative">
              <input autocomplete="off" id="confirm_password" name="confirm_password"
                v-model.trim="validate.confirm_password.$model"
                :type="passwordFields.showConfirmPassword ? 'text' : 'password'"
                :class="{ 'is-invalid': validate.confirm_password.$error }"
                class="bg-gray-50 border order-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Confirm  Password" />
  
              <span @click="togglePasswordVisibility('showConfirmPassword')"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 z-50">
                <EyeOffIcon v-if="passwordFields.showConfirmPassword" class="block mx-auto w-5 cursor-pointer" />
                <EyeIcon v-else class="block mx-auto w-5 cursor-pointer" />
              </span>
            </div>
  
            <template v-if="validate.confirm_password.$error">
                      <div class="text-danger mt-2">
                        Password and Confirm Password should match
                      </div>
                    </template>
          </div>
          <div class="flex justify-end mt-2">
            <button type="submit" class="btn-submit  ml-4 mt-4 w-97">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </template>
      
  <script setup lang="ts">
  import { ref, computed, reactive, toRefs } from "vue";
  import {
    required,
    minLength,
  } from "@vuelidate/validators";
  import { useVuelidate } from "@vuelidate/core";
  
  import { makeRequest, showToast } from "@/request/request";
  
  
  const data = defineProps({
    profile: Object
  })
  const profile = computed(() => data.profile)
  
  let isEditing = ref(false);
  const toggleEdit = () => {
    isEditing.value = !isEditing.value;
  };
  
  
  
  let passwordFields = reactive<any>({
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false
  });
  
  function togglePasswordVisibility(field: string) {
    passwordFields[field] = !passwordFields[field];
  }
  
  let changePassData = reactive({
    "current_password": '',
    "new_password": '',
    "confirm_password": '',
  });
  
  const changePassRules = {
    current_password: {
      required,
    },
    new_password: {
      required,
      minLength: minLength(6)
    },
    confirm_password: {
      required,
      sameAsPassword: (value: string) => {
        return value === changePassData.new_password;
      },
    },
  };
  
  let validate = useVuelidate(changePassRules, toRefs(changePassData));
  
  
  function resetValidation() {
    validate = useVuelidate(changePassRules, toRefs(changePassData));
  }
  
  const submitChangePassword = async () => {
    try {
      validate.value.$touch();
      if (validate.value.$invalid) {
        showToast("Please check the filled form!");
      } else {
        await makeRequest("changePassword", "PUT", changePassData, {}, {}, 0);
  
        resetValidation();
        changePassData.current_password = '';
        changePassData.new_password = '';
        changePassData.confirm_password = '';
      }
  
  
  
    } catch (error) {
      console.log(error)
    }
  };
  
  
  
</script>
  
<style lang="scss" scoped>

.intro-x {
  @apply border rounded bg-third dark:bg-primary dark:border-none;
}

</style>