
Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    cacheSession = true
) => {
    const login = () => {
        cy.visit('/users/sign_in')

        cy.get('#user_login').type(user)
        cy.get('#user_password').type(password, { log: false })
        cy.get('[data-qa-selector="sign_in_button"]').click()
    }

    const validate = () => {
        cy.visit('/')
        cy.location('pathname', { timeout: 1000 })
            .should('not.eq', '/users/sign_in')
    }

    const options = {
        cacheAcrossSpecs: true,
        validate,
    }

    if (cacheSession)
        cy.session(user, login, options)
    else
        login()
})

Cypress.Commands.add('logout', () => {

    const logout = () => {
        cy.get('[data-qa-selector="user_menu"]').click()
        cy.get('[data-qa-selector="sign_out_link"]').click()
    }

    logout()
})

Cypress.Commands.add('gui_createProject', (project) => {
    cy.visit('/projects/new')

    cy.get('#project_name').type(project.name)
    cy.get('#project_description').type(project.description)

    cy.get('.qa-initialize-with-readme-checkbox').check()
    cy.contains('Create project').click()
})


Cypress.Commands.add('gui_createIssue', (issue) => {
    cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues`)

    cy.get('#new_issue_link').click()
    cy.get('.qa-issuable-form-title').type(issue.title)
    cy.get('.qa-issuable-form-description').type(issue.description)

    cy.get('.qa-issuable-create-button').click()
})
