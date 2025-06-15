import type {
  DayHoliday,
  DayRangeHoliday,
  MonthHoliday,
  MonthWeekdayHoliday,
  WeekHoliday
} from '@/types.ts'
import {
  endOfDay,
  getDate,
  getDay,
  getMonth,
  getWeekOfMonth,
  isWithinInterval,
  set,
  startOfDay
} from 'date-fns'

export function dayHolidayMatches(holiday: DayHoliday, date: Date): boolean {
  return getMonth(date) + 1 === holiday.month && getDate(date) === holiday.day
}

export function monthWeekdayHolidayMatches(holiday: MonthWeekdayHoliday, date: Date): boolean {
  return (
    getMonth(date) + 1 === holiday.month &&
    getDay(date) === holiday.dayOfWeek &&
    getWeekOfMonth(date) === holiday.weekInMonth
  )
}

export function dayRangeHolidayMatches(holiday: DayRangeHoliday, date: Date): boolean {
  const start = startOfDay(
    set(new Date(), {
      month: holiday.startMonth - 1,
      date: holiday.startDay
    })
  )
  const end = endOfDay(
    set(new Date(), {
      month: holiday.endMonth - 1,
      date: holiday.endDay
    })
  )

  return isWithinInterval(date, { start, end })
}

export function weekHolidayMatches(holiday: WeekHoliday, date: Date): boolean {
  return getMonth(date) + 1 === holiday.month && getWeekOfMonth(date) === holiday.week
}

export function monthHolidayMatches(holiday: MonthHoliday, date: Date): boolean {
  return getMonth(date) + 1 === holiday.month
}
