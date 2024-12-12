<template>
  <div class="cursor-pointer" @click="switchMode" 
    :class="{ 'flex items-center justify-center bg-black bg-opacity-10 p-3 rounded-full': props.bgCircle,
      'p-2 2xl:p-2.5 mx-1 bg-secondary small-box-shadow rounded-full': props.topbar
     }"
  
  >
    <DayIcon v-if="darkMode" :class="[ props.topbar? 'w-4 h-4 2xl:w-5 2xl:h-5 cursor-pointer': 'w-7 h-7' ]"/>
    <NightIcon v-else :class="[ props.topbar? 'w-4 h-4 2xl:w-5 2xl:h-5 cursor-pointer': 'w-7 h-7' ]" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs  } from 'pinia';
import { ref, computed, onMounted } from 'vue'
import { useColorSchemeStore } from '@/stores/color-scheme'

const colorSchemeStore = useColorSchemeStore()

const { darkMode, systemTheme, colorSchemes } = storeToRefs(colorSchemeStore)


const props = defineProps({
  bgCircle: {
    type: Boolean,
    default: false
  },
  topbar: {
    type: Boolean,
    default: false
  }
})


onMounted(() => {
  const storedValue: string | null = localStorage.getItem('darkMode')
  const data: boolean = storedValue ? JSON.parse(storedValue) : false
  if (data) {
    darkMode.value = data
    setDarkModeClass()
  }
})


const setDarkModeClass = () => {
  const htmlElement = document.querySelector('html');
  if (!htmlElement) return; // Ensure the html element exists

  if (darkMode.value) {
    colorSchemes.value.forEach(item => {
      htmlElement.classList.remove(item);
    });
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
    if (systemTheme.value) {
      htmlElement.classList.add(systemTheme.value);
    }
  }
};

function switchMode() {
  darkMode.value = !darkMode.value
  localStorage.setItem('darkMode', JSON.stringify(darkMode.value))
  setDarkModeClass()
}
</script>
