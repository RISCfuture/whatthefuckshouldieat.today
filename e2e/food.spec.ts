import { expect, test } from './fixtures'

test.describe('App', () => {
  test('loads holidays', async ({ foodPage }) => {
    await foodPage.open()

    await expect(foodPage.getHeading()).toContainText('You should eat a fucking')
    await expect(foodPage.getHolidayDescription()).toBeVisible()
  })
})
