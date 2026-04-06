import { type Locator, type Page } from '@playwright/test'

export class FoodPage {
  private readonly heading: Locator
  private readonly holidayDescription: Locator

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { level: 1 })
    this.holidayDescription = page.getByText(/^It\u2019s/)
  }

  async open() {
    await this.page.goto('/')
  }

  getHeading() {
    return this.heading
  }

  getHolidayDescription() {
    return this.holidayDescription
  }
}
