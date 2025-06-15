import { describe, expect, it } from 'vitest'
import type {
  DayHoliday,
  DayRangeHoliday,
  HolidayFood,
  MonthHoliday,
  MonthWeekdayHoliday,
  WeekHoliday
} from '@/types.ts'
import {
  addDays,
  addWeeks,
  setDate,
  setDay,
  setMonth,
  startOfDay,
  startOfMonth,
  startOfWeek
} from 'date-fns/fp'
import {
  dayHolidayMatches,
  dayRangeHolidayMatches,
  monthHolidayMatches,
  monthWeekdayHolidayMatches,
  weekHolidayMatches
} from '@/util/dateUtil.ts'
import { flow } from 'lodash-es'

const holiday: HolidayFood = {
  holiday: 'National Programmer Day',
  food: 'cookies'
}

describe('dayHolidayMatches', () => {
  const definition: DayHoliday = {
    month: 10,
    day: 19,
    holiday
  }
  const date = flow(setMonth(9), setDate(19), startOfDay)(new Date())

  it('returns true for a match', () => {
    expect(dayHolidayMatches(definition, date)).toBe(true)
  })

  it('returns false for a non-match', () => {
    expect(dayHolidayMatches(definition, addDays(1, date))).toBe(false)
    expect(dayHolidayMatches(definition, addDays(-1, date))).toBe(false)
  })
})

describe('monthWeekdayHolidayMatches', () => {
  const definition: MonthWeekdayHoliday = {
    month: 10,
    weekInMonth: 2,
    dayOfWeek: 1,
    holiday
  }
  const date = flow(setMonth(9), startOfMonth, startOfWeek, addWeeks(1), setDay(1))(new Date())

  it('returns true for a match', () => {
    expect(monthWeekdayHolidayMatches(definition, date)).toBe(true)
  })

  it('returns false for a non-match', () => {
    expect(monthWeekdayHolidayMatches(definition, addDays(1, date))).toBe(false)
    expect(monthWeekdayHolidayMatches(definition, addDays(-1, date))).toBe(false)
  })
})

describe('dayRangeHolidayMatches', () => {
  const definition: DayRangeHoliday = {
    startMonth: 10,
    startDay: 12,
    endMonth: 10,
    endDay: 19,
    holiday
  }
  const date = flow(setMonth(9), setDate(15), startOfDay)(new Date())

  it('returns true for a match', () => {
    expect(dayRangeHolidayMatches(definition, date)).toBe(true)
    expect(dayRangeHolidayMatches(definition, addDays(1, date))).toBe(true)
    expect(dayRangeHolidayMatches(definition, addDays(-1, date))).toBe(true)
  })

  it('returns false for a non-match', () => {
    expect(dayRangeHolidayMatches(definition, addDays(5, date))).toBe(false)
    expect(dayRangeHolidayMatches(definition, addDays(-5, date))).toBe(false)
  })
})

describe('weekHolidayMatches', () => {
  const definition: WeekHoliday = {
    month: 10,
    week: 2,
    holiday
  }
  const date = flow(setMonth(9), startOfMonth, startOfWeek, addWeeks(1))(new Date())

  it('returns true for a match', () => {
    expect(weekHolidayMatches(definition, date)).toBe(true)
    expect(weekHolidayMatches(definition, addDays(3, date))).toBe(true)
    expect(weekHolidayMatches(definition, addDays(5, date))).toBe(true)
  })

  it('returns false for a non-match', () => {
    expect(weekHolidayMatches(definition, addDays(7, date))).toBe(false)
    expect(weekHolidayMatches(definition, addDays(-7, date))).toBe(false)
  })
})

describe('monthHolidayMatches', () => {
  const definition: MonthHoliday = {
    month: 10,
    holiday
  }
  const date = flow(setMonth(9), startOfMonth, addDays(15))(new Date())

  it('returns true for a match', () => {
    expect(monthHolidayMatches(definition, date)).toBe(true)
    expect(monthHolidayMatches(definition, addDays(10, date))).toBe(true)
    expect(monthHolidayMatches(definition, addDays(-10, date))).toBe(true)
  })

  it('returns false for a non-match', () => {
    expect(monthHolidayMatches(definition, addDays(30, date))).toBe(false)
    expect(monthHolidayMatches(definition, addDays(-30, date))).toBe(false)
  })
})
