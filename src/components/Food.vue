<script lang="ts" setup>
import type { HolidayFood } from '@/types.ts'

defineProps<{ food: HolidayFood }>()
</script>

<template>
  <h1>You should eat a fucking {{ food.food }}.</h1>
  <p v-if="food.region">It’s {{ food.holiday }} today in {{ food.region }}.</p>
  <p v-else>It’s {{ food.holiday }} today.</p>
</template>

<style scoped>
p {
  text-align: center;
}
</style>
