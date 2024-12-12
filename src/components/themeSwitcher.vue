<template>
    <div v-if="!darkMode" class="fixed bottom-10 right-3 theme-colors" style="z-index: 100;">
      <div id="shape" class="flex items-center justify-center " 
        :class="{ 'circle justify-center bg-opacity-70': isCircle, 'rectangle justify-between bg-opacity-80': !isCircle }" 
        @click="toggleShape" :style ="{ 'background-image': 'linear-gradient(to right top, rgb(var(--color-primary)), rgb(var(--color-third))' }"
      >
        <div v-if="isCircle" class="p-2 drop-shadow	text-sm font-semibold text-white"> Theme </div>

        <div v-if="!isCircle" class="stick w-full h-full px-4 flex justify-between items-center">
            <div v-if="colorSchemes" v-for="data in colorSchemes" :class="data">
                <div :key="data" @click="changeTheme = data" 
                    class="small-div w-8 h-8 m-1 p-1 border-red-100 rounded-full text-sm animate-grow" 
                    :class="{ 'border-[3px]': systemTheme === data, 'border': systemTheme !== data }"
                    :style ="{ 'background-image': getGradient(data) }"
                >
                </div>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useColorSchemeStore } from '@/stores/color-scheme'

  const colorSchemeStore = useColorSchemeStore()

  const { changeTheme, colorSchemes, systemTheme, darkMode } = storeToRefs(colorSchemeStore)
  const { setSystemThemeClass } = colorSchemeStore
  
  const isCircle = ref<boolean>(true);

  const toggleShape = () => {
    isCircle.value = !isCircle.value;
  };

  watch(changeTheme, (newTheme, oldTheme) => {
    if(newTheme !== oldTheme) {
        setSystemThemeClass(newTheme)
    }
  })

  const getGradient = (data: string) => {
    if(data == 'default') {
      return `linear-gradient(to right top, #7bc9ff, #f3f4f6`;
    } else if(data == 'toggleBtn') {
      return `linear-gradient(to right top, rgb(var(--color-primary)), rgb(var(--color-third))`;
    }
     else {
      return `linear-gradient(to right top, rgb(var(--color-primary)), rgb(var(--color-third))`;
    }
  }
  </script>
  
  <style scoped lang="scss">
  #shape {
    cursor: pointer;
    transition: 0.5s;
  }
  
  .circle {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
  }
  
  .rectangle {
    width: 465px;
    height: 55px;
    border-radius: 55px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  }

  @keyframes grow {
  0% {
    width: 0;
    height: 0;
  }
  100% {
    width: 1.5rem; 
    height: 1.5rem;
  }
}

.animate-grow {
  animation: grow 0.5s ;
}

  </style>
  