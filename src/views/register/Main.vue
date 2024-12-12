<template>
  <div class="h-screen bg-white text-color">
    <div class=" relative h-full grid grid-cols-1 lg:grid-cols-2 gap-4">

      <!-- Left Section: Background and Content -->
      <div class="hidden lg:flex flex-col justify-center relative">
        <!-- Background Image -->
        <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('/public/loginbg.jpeg');"></div>
        <!-- Glass Effect Overlay -->
        <div class="absolute inset-0 backdrop-blur-sm bg-black bg-opacity-50"></div>

        <!-- Logo -->
        <div class="absolute top-4 left-4 z-50">
          <a href="#" class="flex items-center logo w-[249px] h-16 rounded-md  justify-center">
            <logoComp />
          </a>
        </div>

        <!-- Content -->
        <div class="relative z-10 flex flex-col items-center text-center text-white px-8 py-12 space-y-6">
          <h2 class="text-4xl font-bold">Welcome to Our Platform!</h2>
          <p class="text-lg max-w-lg">
            Create an account to personalize your dashboard and explore the latest features.
          </p>
          <ul class="space-y-2 text-sm max-w-md mx-auto">
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 11.03L3.5 8.28l.93-.93L6.25 9.16l4.32-4.32.93.93-5.25 5.25z"/>
              </svg>
              Easy Account Creation
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 11.03L3.5 8.28l.93-.93L6.25 9.16l4.32-4.32.93.93-5.25 5.25z"/>
              </svg>
              Secure Registration
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 11.03L3.5 8.28l.93-.93L6.25 9.16l4.32-4.32.93.93-5.25 5.25z"/>
              </svg>
              Enhanced User Experience
            </li>
          </ul>
        </div>
      </div>

      <!-- Right Section: Sign-Up Form -->
      <div class="flex justify-center  w-full  items-center">
        <div class="rounded-lg  w-full bg-third bg-opacity-95 mx-2   p-6">
          <!-- Mobile Logo -->
          <div class="lg:hidden flex justify-center mb-5">
            <a href="#" class="flex items-center logo w-[249px] h-16 rounded-md justify-center">
              <logoComp />
            </a>
          </div>

          <!-- Sign-Up Form -->
          <div>
            <h1 class="text-3xl font-bold text-center mb-2">Sign Up</h1>
            <p class="text-center mb-4">Please enter your details below.</p>
            <form @submit.prevent="signUp">
              <div class="space-y-4">
                <!-- Name -->
                <div>
                  <label class="block text-sm">Full Name</label>
                  <input v-model="validateSignUp.name.$model" type="text" class="w-full h-10 rounded border-1 pl-2 bg-secondary" placeholder="Enter your full name" />
                </div>
                <!-- Email -->
                <div>
                  <label class="block text-sm">Email</label>
                  <input v-model="validateSignUp.email.$model" type="email" class="w-full h-10 rounded border-1 pl-2 bg-secondary" placeholder="Enter your email" />
                </div>
                <!-- Mobile -->
                <div>
                  <label class="block text-sm">Mobile</label>
                  <input v-model="validateSignUp.mobile.$model" type="number" class="w-full h-10 rounded border-1 pl-2 bg-secondary" placeholder="Enter your mobile number" />
                </div>
                <!-- Gender -->
                <div>
                  <label class="block text-sm">Gender</label>
                  <select v-model="validateSignUp.gender.$model" class="w-full h-10 rounded  border-black border-1 bg-secondary">
                    <option value="" disabled>Choose Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
                <!-- Password -->
                <div class="relative">
                  <label class="block text-sm">Password</label>
                  <input v-model="validateSignUp.password.$model" :type="passwordFields.password ? 'text' : 'password'" class="w-full h-10 relative rounded border-1 pl-2 bg-secondary" placeholder="Enter your password" />
                  <span @click="togglePasswordVisibility('password')" class="absolute right-4 top-11 transform -translate-y-1/2 cursor-pointer">
                    <EyeOffIcon v-if="passwordFields.password" class="w-5" />
                    <EyeIcon v-else class="w-5" />
                  </span>
                </div>
              </div>
              <!-- Terms -->
              <div class="flex items-center mt-4">
                <CheckBox v-model="checkbox" class="w-4 h-4" />
                <p class="text-sm ml-2">
                  I agree to the <a href="#" class="underline">T&C</a> and <a href="#" class="underline">Privacy Policy</a>.
                </p>
              </div>
              <!-- Submit Button -->
              <div class="mt-6 flex flex-col space-y-4">
                <button type="submit" :disabled="!checkbox" class="w-full h-10 bg-black text-white rounded-lg font-bold">
                  Register
                </button>
                <button @click="handleToggle" type="button" class="w-full h-10 bg-gray-200 text-black rounded-lg font-bold">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watchEffect, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { makeRequest, showToast } from '@/request/request'
import { setToken } from '@/utils/auth'
import logoComp from '../login/logoComp.vue'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import CheckBox from '@/components/checkBox.vue'

const router = useRouter()

const error = ref("")
const checkbox = ref(false)
const otpSent = ref(false)

const signUpData = reactive({
  name: '',
  email: '',
  mobile_prefix: '+91',
  mobile: '',
  gender: '',
  password: '',
  message: '',
  isAgree: false,
  otp: '',
})

const rules = {
  name: { required },
  email: { required, email },
  mobile: { required },
  gender: { required },
  password: { required, minLength: minLength(6) },
  otp: { 
    required: (value: any) => {
      return otpSent.value && value === '' ? false : true
    },
    minLength: minLength(6),
  },
}

const validateSignUp = useVuelidate(rules, signUpData)

const passwordFields = reactive({
  password: false,
})

const handleToggle = () => {
  router.push({ name: 'login' })
}

const togglePasswordVisibility = (field: string) => {
  passwordFields[field] = !passwordFields[field]
}

const signUp = async () => {
  const isFormCorrect = await validateSignUp.value.$validate()
  if (!isFormCorrect) return

  try {
    signUpData.isAgree = checkbox.value
    const response = await makeRequest('register', 'POST', signUpData)
    if (response && response.data && response.data.access_token) {
      setToken(response.data.access_token)
      showToast("Registration successful", "success")
      router.push({ name: 'login' })
    } else {
      error.value = "Invalid response from server"
    }
  } catch (err: any) {
    error.value = err.message || "An error occurred during registration"
  }
}

onBeforeMount(() => {
  const url = window.location.href
  // Add any necessary initialization logic here
  parsedUrl.value = new URL(url)
  extractDomain()
})

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

const tncUrl = ref('')
const privacyPolicyUrl = ref('')

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
</script>

<style scoped>
.dark .bg-primary {
  background-image: radial-gradient(rgba(0, 0, 0, 0) 1px, #000 1px);
  backdrop-filter: brightness(100%) blur(3px);
  background-size: 4px 4px;
}

.submit-btn button {
  backdrop-filter: none !important;
  background-image: none !important;
}

.input-box label {
  @apply text-black font-bold;
}

.input-box input {
  @apply w-full px-2 py-1 box-border border border-gray-50 rounded focus:outline-1 focus:outline-gray-200;
}

select {
  @apply w-full h-10 px-2 py-1 box-border border border-gray-50 rounded cursor-pointer focus:outline-1 focus:outline-gray-200;
}

.dark .input-box label {
  @apply text-tableText;
}

/* CSS for the animated background */
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

