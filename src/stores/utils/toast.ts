import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  interface Toast {
    id: number
    show: boolean
    message: string
    type: string
    color: string
  }

  const addToast = (message: string, type: string) => {
    let toastData: Toast = {
      id: Date.now(),
      show: true,
      message: message,
      type: type,
      color: getColor(type)
    }
    toasts.value.push(toastData)

    setTimeout(() => {
      toasts.value = toasts.value.filter((toast: Toast) => toast.id !== toastData.id)
    }, 4000)
  }

  const getColor = (type: string) => {
    if (type == 'success') {
      return 'green'
    } else if (type == 'error') {
      return 'red'
    } else if (type == 'warning') {
      return 'red'
    } else if (type == 'info') {
      return 'blue'
    } else {
      return 'black'
    }
  }

  return {
    toasts,
    addToast
  }
})
