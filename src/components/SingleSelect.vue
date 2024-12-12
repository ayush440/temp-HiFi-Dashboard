<template>
    <div ref="dropdownRef" :id="id" class="relative single-select-dropdown" tabindex="0">
      <div @click="toggleDropdown" class="w-full px-4 py-1 bg-secondary-light border border-primary dark:border-gray-400  focus:outline-1 focus:outline-primary rounded"
           :class="{ 'cursor-not-allowed opacity-80': disabled, 'cursor-pointer': !disabled }">
        <div class="flex items-center justify-between">
          <span v-if="!selectedOption">{{ placeholder }}</span>
          <span v-else>{{ getSelectedLabel }}</span>
          <svg
            class="w-5 h-5 ml-2 text-primary transition-transform transform"
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
      <div class="hidden">
        <slot></slot>
      </div>
      <transition name="fade">
        
        <div v-if="isOpen && !disabled" class="absolute z-10 mt-[2px] w-full max-h-56 overflow-auto text-nowrap bg-secondary border border-primary dark:border-gray-400 rounded-md shadow-xl shadow-third-bold dark:shadow-primary">
          <div
            v-if="options.length"
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option)"
            class="w-full cursor-pointer hover:bg-third dark:hover:bg-gray-300 dark:hover:text-black"
            :class="{ 'bg-third-bold dark:bg-gray-400 dark:text-black': option.value.toString() === selectedOption.toString() }"
          >
            <label class="flex m-0 items-center py-[2px] pl-4 cursor-pointer font-normal text-base text-tableText dark:text-white dark:hover:text-black"
            >
              <div class="flex m-0 items-center">
                <div v-if="iconShow && option.icon" class="mr-4">
                  <component :is="option.icon" class="w-4 h-4 "/>
                </div>
                <div v-else-if="imageShow && option.image" class="mr-4">
                  <img :src="images[option.image]" class="w-4 h-4" />
                </div>
                <div>{{ option.label }}</div>
              </div>
            </label>
          </div>
          <div v-else class="w-full cursor-pointer">
            <label class="flex items-center m-0 py-[2px] pl-4 cursor-pointer">
              <span class="text-gray-700 dark:text-white">Options not available</span>
            </label>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { images } from '@/assets/img/index';
  import { ref, computed, watch, watchEffect, onUnmounted, onMounted } from 'vue';
  
  const props = defineProps({
    id: {
      type: String,
      default: `SingleSelect-${Math.random().toString(16).slice(2)}`
    },
    modelValue: {
      type: [Number, String, Object],
      default: null,
    },
    placeholder: {
      type: String,
      default: 'Select',
    },
    disabled: {
      type: Boolean,
      default: false,
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
  
  const emit = defineEmits(['update:modelValue']);
  
  const isOpen = ref(false);
  const selectedOption = ref<any>(props.modelValue);
  const dropdownRef = ref<HTMLElement | null>(null);
  
  const options = ref<Array<{ key: string, value: string, label: string, icon?: string, image?: string }>>([]);
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };

  const findAllOptions = () => {
    let data: NodeListOf<HTMLOptionElement> =  dropdownRef.value?.querySelectorAll('option') || [] as any;
    const slotOptions = Array.from(data).map(option => ({
      key: option.getAttribute('key') || '',
      value: option.value,
      label: option.textContent || '',
      icon: option.getAttribute('icon') || '',
      image: option.getAttribute('image') || ''
    }));
    options.value = slotOptions;
  }
  
  const selectOption = (option: any) => {
    selectedOption.value = option.value;
    emit('update:modelValue', option.value);
    isOpen.value = false;
  };
  
  const getSelectedLabel = computed(() => {
    const selected = options.value.find(option => option.value.toString() === selectedOption.value.toString());
    return selected ? selected.label : props.placeholder;
  });
  
  watch(() => props.modelValue, (newValue) => {
    selectedOption.value = newValue;
  });

//   watchEffect(() => { 
//     selectedOption.value = props.modelValue;
//   });
  
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.value &&
      !dropdownRef.value.contains(event.target as Node)
    ) {
      isOpen.value = false;
    }
  };
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    findAllOptions();
  });
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
  </script>
  
  <style scoped lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .rotate-180 {
    transform: rotate(180deg);
  }
  
  .single-select-dropdown {
    span, svg {
      @apply text-gray-800 dark:text-white font-normal text-base;
    }
  }
  </style>
  