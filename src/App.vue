<script lang="ts" setup>
import { sample } from 'lodash-es'
import holidayFile from '@/data/holidays.json'
import { holidayFileSchema } from '@/types.ts'
import { useHolidaysStore } from '@/stores/holidays.ts'
import Food from '@/components/Food.vue'
import Uhoh from '@/components/Uhoh.vue'
import NoFood from '@/components/NoFood.vue'

const holidaysStore = useHolidaysStore()

const holidays = holidayFileSchema.safeParse(holidayFile)
if (holidays.success) holidaysStore.loadHolidays(holidays.data)

const food = holidays.success ? (sample(holidaysStore.holidaysToday) ?? null) : null
</script>

<template>
  <Food v-if="food" :food="food" />
  <Uhoh v-else-if="!holidays.success" :error="holidays.error" />
  <NoFood v-else />
</template>
