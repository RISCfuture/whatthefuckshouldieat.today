import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type {
  DayHoliday,
  DayRangeHoliday,
  HolidayFile,
  HolidayFood,
  MonthHoliday,
  MonthWeekdayHoliday,
  WeekHoliday,
} from '@/types.ts'
import {
  dayHolidayMatches,
  dayRangeHolidayMatches,
  monthHolidayMatches,
  monthWeekdayHolidayMatches,
  weekHolidayMatches,
} from '@/util/dateUtil.ts'

export const useHolidaysStore = defineStore('holidays', () => {
  const dayHolidays = ref<DayHoliday[]>([])
  const monthWeekdayHolidays = ref<MonthWeekdayHoliday[]>([])
  const dayRangeHolidays = ref<DayRangeHoliday[]>([])
  const weekHolidays = ref<WeekHoliday[]>([])
  const monthHolidays = ref<MonthHoliday[]>([])

  const holidaysToday = computed<HolidayFood[]>(() => {
    const date = new Date()
    return [
      ...dayHolidays.value.filter((h) => dayHolidayMatches(h, date)).map((h) => h.holiday),
      ...monthWeekdayHolidays.value
        .filter((h) => monthWeekdayHolidayMatches(h, date))
        .map((h) => h.holiday),
      ...dayRangeHolidays.value
        .filter((h) => dayRangeHolidayMatches(h, date))
        .map((h) => h.holiday),
      ...weekHolidays.value.filter((h) => weekHolidayMatches(h, date)).map((h) => h.holiday),
      ...monthHolidays.value.filter((h) => monthHolidayMatches(h, date)).map((h) => h.holiday),
    ]
  })

  function loadHolidays(data: HolidayFile) {
    dayHolidays.value = data.days.map(([month, day, food, holiday, region]) => ({
      month,
      day,
      holiday: { food, holiday, region },
    }))

    monthWeekdayHolidays.value = data.monthDays.map(
      ([month, dayOfWeek, weekInMonth, food, holiday, region]) => ({
        month,
        dayOfWeek,
        weekInMonth,
        holiday: { food, holiday, region },
      }),
    )

    dayRangeHolidays.value = data.ranges.map(
      ([startMonth, startDay, endMonth, endDay, food, holiday, region]) => ({
        startMonth,
        startDay,
        endMonth,
        endDay,
        holiday: { food, holiday, region },
      }),
    )

    weekHolidays.value = data.monthWeeks.map(([month, week, food, holiday, region]) => ({
      month,
      week,
      holiday: { food, holiday, region },
    }))

    monthHolidays.value = data.months.map(([month, food, holiday, region]) => ({
      month,
      holiday: { food, holiday, region },
    }))
  }

  return { holidaysToday, loadHolidays }
})
