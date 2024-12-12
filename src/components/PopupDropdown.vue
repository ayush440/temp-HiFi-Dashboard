<template>
    <div :id="id" ref="dropdownCont" :class="{'relative': true}" >
        <!-- header -->
        <!-- which is defined in parent component -->
        <div ref="dropdownBtn">
            <slot name="dropdown-toggle" ></slot>
        </div>
    
        <!-- body -->
        <transition name="dropdown-slide">
            <div v-if="isOpen" ref="dropdown" :style ="{ zIndex: zIndexValue }" class="absolute dropdown-body p-2 w-80 right-[50%] top-12 mt-2 bg-secondary dark:bg-secondary-light rounded-md shadow-md dark:shadow-third z-50" :class ="dropdownClass">
                <slot name="dropdown-body"></slot>
            </div>
        </transition>
    </div>
</template>
  
<script setup lang="ts">
  import { ref, computed, watchEffect, type Ref } from 'vue';
  

  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: false,
      default: false
    },
    id: {
      type: String,
      required: false,
      default: `dropdown-${Math.random().toString(16).slice(2)}`
    },
    dropdownClass: {   // we have to pass classes  for dropdown
      type: String,
      required: false,
      default: ''
    }
  });
  
  const dropdownCont: Ref<HTMLElement | null> = ref(null);
  const dropdown: Ref<HTMLElement | null> = ref(null);
  const dropdownBtn: Ref<HTMLElement | null> = ref(null);
  const emit = defineEmits(['close', 'click:outside']);

  const clickHandler = (event: any) => {    
    if (dropdown.value && dropdown.value.contains(event.target)) {
    } else if(dropdownBtn.value && dropdownBtn.value?.contains(event.target)) {
    } else {
        emit('close')
        removelistener()
    }
  }

  const handleClickOutside = () => {
    document.addEventListener('click', clickHandler)
  } 

  const removelistener = () => {
    document.removeEventListener('click', clickHandler)
  } 

  watchEffect(() => {
    if (props.isOpen) {
      handleClickOutside()
    } else {
      removelistener()
    }
  })
  
  function getHighestZIndex() {
    const elements = [...document.querySelectorAll('body *')] as HTMLElement[]
    const zIndexes = elements.map(el => parseFloat(window.getComputedStyle(el).zIndex))
      .filter(zIndex => !isNaN(zIndex))
    return Math.max(0, ...zIndexes)
  }

  // Compute the zIndex value dynamically
  const zIndexValue = computed(() => getHighestZIndex() + 1)
  
</script>
  
<style scoped lang="scss">

  .dropdown-slide-enter-active,
  .dropdown-slide-leave-active {
    transition: opacity 0.3s ease;
  }

  .dropdown-slide-enter,
  .dropdown-slide-leave-to {
    opacity: 0;
  }

  /* Or use animations for more customization */
  @keyframes dropdown-fade-in {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
    to {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  @keyframes dropdown-fade-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(10px);
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
  