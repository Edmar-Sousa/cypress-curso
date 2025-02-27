Cypress.Commands.add('cloneViaSSH', (project) => {
    const domain = Cypress.config('baseUrl')
    const user = Cypress.env('user_name')

    cy.exec(`cd cypress/downloads/ && git clone ${domain}/${user}/${project.name}.git`)
})

