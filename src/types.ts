import * as z from 'zod/v4-mini'

export interface HolidayFood {
  food: string
  holiday: string
  region?: string
}

export interface DayHoliday {
  month: number
  day: number
  holiday: HolidayFood
}

export interface MonthWeekdayHoliday {
  month: number
  dayOfWeek: number
  weekInMonth: number
  holiday: HolidayFood
}

export interface DayRangeHoliday {
  startMonth: number
  startDay: number
  endMonth: number
  endDay: number
  holiday: HolidayFood
}

export interface WeekHoliday {
  month: number
  week: number
  holiday: HolidayFood
}

export interface MonthHoliday {
  month: number
  holiday: HolidayFood
}

const monthSchema = z.int().check(z.minimum(1), z.maximum(12))
const daySchema = z.int().check(z.minimum(1), z.maximum(31))
const weekSchema = z.int().check(z.minimum(1), z.maximum(6))
const weekdaySchema = z.int().check(z.minimum(0), z.maximum(7))
const stringSchema = z.string().check(z.minLength(1))
const optionalSchema = z.optional(z.string().check(z.minLength(1)))
const dayHolidays = z.tuple([monthSchema, daySchema, stringSchema, stringSchema, optionalSchema])
const monthWeekdayHolidays = z.tuple([
  monthSchema,
  weekdaySchema,
  weekSchema,
  stringSchema,
  stringSchema,
  optionalSchema,
])
const dayRangeHolidays = z.tuple([
  monthSchema,
  daySchema,
  monthSchema,
  daySchema,
  stringSchema,
  stringSchema,
  optionalSchema,
])
const weekHolidays = z.tuple([monthSchema, weekSchema, stringSchema, stringSchema, optionalSchema])
const monthHolidays = z.tuple([monthSchema, stringSchema, stringSchema, optionalSchema])

export const holidayFileSchema = z.strictObject({
  days: z.array(dayHolidays),
  monthDays: z.array(monthWeekdayHolidays),
  ranges: z.array(dayRangeHolidays),
  monthWeeks: z.array(weekHolidays),
  months: z.array(monthHolidays),
})

export type HolidayFile = z.output<typeof holidayFileSchema>
