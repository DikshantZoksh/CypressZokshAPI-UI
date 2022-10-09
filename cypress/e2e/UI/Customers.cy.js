/// <reference types = "Cypress" />

import {
    getEmailLogin,
    getPasswordLogin,
    getButtonLogin,
    getInvoiceLink,
    getCreateInvoiceButton,
    getSelectPayeeButton,
    getCustomerListTable,
    getEmailField,
    getCloseButton,
    getAddPayeeButton,
    getCompanyField,
    getMoredetailsButton,
    getFirstNameField,
    getButtonSubmit,
    getProfileButton,
    getLogoutButton

} from '../../support/objectrepo'

describe("Customers creation and updation on UI", () => {

    before(() => {
        cy.visit("https://app.testnet.zoksh.com/")
    })

    it('Login to Zoksh Dashboard', () => {

        getEmailLogin().type('dikshant.agarwal@moopay.live').should('have.value', 'dikshant.agarwal@moopay.live')
        getPasswordLogin().type('test@123').should('have.value', 'test@123')
        getButtonLogin().click()
        cy.url().should('include', '/dashboard')

    })

    it('Create a new customer and verify the customer details',() => {
        getInvoiceLink().click({ force: true })
        cy.url().should('include', '/invoices')
        getCreateInvoiceButton().click({ force: true })
        cy.url().should('include', '/invoices/create')
        cy.wait(2000)
        cy.get('h1').contains('Create Invoice')
        getSelectPayeeButton().click({ force: true })
        getCustomerListTable().should('be.visible', true)
        getAddPayeeButton().should('be.visible',true)
        getAddPayeeButton().click({ force: true })
        getEmailField().type('Mark@gmail.com').should('have.value','Mark@gmail.com')
        getButtonLogin().should('be.enabled',true)
        getCompanyField().type('ZokshQA').should('have.value','ZokshQA')
        getMoredetailsButton().should('be.visible',true)
        getMoredetailsButton().click({ force: true })
        getFirstNameField().type('rockyQA').should('have.value','rockyQA')
        getButtonSubmit().should('be.enabled',true)
        getButtonSubmit().click({ force: true })
        getCustomerListTable().should('be.visible', true)
        getCustomerListTable().find('tr').then((row) => {
            cy.log(row.length)
            row.toArray().forEach((element) => {
                if (element.innerHTML.includes("Mark@gmail.com")) {
                    cy.log(row.index(element))
                    getCustomerListTable().find('tr').eq(row.index(element)).find('td').eq(0).then(function (col) {
                        const strname = col.text()
                        expect(strname).to.contains('rockyQA')
                        getCloseButton().click({ force: true })
                    
                    })
                }
            })
        })
    })
    after(() => {
        getProfileButton().click({force:true})
        getLogoutButton().click({force:true})
        cy.url().should('include','/auth')
    })

})