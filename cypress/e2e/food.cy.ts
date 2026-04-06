import { FoodPage } from '../pages/FoodPage'

describe('App', () => {
  const foodPage = new FoodPage()

  it('loads holidays', () => {
    foodPage.open()

    foodPage.getHeading().should('contain.text', 'You should eat a fucking')
    foodPage.getHolidayDescription().should('exist')
  })
})
