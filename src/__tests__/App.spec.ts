import { describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { render, screen } from '@testing-library/vue'
import App from '@/App.vue'
import type { HolidayFile } from '@/types.ts'
import {
  addMonths,
  addWeeks,
  endOfMonth,
  endOfWeek,
  getDate,
  getDay,
  getMonth,
  getWeekOfMonth
} from 'date-fns'

const today = new Date()
const nextMonth = endOfMonth(addMonths(today, 1))
const nextWeek = endOfWeek(addWeeks(today, 1))
const nextNextWeek = endOfWeek(addWeeks(today, 2))
const mockHolidays: HolidayFile = {
  days: [
    [getMonth(today) + 1, getDate(today), 'pizza', 'National Pizza Day'],
    [getMonth(nextMonth) + 1, getDate(nextMonth), 'not pizza', 'National Not Pizza Day']
  ],
  monthDays: [
    [getMonth(today) + 1, getDay(today), getWeekOfMonth(today), 'hot dog', 'National Hot Dog Day'],
    [
      getMonth(nextMonth) + 1,
      getDay(nextMonth),
      getWeekOfMonth(nextMonth),
      'not hot dog',
      'National Not Hot Dog Day'
    ]
  ],
  ranges: [
    [
      getMonth(today) + 1,
      getDate(today),
      getMonth(nextWeek) + 1,
      getDate(nextWeek),
      'cookie',
      'National Cookie Period'
    ],
    [
      getMonth(nextWeek) + 1,
      getDate(nextWeek),
      getMonth(nextNextWeek) + 1,
      getDate(nextNextWeek),
      'not cookie',
      'National Cookie Period'
    ]
  ],
  monthWeeks: [
    [getMonth(today) + 1, getWeekOfMonth(today), 'taco', 'National Taco Week'],
    [getMonth(nextWeek) + 1, getWeekOfMonth(nextWeek), 'not taco', 'National Not Taco Week']
  ],
  months: [
    [getMonth(today) + 1, 'stir fry', 'National Stir Fry Month'],
    [getMonth(nextMonth) + 1, 'not stir fry', 'National Not Stir Fry Month']
  ]
}

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockHolidays)
  })
) as unknown as typeof fetch

describe('App.vue', () => {
  it('loads foods and selects one at random', async () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false
    })

    render(App, {
      global: {
        plugins: [pinia]
      }
    })

    // Should always find a food since mock data guarantees today's date has holidays
    expect(await screen.findByText(/^You should eat a fucking/)).toBeTruthy()
    expect(await screen.findByText(/It’s/)).toBeTruthy()
  })
})
