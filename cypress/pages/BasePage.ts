export class BasePage {
  protected wrap(_chainable: Cypress.Chainable): this {
    return this
  }

  visit(path: string): this {
    return this.wrap(cy.visit(path))
  }
}
