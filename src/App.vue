<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useFetch } from '@vueuse/core'
import { holidayFileSchema, type HolidayFood } from '@/types.ts'
import { useHolidaysStore } from '@/stores/holidays.ts'
import Spinner from '@/components/Spinner.vue'
import Food from '@/components/Food.vue'
import { sample } from 'lodash-es'
import Uhoh from '@/components/Uhoh.vue'
import NoFood from '@/components/NoFood.vue'

const food = ref<HolidayFood | null>(null)
const validationError = ref<unknown>(null)
const holidaysStore = useHolidaysStore()

const { isFetching, error, data } = useFetch('/whatthefuckshouldieat.today/holidays.json').json<unknown>()

watch(data, (raw) => {
  if (raw === null) return
  const parsed = holidayFileSchema.safeParse(raw)
  if (parsed.success) {
    holidaysStore.loadHolidays(parsed.data)
    food.value = sample(holidaysStore.holidaysToday) ?? null
  } else {
    validationError.value = parsed.error
  }
})

const displayError = computed<unknown>(() => error.value ?? validationError.value)
</script>

<template>
  <Food v-if="food" :food="food" />
  <Uhoh v-else-if="displayError" :error="displayError" />
  <Spinner v-else-if="isFetching" size="10rem" />
  <NoFood v-else />
</template>
