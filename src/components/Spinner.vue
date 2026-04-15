<template>
  <div aria-busy="true" aria-live="polite" class="spinner-container" role="status">
    <div :style="{ width: size, height: size }" aria-label="Loading" class="spinner"></div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ size: string }>()
</script>

<style scoped>
@import url('@/assets/base.css');

.spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  box-sizing: border-box;
  display: inline-block;
  border: 10px solid var(--white);
  border-top: 10px solid var(--blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
    border-top-color: var(--white);
  }
}
</style>
