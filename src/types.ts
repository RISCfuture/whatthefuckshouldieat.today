import { z } from 'zod/v4'

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

const monthSchema = z.number().int().min(1).max(12)
const daySchema = z.number().int().min(1).max(31)
const weekSchema = z.number().int().min(1).max(6)
const weekdaySchema = z.number().int().min(0).max(7)
const stringSchema = z.string().min(1)
const optionalSchema = z.string().min(1).optional()
const dayHolidays = z.tuple([monthSchema, daySchema, stringSchema, stringSchema, optionalSchema])
const monthWeekdayHolidays = z.tuple([
  monthSchema,
  weekdaySchema,
  weekSchema,
  stringSchema,
  stringSchema,
  optionalSchema
])
const dayRangeHolidays = z.tuple([
  monthSchema,
  daySchema,
  monthSchema,
  daySchema,
  stringSchema,
  stringSchema,
  optionalSchema
])
const weekHolidays = z.tuple([monthSchema, weekSchema, stringSchema, stringSchema, optionalSchema])
const monthHolidays = z.tuple([monthSchema, stringSchema, stringSchema, optionalSchema])

export const holidayFileSchema = z.strictObject({
  days: z.array(dayHolidays),
  monthDays: z.array(monthWeekdayHolidays),
  ranges: z.array(dayRangeHolidays),
  monthWeeks: z.array(weekHolidays),
  months: z.array(monthHolidays)
})

export type HolidayFile = z.output<typeof holidayFileSchema>
