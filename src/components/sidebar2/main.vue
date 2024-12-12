<template>
  <div>
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity z-40"
      @click="close"
    ></div>
    <div
      :class="[
        'fixed right-0 top-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out z-50',
        'w-full sm:w-4/5 md:w-5/6 lg:w-2/3 xl:w-1/2', // Updated width classes for better tablet view
        isOpen ? 'transform translate-x-0' : 'transform translate-x-full'
      ]"
    >
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-lg font-semibold">{{ title }}</h2>
        <button 
          @click="close" 
          class="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
        >
          <XIcon class="h-5 w-5" />
        </button>
      </div>
      <div class="p-4 overflow-y-auto h-[calc(100%-64px)] custom-scrollbar">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XIcon } from 'lucide-vue-next'

interface Props {
  isOpen: boolean;
  title: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Sidebar'
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => {
  emit('close')
}
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E1 transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #CBD5E1;
  border-radius: 3px;
}

@media (max-width: 640px) {
  .responsive-height {
    height: calc(100% - 56px);
  }
}
</style>