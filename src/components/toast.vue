<template>
  <teleport to="body">
    <div v-if="toastsArray.length > 0" class="toast-container" :style="{ zIndex: Math.max(zIndexValue+1, currZindex+1 ) }" >
      <div
        v-for="toast in toastsArray"
        :key="toast.id"
        class="toast"
        :class="{ 'toast-show': toast.show }"
        :style="{ color: toast.color, zIndex: Math.max(zIndexValue+2, currZindex+2 ) }"
      >
        <div class="flex">
          <div class="icon">{{ getIcon(toast.type) }}</div>
          <div class="toast-content">
            <p class="dark:text-white">{{ toast.message }}</p>
            <span class="close-btn" @click="hideToast(toast.id)">✖</span>
            </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToastStore } from '@/stores/utils/toast'
import { storeToRefs } from 'pinia'

const toastStore = useToastStore()
const { toasts } = storeToRefs(toastStore)
interface Toast {
  id: number
  type: string
  message: string
  color: string
  show: boolean
}

const showToasts = ref<boolean>(false)
const currZindex = ref<number>(0)
const toastsArray = computed<Toast[]>(() => {
  let toastsArray = toasts.value
  getHighestZIndex()
  if(toastsArray.length > 0) showToasts.value = true
  else showToasts.value = false
  return toastStore.toasts
})

const hideToast = (id: any) => {
  toasts.value = toasts.value.filter((toast: Toast) => toast.id !== id)
}

const getIcon = (type: string) => {
  switch (type) {
    case 'success':
      return '✅'
    case 'error':
      return '❌'
    case 'warning':
      return '⚠️'
    default:
      return 'ℹ️'
  }
}


function getHighestZIndex() {
  const elements = [...document.querySelectorAll('body *')] as HTMLElement[]
  const zIndexes = elements.map(el => parseFloat(window.getComputedStyle(el).zIndex))
    .filter(zIndex => !isNaN(zIndex))
  currZindex.value = Math.max(0, ...zIndexes) 
  return Math.max(0, ...zIndexes)
}

const zIndexValue = computed(() => getHighestZIndex() + 1)
  
</script>

<style scoped>
.toast-container {
  /* z-index: 9999 !important; */
  @apply fixed top-5 right-5 flex flex-col items-end;
}

.toast {
  @apply bg-secondary max-w-sm p-4 rounded-md opacity-0 transform transition-transform ease-out duration-300  mb-2 ;
  animation: slideInRight 0.5s ease-out forwards;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

@keyframes slideInRight {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.toast-show {
  @apply opacity-100 transform translate-y-0 scale-100;
}

.toast-content {
  @apply flex justify-between items-center;
}

.icon {
  @apply mr-2 text-xl p-1;
}

.toast-content p {
  @apply text-sm;
}

.close-btn {
  @apply cursor-pointer text-xs p-2 ml-2 mt-[-10px];
}
</style>

