import { test as base } from '@playwright/test'
import { FoodPage } from './pages/FoodPage'

interface Fixtures {
  foodPage: FoodPage
}

export const test = base.extend<Fixtures>({
  foodPage: async ({ page }, use) => {
    await use(new FoodPage(page))
  },
})

export { expect } from '@playwright/test'
