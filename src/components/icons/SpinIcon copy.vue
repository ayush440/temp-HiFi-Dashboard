<template>
  <svg viewBox="0 0 800 800">
    <circle
      class="spin"
      cx="400"
      cy="400"
      fill="none"
      r="100"
      stroke-width="25"
      stroke="#E387FF"
      stroke-dasharray="350 700"
      stroke-linecap="round"
    />
  </svg>
</template>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spin {
  transform-origin: center;
  animation: spin 2s linear infinite;
}
</style>
