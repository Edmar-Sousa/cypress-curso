
describe('Login', () => {
  it('Successfully', () => {
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    const cacheSession = false

    cy.login(user, password, cacheSession)
    cy.get('.qa-user-avatar').should('be.visible')
  })
})
