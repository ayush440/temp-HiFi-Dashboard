<template>
  <div class="h-screen bg-white text-color">
    <div class="login-page relative h-full w-full flex flex-col lg:flex-row gap-4">

      <!-- Left Section: Background Image and Content (on large screens) -->
      <div class="hidden lg:flex w-full lg:w-1/2 justify-center relative">
        <!-- Background Image -->
        <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('/public/loginbg.jpeg');"></div>        <!-- Glass Effect Overlay -->
        <div class="absolute inset-0 backdrop-blur-sm bg-black bg-opacity-50"></div>
        <img src="@/assets/img/hifilogo.png" class="w-16 absolute top-4 left-4 xl:w-[180px] 2xl:w-[250px] h-16 z-50" />

        <!-- Content Section -->
        <div class="relative z-10 flex flex-col items-center justify-center text-center text-white p-8 space-y-6">
          <h2 class="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p class="text-lg max-w-lg">
            Sign in to access your personalized dashboard. Explore the latest updates, track your progress, and manage your preferences all in one place.
          </p>
          <p class="text-base max-w-md">
            Whether you are here to check your stats, set new goals, or stay up-to-date with the latest features, we have everything you need to enhance your experience.
          </p>
          <ul class="space-y-2 text-sm max-w-md mx-auto">
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 11.03L3.5 8.28l.93-.93L6.25 9.16l4.32-4.32.93.93-5.25 5.25z"/>
              </svg>
              Secure Login with Advanced Protection
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 11.03L3.5 8.28l.93-.93L6.25 9.16l4.32-4.32.93.93-5.25 5.25z"/>
              </svg>
              24/7 Customer Support
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 11.03L3.5 8.28l.93-.93L6.25 9.16l4.32-4.32.93.93-5.25 5.25z"/>
              </svg>
              User-Friendly Experience Across Devices
            </li>
          </ul>
          <button class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium">Learn More</button>
        </div>
      </div>

      <!-- Right Section: Login Form -->
      <div class="w-full lg:w-1/2 flex justify-center items-center p-4">
        <div class="flex justify-center w-full border rounded-md bg-third h-fit items-center p-4">
          <div class="rounded-lg w-full mx-2 sm:mx-0">
            <div class="min-h-[350px]  rounded-lg dark:shadow-slate-800"
            :class="{'': forgotPassword}">
              <!-- Mobile Logo -->
              <div class="lg:hidden flex justify-center my-5">
                <a class="flex justify-center items-center logo w-[249px] h-16 rounded-md bg-secondary-light cursor-pointer" href="#">
                  <logoComp />
                </a>
              </div>

              <div v-if="!forgotPassword" class="w-full">
                <h1 class="text-2xl mt-2 font-bold text-center">Log Back In</h1>
                <p class="text-center">Access everything in one place</p>
                <!-- error message will be shown -->
                <div class="text-danger text-center mt-1" v-if="error">⚠️ {{ error }}</div>

                <form class="login-form w-full" @submit.prevent="login">
                  <div class="input-box flex flex-col m-4 mt-4">
                    <label class="text-[16px] font-thin">Email</label>
                    <input type="email" name="email"
                      v-model.trim="validateSignin.email.$model"
                      class="rounded border-2 pl-1 h-10"
                      :class="{ 'bg-red-100': validateSignin.email.$error, 'bg-secondary': !validateSignin.email.$error }"
                    />
                    <template v-if="validateSignin.email.$errors">
                      <div v-for="error of validateSignin.email.$errors" :key="error.$uid" class="text-danger mt-2">
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <div class="input-box flex flex-col m-4">
                    <label>Password</label>
                    <div class="relative">
                      <input name="password"
                        v-model.trim="validateSignin.password.$model"
                        class="rounded border-2 pl-1 h-10"
                        :class="{ 'bg-red-100': validateSignin.password.$error, 'bg-secondary': !validateSignin.email.$error }"
                        :type="passwordFields.password ? 'text' : 'password'"
                      />
                      <span @click="togglePasswordVisibility('password')"
                        class="absolute right-4 top-1/2 transform -translate-y-1/2 z-50">
                        <EyeOffIcon v-if="passwordFields.password" class="block mx-auto w-5 cursor-pointer" />
                        <EyeIcon v-else class="block mx-auto w-5 cursor-pointer" />
                      </span>
                    </div>
                    <template v-if="validateSignin.password.$errors">
                      <div v-for="error of validateSignin.password.$errors" :key="error.$uid" class="text-danger mt-2">
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>

                  <div class="flex justify-between ml-4">
                    <div class="flex flex-wrap text-[12px] content-center text-justify">
                      <CheckBox v-model="checkbox" class="mr-2 w-4 h-4 mt-1 whitespace-nowrap" name="T&C" id="T&C" />
                      I agree to the&nbsp;
                      <a target="_blank" :href="tncUrl" class="text-opacity-95 underline border-secondary">T&C</a> &nbsp;and&nbsp;
                      <a target="_blank" :href="privacyPolicyUrl" class=" text-opacity-95 login-action underline ">Privacy Policy</a>
                    </div>
                  </div>

                  <div class="w-full flex justify-end">
                    <a href="javascript:;" @click="handleForgotPassword" class="text-opacity-95 mr-4 login-action">Forgot Password!</a>
                  </div>

                  <div class="m-4 submit-btn flex flex-col items-center justify-center">
                    <button type="submit" :disabled="!checkbox"
                      :class="!checkbox ? 'opacity-75 bg-black cursor-not-allowed' : 'hover:opacity-100 lg:hover:opacity-90'"
                      class="w-full h-10 border bg-black text-white font-semibold rounded-md m-2">
                      Login
                    </button>
                    <button type="button" @click="handleToggle"
                      class="w-full h-10 border bg-gray-200 font-semibold rounded-md m-2 hover:opacity-100 lg:hover:opacity-90">
                      Register
                    </button>
                  </div>
                </form>
              </div>

              <!-- Forgot Password Sections (OTP Verification) -->
              <div v-if="forgotPassword && !forOtpVerify" class="w-full">
                <h1 class="text-3xl mt-4 font-bold text-center">Forgot Password</h1>
                <div class="text-center">Enter your email to receive an OTP</div>
                <form @submit.prevent="requestOtp">
                  <div class="input-box flex flex-col m-4 mt-4">
                    <label class="text-[16px] font-thin">Email</label>
                    <input type="email" name="email"
                      v-model.trim="forgotPasswordEmail"
                      class="rounded border-2 pl-1 h-10" />
                  </div>

                  <div class="w-full flex justify-end">
                    <a href="javascript:;" @click="handleBackToLogin" class="text-opacity-95 mr-4 login-action">Back to Login</a>
                  </div>

                  <div class="m-4 submit-btn flex flex-col items-center justify-center">
                    <button type="submit" class="w-full h-10 border bg-black text-white font-semibold rounded-md m-2">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { makeRequest } from '@/request/request'
import { setToken } from '@/utils/auth'
import logoComp from './logoComp.vue'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import CheckBox from '@/components/checkBox.vue'

const router = useRouter()

const error = ref("")
const checkbox = ref(false)
const forgotPassword = ref(false)
const forOtpVerify = ref(false)
const forgotPasswordEmail = ref("")

const tncUrl = ref('')
const privacyPolicyUrl = ref('')

const signinData = reactive({
  email: '',
  password: '',
})

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
}

const validateSignin = useVuelidate(rules, signinData)

const passwordFields = reactive({
  password: false,
})

const handleToggle = () => {
  router.push({ name: 'register' })
}

const handleForgotPassword = () => {
  forgotPassword.value = true
  error.value = ""
}

const handleBackToLogin = () => {
  forgotPassword.value = false
  error.value = ""
}

const togglePasswordVisibility = (field: string) => {
  passwordFields[field] = !passwordFields[field]
}

const login = async () => {
  const isFormCorrect = await validateSignin.value.$validate()
  if (!isFormCorrect) return

  try {
    const response = await makeRequest('login', 'POST', signinData)
    if (response && response.data && response.data.access_token) {
      setToken(response.data.access_token)
      localStorage.setItem("refresh", 'true')
      localStorage.setItem("list_auth", response.data.list_auth)
      router.push({ name: 'dashboard' })
    } else {
      error.value = "Invalid response from server"
    }
  } catch (err: any) {
    error.value = err.message || "An error occurred during login"
  }
}

const requestOtp = async () => {
  try {
    const response = await makeRequest('sendForgotOTP', 'POST', { email: forgotPasswordEmail.value })
    if (response) {
      error.value = ""
      forOtpVerify.value = true
    } else {
      error.value = "Failed to send OTP"
    }
  } catch (err: any) {
    error.value = err.message || "An error occurred while sending OTP"
  }
}

const parsedUrl = ref<URL | null>(null)
const extractedDomainName = ref('')

function extractDomain() {
  if (!parsedUrl.value) return

  const hostname = parsedUrl.value.hostname
  const domain = hostname.replace(/^www\./i, '')

  extractedDomainName.value = domain.split('.').slice(0, 2).join('_')

  tncUrl.value = `/images/tnc/${extractedDomainName.value}_tnc.html`
  privacyPolicyUrl.value = `/images/privacy_policy/${extractedDomainName.value}_privacy_policy.html`

  checkUrl(tncUrl.value, "tnc")
  checkUrl(privacyPolicyUrl.value, "privacy_policy")
}

async function checkUrl(url: string, name: string) {
  try {
    const response = await fetch(url, { method: 'HEAD' })

    const contentType = response.headers.get("Content-Type")
    const contentLength = response.headers.get("Content-Length")
    
    if (contentType !== 'text/html' || !contentLength || parseInt(contentLength, 10) < 100) {
      if (name === "tnc") {
        tncUrl.value = '../../tnc.html'
      } else if (name === "privacy_policy") {
        privacyPolicyUrl.value = '../../privacy_policy.html'
      }
    }
  } catch (error) {
    if (name === "tnc") {
      tncUrl.value = '../../tnc.html'
    } else if (name === "privacy_policy") {
      privacyPolicyUrl.value = '../../privacy_policy.html'
    }
  }
}

onBeforeMount(() => {
  const url = window.location.href
  parsedUrl.value = new URL(url)
  extractDomain()
})
</script>

<style scoped>
.submit-btn button {
  backdrop-filter: none !important;
  background-image: none !important;
}

.input-box label {
  @apply text-black font-normal;
}

.input-box input {
  @apply w-full px-2 py-1 bg-white box-border border border-gray-50 rounded focus:outline-1 focus:outline-gray-200;
}

.dark .input-box label {
  @apply text-tableText;
}

.animated-background {
  width: 50vw;
  height: calc(100vh - 50px);
  background: url('@/assets/img/loginBg.svg') no-repeat center center;
  background-size: cover; 
  animation: backgroundAnimation 10s infinite alternate;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

@keyframes backgroundAnimation {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

.text-color {
  @apply text-black dark:text-white;
}

@media screen and (max-width: 1020px) {
  .login-page {
    background: url('@/assets/img/loginBg.svg') no-repeat center center;
    background-size: cover;
  }
}
</style>

