<template>
  <div ref="dropdownRef" class="relative multiselect-dropdown" :id ="id" tabindex="0">
    <div @click="toggleDropdown" class="w-full px-4 py-1 border border-primary dark:border-gray-400 bg-secondary dark:bg-secondary-light rounded-md cursor-pointer">
      <div class="flex items-center justify-between ">
        <div class="text-gray-700 dark:text-gray-100" v-if="!selectedOptions.length">Select</div>
        <div class="text-gray-700 dark:text-gray-100" v-else>{{ selectedOptions.length }} item(s) selected</div>
        <svg
          class="w-5 h-5 ml-2 text-primary dark:text-gray-200 transition-transform transform"
          :class="{ 'rotate-180': isOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
    <transition name="fade">
      <div v-if="isOpen" class="absolute z-10 mt-2 w-full max-h-60 overflow-auto text-nowrap bg-secondary border border-secondary-bold rounded-md shadow-lg">
        <div v-if="options.length" v-for="option in options" :key="option.id" :for="option.id"  class="w-full cursor-pointer hover:bg-secondary-bold">
          <label class="flex m-0 items-center py-[2px] pl-4 cursor-pointer">
            <input type="checkbox"  v-model="selectedOptions"
              :value="option.id" class="mr-4 w-4 h-4 text-indigo-500"
            />
            <div class="flex w-full m-0 items-center text-gray-700 dark:text-gray-200">
                <div v-if="iconShow && option.icon" class="mr-4">
                  <component :is="option.icon" class="w-4 h-4 "/>
                </div>
                <div v-else-if="imageShow && option.image" class="mr-4">
                  <img :src="images[option.image]" class="w-4 h-4" />
                </div>
                <div class="py-[2px]">{{ option.label }}</div>
              </div>
          </label>
        </div>

        <div v-else class="w-full cursor-pointer">
          <label class="flex items-center m-0 py-[2px] pl-4 cursor-pointer">
            <span class="text-gray-700 dark:text-gray-200">Options not available</span>
          </label>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { images } from '@/assets/img/index';
import { ref,computed, type PropType,watch, onUnmounted, onMounted   } from 'vue';

const props = defineProps({
  id: {
    type: String, 
    default: () => `${Math.random().toString(16).slice(2)}`
  },
  initialOptions: {
    type: Array as PropType<{ id: number; label: string }[]>,
    default: () => [],
  },
  selected: {
    type: Function as PropType<(option: any) => void>,
    required: true,
  },
  iconShow: {
    type: Boolean,
    default: false,
  },
  imageShow: {
    type: Boolean,
    default: false,
  },
});


const isOpen = ref(false);
const selectedOptions = ref([]);
const dropdownRef = ref<HTMLElement | null>(null);

interface Option {
  id: number;
  label: string;
  icon?: any;
  image?: string;

}
const options = computed<Option[]>(() => {
  selectedOptions.value = []
  return props.initialOptions as Option[];
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

watch(selectedOptions, (newSelectedOptions, oldSelectedOptions) => {
  if(newSelectedOptions !== oldSelectedOptions) {
    props.selected(newSelectedOptions);
    isOpen.value = true
  }
});

const handleClickOutside = (event: MouseEvent) => {
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target as Node) &&
    !(event.target as Element)?.closest('.multiselect-dropdown-options')
  ) {
    isOpen.value = false;
  }
};

// const handleBlur = () => {
//   isOpen.value = false;
// };

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.rotate-180 {
  transform: rotate(180deg);
}

.multiselect-dropdown{
  span {
    @apply text-black font-normal text-base;
  }
}
</style>


