<template>
  <teleport to="body">
    <div v-if="show" :id="id" :style="{ zIndex: zIndexValue }">
      <div class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0" :style="{ zIndex: zIndexValue+1 }" />
      <div
        ref="modalRef"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0  w-full md:inset-0 h-modal h-full justify-center items-center flex"
        tabindex="0"
        :style="{ zIndex: zIndexValue+2 }"
        @click.self="clickOutside"
        @keyup.esc="closeWithEsc"
      >
        <div
          :class="`${modalSizeClasses[size]}`"
          class="relative p-4 w-full h-full"
          @click.self="clickOutside"
        >
          <!-- Modal content -->
          <div class="relative bg-third-light dark:text-white rounded-lg shadow" :class="{'mt-10': !popup}">

            <!-- Modal header -->
            <div
              :class="[$slots.header ? ' border-secondary-bold' : '', popup || !showHeader?'hidden':'border-b p-4']"
              class="rounded-t flex justify-between items-center"
            >
              <slot name="header" />
              <button
                v-if="!persistent"
                aria-label="close"
                class="text-gray-400 dark:text-tableText bg-transparent hover:bg-secondary-bold hover:text-gray-900 rounded-lg text-sm p-1 ml-auto inline-flex items-center dark:hover:text-white"
                :class="{ 'mt-2 mr-2': popup }"
                type="button"
                @click="closeModal"
              >
                <slot name="close-icon">
                  <svg
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  ><path
                    clip-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    fill-rule="evenodd"
                  /></svg>
                </slot>
              </button>
            </div>


            <div class = "">
            <!-- Modal body -->
              <div :class="$slots.header ? '' : 'pt-4'"
                class="p-2 pr-1 max-h-[75vh] overflow-y-scroll"
              >
                <slot name="body" />
              </div>

              <!-- Modal footer -->
              <div
                v-if="$slots.footer"
                :class="{'border-t': !popup}"
                class="p-4 rounded-b border-secondary-bold"
              >
                <slot name="footer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
  
<script lang="ts" setup>
  import { onMounted, ref,computed,  type Ref } from 'vue'
  import type { ModalSize } from './types'
  
  interface ModalProps {
    notEscapable?: boolean,
    persistent?: boolean
    size?: ModalSize,
    id?: string
    show?: boolean
    popup?: boolean
    showHeader?: boolean
  }
  
  const props = withDefaults(defineProps<ModalProps>(), {
    notEscapable: false,
    persistent: false,
    size: '2xl',
    id: `modal-${Math.random().toString(16).slice(2)}`,
    show: false,
    popup: false,
    showHeader: true
  })
  
  const emit = defineEmits(['close', 'click:outside'])
  const modalSizeClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-sm md:max-w-md lg:max-w-lg',
    xl: 'max-w-md md:max-w-lg lg:max-w-xl',
    '2xl': 'max-w-lg md:max-w-xl lg:max-w-2xl',
    '3xl': 'max-w-lg md:max-w-xl lg:max-w-3xl',
    '4xl': 'max-w-lg md:max-w-xl lg:max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
  }

  function getHighestZIndex() {
    const elements = [...document.querySelectorAll('body *')] as HTMLElement[]
    const zIndexes = elements.map(el => parseFloat(window.getComputedStyle(el).zIndex))
      .filter(zIndex => !isNaN(zIndex))
    return Math.max(0, ...zIndexes)
  }

  // Compute the zIndex value dynamically
  const zIndexValue = computed(() => getHighestZIndex() + 1)
  
  function closeModal () {
    emit('close')
  }
  function clickOutside () {
    if (!props.persistent) {
      emit('click:outside')
      closeModal()
    }
  }
  
  function closeWithEsc () {
    if (!props.notEscapable && !props.persistent) closeModal()
  }
  const modalRef: Ref<HTMLElement | null> = ref(null)
  onMounted(() => {
    if (modalRef.value) {
      modalRef.value.focus()
    }
  })
</script>
