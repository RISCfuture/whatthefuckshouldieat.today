<template>
  <div class="spinner-container">
    <div :style="{ width: size, height: size }" class="spinner"></div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ size: string }>()
</script>

<style scoped>
@import '@/assets/base.css';

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
</style>
