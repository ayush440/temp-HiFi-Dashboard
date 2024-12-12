<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

defineProps<{
  title?: string
  size?: string
  submit?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'confirm'): void
  (e: 'close'): void
}>()

// const emit = defineEmits(['close', 'click:outside'])

function closeModal () {
    emit('close')
    emit('update:modelValue', false)
  }
</script>

<template>
  <VueFinalModal overlayTransition="vfm-fade" contentTransition="vfm-fade"
    class="items-center overflow-auto"
    :content-class="`flex flex-col mx-4 p-4 border dark:border-gray-700 rounded-lg space-y-2 ml-auto mr-auto mt-16 ${size}`"
    @update:model-value="(val) => emit('update:modelValue', val)" @closed="closeModal"
  >
  <div class="sticky top-[-16px] left-0 bg-inherit z-10">
      <div class="flex justify-between " v-if="title">
        <h1 class="text-xl sm:text-2xl font-bold text-primary header">
          {{ title }}
        </h1>
        <h1
          class="text-2xl font-bold text-red-500 cursor-pointer"
          @click="closeModal"
        >
          X
        </h1>
      </div>
      <!-- @click="emit('confirm')" -->
      <hr v-if="title" class="w-full mt-2 mb-2 border-primary dark:border-secondary" />
    </div>

    <slot></slot>
  </VueFinalModal>
</template>


<!-- <style >
.vfm-enter-active, .vfm-leave-active {
  transition: opacity 0.5s;
}
.vfm-enter, .vfm-leave-to {
  opacity: 0;
}
</style> -->