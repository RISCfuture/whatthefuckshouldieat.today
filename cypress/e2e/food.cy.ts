describe('App', () => {
  it('loads holidays', () => {
    cy.visit('/')
    cy.contains('h1', /^You should eat a fucking/)
    cy.contains('p', /^It’s/)
  })
})
