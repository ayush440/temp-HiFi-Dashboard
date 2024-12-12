<template>
  <label :for="id" class="form-button inline-flex items-center max-w-20 z-0" :class="{
        ' brightness-90 dark:brightness-75 cursor-not-allowed ': disabled, 'cursor-pointer ': !disabled
      }">
    <input
      :id="id"
      :disabled = "disabled"
      type="checkbox"
      :name="name"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement)?.checked)"
      class="hidden w-0 opacity-0"
    />
    <div
      class="form-switch shadow border-gray-200 dark:border-gray-400"
      :class="{
        'bg-primary border-primary shadow': modelValue,
        'bg-white dark:border-white': !modelValue
      }"
    >
      <div
        class="absolute mt-[-0.5px] h-[1.15rem] w-[1.15rem] border-2 border-gray-200 dark:border-gray-300 rounded-full shadow dark:shadow-md transform duration-300 ease-in-out bg-white"
        :class="{
          'translate-x-[-1rem]': !modelValue,
          'translate-x-[1.05rem]': modelValue
        }"
      ></div>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  id: {
    type: String,
    default() {
      return `switch-${Math.random().toString(16).slice(2)}`;
    },
  },
  name: String,
  modelValue: Boolean,
  disabled: {
    type: Boolean,
    default: false,
  },
});

const id  = computed(() => {
  return `${props.id}-${Math.random().toString(16).slice(2)}`
})
</script>

<style scoped>
.bg-primary{
  background-image: none;
}
</style>