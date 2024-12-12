<template>
  <div
    :id="id"
    class="tippy-item-container z-auto"
    :class="{ hidden: hidden }"
    @mouseover="showTooltip"
    @mouseout="hideTooltip"
    ref="target"
  >
    <slot></slot>
    <teleport to="body">
      <div
        v-if="isTooltipVisible"
        :class="[tooltipClasses, className]"
        :style="tooltipStyles"
        ref="tooltip"
      >
        <div class="tooltip-content max-w-[200px] sm:max-w-[350px]">{{ content }}</div>
        <div class="tooltip-arrow"></div>
      </div>
    </teleport>
  </div>
</template>



<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import type { Ref } from 'vue';

const props = defineProps({
  content: {
    type: String,
    default: 'Default Tooltip Text'
  },
  tooltipDirection: {
    type: String,
    default: 'top'
  },
  class: {
    type: String,
    default: ''
  },
  hidden: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: () => `tooltip-${Math.random().toString(16).slice(2)}`
  }
})

const isTooltipVisible = ref<boolean>(false)
const tooltipStyles = ref<any>({})

// Define types for refs
const target: Ref<HTMLElement | null> = ref(null)
const tooltip: Ref<HTMLElement | null> = ref(null)

const showTooltip = () => {
  isTooltipVisible.value = true
  nextTick(() => updateTooltipPosition())
}

const hideTooltip = () => {
  isTooltipVisible.value = false
}

const className = computed(() => {
  return `p-1 bg-[#333] dark:bg-[#222] mt-2 text-sm ${props.class}`
})

const tooltipClasses = computed(() => {
  return {
    tooltip: true,
    'tooltip-top': props.tooltipDirection === 'top',
    'tooltip-bottom': props.tooltipDirection === 'bottom',
    'tooltip-left': props.tooltipDirection === 'left',
    'tooltip-right': props.tooltipDirection === 'right'
  }
})

const getHighestZIndex = () => {
  const elements = [...document.querySelectorAll('body *')] as HTMLElement[]
  const zIndexes = elements.map(el => parseFloat(window.getComputedStyle(el).zIndex)).filter(zIndex => !isNaN(zIndex))
  return Math.max(0, ...zIndexes)
}

const zIndexValue = computed(() => getHighestZIndex() + 1)

const updateTooltipPosition = () => {
  if (tooltip.value && target.value) {
    const targetRect = target.value.getBoundingClientRect()
    const tooltipRect = tooltip.value.getBoundingClientRect()
    const topOffset = window.scrollY + targetRect.top
    const leftOffset = window.scrollX + targetRect.left

    switch (props.tooltipDirection) {
      case 'top':
        tooltipStyles.value = {
          top: `${topOffset - tooltipRect.height - 10}px`,
          left: `${leftOffset + (targetRect.width - tooltipRect.width) / 2}px`,
          zIndex: zIndexValue.value
        }
        break
      case 'bottom':
        tooltipStyles.value = {
          top: `${topOffset + targetRect.height + 10}px`,
          left: `${leftOffset + (targetRect.width - tooltipRect.width) / 2}px`,
          zIndex: zIndexValue.value
        }
        break
      case 'left':
        tooltipStyles.value = {
          top: `${topOffset + (targetRect.height - tooltipRect.height) / 2}px`,
          left: `${leftOffset - tooltipRect.width - 10}px`,
          zIndex: zIndexValue.value
        }
        break
      case 'right':
        tooltipStyles.value = {
          top: `${topOffset + (targetRect.height - tooltipRect.height) / 2}px`,
          left: `${leftOffset + targetRect.width + 10}px`,
          zIndex: zIndexValue.value
        }
        break
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateTooltipPosition)
  window.addEventListener('resize', updateTooltipPosition)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateTooltipPosition)
  window.removeEventListener('resize', updateTooltipPosition)
})

watch(isTooltipVisible, (newValue) => {
  if (newValue) updateTooltipPosition()
})
</script>


<style scoped lang="scss">
.tippy-item-container {
  position: relative;
  display: inline-block;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hidden {
  display: none;
}
.tooltip {
  position: absolute;
  color: #fff;
  border-radius: 4px;
  opacity: 1;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tooltip-content {
  text-wrap: wrap;
  width: max-content;
  min-width: 70px;
  //max-width: 350px;
}

.tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  border-width: 6px;
}

.tooltip-top {
  .tooltip-arrow {
    top: 100%;
    border-color: #333 transparent transparent transparent;
  }
}

.tooltip-bottom {
  .tooltip-arrow {
    bottom: 100%;
    border-color: transparent transparent #333 transparent;
  }
}

.tooltip-left {
  .tooltip-arrow {
    left: 100%;
    border-color: transparent transparent transparent #333;
  }
}

.tooltip-right {
  .tooltip-arrow {
    right: 100%;
    border-color: transparent #333 transparent transparent;
  }
}

.tippy-item-container:hover .tooltip {
  opacity: 1;
}
</style>



