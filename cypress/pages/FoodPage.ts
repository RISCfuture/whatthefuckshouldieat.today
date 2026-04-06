import { BasePage } from './BasePage'

export class FoodPage extends BasePage {
  open(): this {
    return this.visit('/')
  }

  getHeading(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByRole('heading', { level: 1 })
  }

  getHolidayDescription(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByText(/^It\u2019s/)
  }
}
