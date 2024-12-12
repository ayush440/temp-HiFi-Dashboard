<template>
  <div ref="selectSearch" :id="id" class="select-search custom-input" @keydown.enter="handleEnter" @blur="handleBlur">
    <input type="text" v-model="inputValue" @input="handleChange" @click="toggle" class="w-full border rounded py-1 px-2" :class="class" :placeholder="placeholder">
    <transition-group name="dropdown-slide">
      <div v-if="isOpen" class="dropdown mt-1 shadow-xl dark:shadow-primary rounded-lg bg-secondary dark:text-white border-2 dark:border-secondary-bold overflow-hidden w-full">
        <div class="dropdown-content overflow-y-scroll max-h-60  text-sm font-normal  w-inherit">
          
            <div v-if="options.length > 0">
              <div class="select-search-options capitalize w-inherit px-2 py-1 options hover:bg-third dark:hover:bg-gray-400 dark:hover:text-black" v-for="(option, index) in options" :id="`${index}-${option.id}`" 
              :class="{ 'bg-primary bg-opacity-25 dark:bg-opacity-100 dark:bg-gray-400 dark:text-black': option.id === selectedId }" :key="option.id" @click="handleSelect(option)" @touchstart="handleSelect(option)"
              >
                <div class="flex items-center">
                  <component v-if="option.image_url && containsIcon(option)" :is="option.image_url" class="h-4 w-4 mr-2" :style="{ color: option.color, strokeWidth: 2.5 }" />
                  {{ option.label }}
                </div>
              </div>
            </div>
            <!-- <div v-else-if="!loading">
              <div class="w-inherit px-2 py-2  border-b hover:bg-gray-100 dark:hover:bg-gray-400">Loading...</div>
            </div> -->
            <div  v-else class="w-inherit px-2 py-2  border-b hover:bg-secondary-bold dark:hover:bg-gray-400">Options not available</div>
          
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
  fetchOptionsFunction: Function;
  placeholder?: string;
  class?: string;
  id?: string;
  defaultInput?: string;
  canSearchEmpty?: boolean;
}>()

const inputValue = ref<string>(props.defaultInput || '');
const isOpen = ref<boolean>(false);
const options = ref<any>([]);
const count = ref<number>(0);
const loading = ref<boolean>(false);
const selectSearch = ref<HTMLElement | null>(null);
const selectedId = ref<any>();

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  selectedId.value = null;
  document.removeEventListener('click', handleClickOutside);
});

const emit = defineEmits(['inputValue', 'selected']);
const handleChange = async () => {
  if (inputValue.value.trim() === '' && !props.canSearchEmpty) {
    isOpen.value = false;
    options.value = [];
    emit('inputValue', inputValue.value);
    return;
  }
  emit('inputValue', inputValue.value);
  loading.value = true;
  const fetchedOptions: any = await props.fetchOptionsFunction(inputValue.value);
  options.value = Array.isArray(fetchedOptions) && fetchedOptions.length > 0 ? fetchedOptions : [];
  loading.value = false;
  if (!props.canSearchEmpty) {
    isOpen.value = true;
  } else {
    if (count.value) isOpen.value = true;
  }
  count.value++;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const selectComponents = document.querySelectorAll('.select-search');
  let clickedOutside = true;
  selectComponents.forEach(component => {
    if (component.contains(target)) {
      clickedOutside = false;
    }
  });

  if (clickedOutside) {
    isOpen.value = false;
  }
};

const handleSelect = (option: any) => {
  inputValue.value = option.label;
  isOpen.value = false;
  emit('selected', option);
  selectedId.value = option.id;
};

const handleEnter = (event: KeyboardEvent) => {
  if (options.value.length > 0 && inputValue.value.trim() !== '') {
    event.preventDefault();
    handleSelect(options.value[0]);
  }
};

const handleBlur = () => {
  setTimeout(() => {
    isOpen.value = false;
  }, 200);
};

const toggle = () => {
  if (options.value.length > 0) {
    isOpen.value = !isOpen.value;
  } else if (props.canSearchEmpty) {
    handleChange();
    isOpen.value = !isOpen.value;
  }
};

const containsIcon  = (option: any) => {
  return option && option.image_url.includes('Icon')
}
</script>


<style scoped lang="scss">
.custom-input {
  position: relative;
}

.custom-input input {
  width: 100%;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
}
::-webkit-scrollbar {
  width: 1px;
}
  
.select-search-options{
  transition: background-color 0.3s;
}

.dropdown-content div {
  cursor: pointer;
}

/* Or use animations for more customization */
@keyframes dropdown-fade-in {
from {
  opacity: 0;
}
to {
  opacity: 1;
}
}

@keyframes dropdown-fade-out {
from {
  opacity: 1;
}
to {
  opacity: 0;
}
}

.dropdown-slide-enter-active {
animation: dropdown-fade-in 0.3s ease;
}

.dropdown-slide-leave-active {
animation: dropdown-fade-out 0.3s ease;
}

</style>
