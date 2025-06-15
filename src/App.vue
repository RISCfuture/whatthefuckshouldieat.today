<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import { holidayFileSchema, type HolidayFood } from '@/types.ts'
import { useHolidaysStore } from '@/stores/holidays.ts'
import Spinner from '@/components/Spinner.vue'
import Food from '@/components/Food.vue'
import { sample } from 'lodash-es'
import Uhoh from '@/components/Uhoh.vue'
import NoFood from '@/components/NoFood.vue'

const isLoading = ref(true)
const error = ref<unknown | null>(null)
const food = ref<HolidayFood | null>(null)

const holidaysStore = useHolidaysStore()

onMounted(async () => {
  try {
    isLoading.value = true
    const response = await fetch('/whatthefuckshouldieat.today/holidays.json')
    const data = await response.json()
    const parsed = holidayFileSchema.safeParse(data)
    if (parsed.success) {
      holidaysStore.loadHolidays(parsed.data)
      await nextTick()
      const todaysHolidays = holidaysStore.holidaysToday
      food.value = sample(todaysHolidays) || null
      isLoading.value = false
    } else {
      error.value = parsed.error
      isLoading.value = false
    }
  } catch (err) {
    error.value = err
    isLoading.value = false
  }
})
</script>

<template>
  <Food v-if="food" :food="food" />
  <Uhoh v-else-if="error" :error="error" />
  <Spinner v-else-if="isLoading" size="10rem" />
  <NoFood v-else />
</template>
