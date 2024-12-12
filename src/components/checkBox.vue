<template>
    <label class="flex gap-3 items-center" :class="size">
      <input
        v-model="model"
        class="rounded border-black dark:ring-offset-gray-50 focus:ring-2 dark:border-gray-50"
        :class="[
            disabled? 'brightness-75 cursor-not-allowed ': 'cursor-pointer', 
            inputClass? inputClass : '',
            size? size : ''
        ]"
        :disabled="disabled"
        type="checkbox"
      >
      <slot />
    </label>
  </template>
  
  <script lang="ts" setup>
  import { computed } from 'vue'
  
  interface CheckboxProps {
    disabled?: boolean,
    modelValue?: boolean,
    inputClass?: string,
    size?: string
  }
  const props = withDefaults(defineProps<CheckboxProps>(), {
    disabled: false,
    modelValue: false,
    inputClass: '',
    size: 'w-4 h-4',
  })
  
  const emit = defineEmits(['update:modelValue'])
  const model = computed({
    get () {
      return props.modelValue
    },
    set (val) {
      emit('update:modelValue', val)
    },
  })
  </script>



<style scoped>

[type=checkbox], [type=radio] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    display: inline-block;
    vertical-align: middle;
    background-origin: border-box;
    -webkit-user-select: none;
    user-select: none;
    flex-shrink: 0;
    color: rgb(var(--color-primary));
    /* background-color: #fff; */
    border-color: #6b7280;
    border-width: 1px;
    box-shadow: 0 0 #0000;
}

[type=checkbox]:checked {
    background-image: url("@/assets/svgs/check.svg");
}

[type=checkbox]:checked, .dark [type=checkbox]:checked{
    border-color: transparent;
    background-color: currentColor;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}


.dark [type=checkbox]:checked{
    border-color: gray;
    background-color: currentColor;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}


</style>