<template>
    <div ref="dropdownRef" :id="id" class="relative single-select-dropdown" tabindex="0">
      <div @click="toggleDropdown" class="w-full px-4 py-1 border border-primary bg-secondary rounded-md"
      :class="{ 'cursor-not-allowed opacity-80': disabled, 'cursor-pointer': !disabled }">
        <div class="flex items-center justify-between">
          <span class="text-gray-700" v-if="!selectedOption">Select</span>
          <span class="text-gray-700" v-else>{{ getSelectedLabel }}</span>
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
      <transition name="fade">
        <div v-if="isOpen && !disabled" class="absolute z-10 mt-2 w-full max-h-60 overflow-auto text-nowrap bg-secondary border border-secondary-bold rounded-md shadow-lg">
          <div
            v-if="options.length"
            v-for="option in options"
            :key="option.id"
            @click="selectOption(option.id)"
            class="w-full cursor-pointer hover:bg-gray-400"
            :class="{ 'bg-gray-500': option.id === selectedOption }"
          >
            <label class="flex m-0 items-center py-[2px] pl-4 cursor-pointer">
              <div class="flex m-0 items-center text-gray-700">
                <div v-if="iconShow && option.icon && containsIcon(option.icon)" class="mr-4 text-indigo-500">
                    <component :is="option.icon" class="w-4 h-4"/>
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
              <span class="text-gray-700">Options not available</span>
            </label>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, type PropType, watch, onUnmounted, onMounted } from 'vue';
  import { images } from '@/assets/img/index';
  
  const props = defineProps({
    id: {
      type: String,
      default: `SingleSelect-${Math.random().toString(16).slice(2)}`
    },
    options: {
      type: Array as PropType<{ id: any; label: any, icon: any, image: any }[]>,
      default: () => [],
    },
    modelValue: {
      type: [Number, String],
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
  
  const options = computed(() => props.options);
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  const selectOption = (id: number) => {
    selectedOption.value = id;
    emit('update:modelValue', id);
    isOpen.value = false;
  };
  
  const getSelectedLabel = computed(() => {
    const selected = options.value.find(option => option.id === selectedOption.value);
    return selected ? selected.label : props.placeholder;
  });
  
  watch(() => props.modelValue, (newValue) => {
    selectedOption.value = newValue;
  });
  
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
  });
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });

  const containsIcon = (str: string) => {
    return str.includes('Icon');
  }
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
    span {
      @apply text-black font-normal text-base;
    }
  }
  </style>