import { ref, onMounted, watch } from 'vue'
import { defineStore } from 'pinia'

export const useColorSchemeStore = defineStore('colorSchemes', () => {
  const colorSchemes = ref<string[]>(['default', 'theme-1', 'theme-2', 'theme-3', 'theme-4', 'theme-5', 'theme-6', 'theme-7', 'theme-8', 'theme-9', 'theme-10'])
  const systemTheme = ref<string>('theme-3')
  const changeTheme = ref<string>('default')
  const darkMode = ref<boolean>(false)
  const data2 = ref<boolean>(false)
  let color = {
    theme: 'theme-1',
    color: 'text-third',
    bg: 'bg-primary',
  }

  onMounted(() => {
    const storedValue: string | null = localStorage.getItem('theme') 
    const data: string = storedValue ? JSON.parse(storedValue) : 'default'

    const storedValue2: string | null = localStorage.getItem('darkMode') ||  'false'
    data2.value = storedValue ? JSON.parse(storedValue2) : false

    if (data2.value) {
      systemTheme.value = data
      changeTheme.value = data
    } else {
      systemTheme.value = data
      changeTheme.value = data
      const htmlElement = document.querySelector('html');
      // if (!htmlElement) return;
      htmlElement?.classList.add(data);
    }
  })

  watch(darkMode, (newValue, oldValue) => {
    if(newValue !== oldValue) {
      data2.value = newValue
    }
  })


  const setSystemThemeClass = (value: string = 'default') => {
    const htmlElement = document.querySelector('html');
    let object = htmlElement?.classList;
    
    colorSchemes.value.forEach((item) => {
      object?.remove(item);
    })

    // object?.remove('theme-1', 'theme-2', 'theme-3', 'theme-4', 'theme-5', 'default');

    // document.body.className = value
    if(!data2.value) {
      htmlElement?.classList.add(value);
    }
    
    localStorage.setItem('theme', JSON.stringify(value))
    systemTheme.value = value
  }



  return {
    darkMode,
    systemTheme,
    changeTheme,
    colorSchemes,
    setSystemThemeClass,
  }
})
