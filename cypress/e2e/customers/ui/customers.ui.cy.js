/// <reference types = "Cypress" />

const cred = require('./test-data/credentials.test-data');

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
  getLogoutButton,
  getButtonUpdate,
  getAddressInput,
} from '../../../support/object-repo';

describe('Validate customer scenarios ', () => {
  let usremail = '';
  let firstname = '';
  let updatedname = '';
  let addrss = '';
  let rndx = Math.floor(Math.random() * 100 + 1);
  usremail = 'TestQA_' + rndx + '@gmail.com';
  firstname = 'RockQA' + rndx;
  let Compname = 'Zoksh';
  updatedname = 'update_' + firstname;
  addrss = 'RockQA_zoksh';

  before(() => {
    cy.visit(cred.app_url);
  });

  it('TC01 : Login to Zoksh Dashboard', () => {
    getEmailLogin().type(cred.username).should('have.value', cred.username);
    getPasswordLogin().type(cred.password).should('have.value', cred.password);
    getButtonLogin().click();
    cy.url().should('include', '/dashboard');
  });

  it('TC02 : Create a new customer and verify the customer details', () => {
    getInvoiceLink().click({ force: true });
    cy.url().should('include', '/invoices');
    getCreateInvoiceButton().click({ force: true });
    cy.url().should('include', '/invoices/create');
    cy.wait(2000);
    cy.get('h1').contains('Create Invoice');
    getSelectPayeeButton().click({ force: true });
    getAddPayeeButton().should('be.visible', true);
    getAddPayeeButton().click({ force: true });
    getEmailField().type(usremail).should('have.value', usremail);
    getFirstNameField().type(firstname).should('have.value', firstname);
    getButtonSubmit().should('be.enabled', true);
    getMoredetailsButton().should('be.visible', true);
    getMoredetailsButton().click({ force: true });
    getAddressInput().type(addrss).should('have.value', addrss);
    getButtonSubmit().should('be.enabled', true);
    getButtonSubmit().click({ force: true });
    getCustomerListTable()
      .find('tr')
      .then((row) => {
        cy.log(row.length);
        row.toArray().forEach((element) => {
          if (element.innerHTML.includes(usremail)) {
            cy.log(row.index(element));
            getCustomerListTable()
              .find('tr')
              .eq(row.index(element))
              .find('td')
              .eq(0)
              .then(function (col) {
                const strname = col.text();
                expect(strname).to.contains(firstname);
                getCloseButton().click({ force: true });
              });
          }
        });
      });
  });

  it('TC03 : Update the customer information and verify the details after update', () => {
    getInvoiceLink().click({ force: true });
    cy.url().should('include', '/invoices');
    getCreateInvoiceButton().click({ force: true });
    cy.url().should('include', '/invoices/create');
    cy.wait(2000);
    cy.get('h1').contains('Create Invoice');
    getSelectPayeeButton().click({ force: true });
    getCustomerListTable()
      .find('tr')
      .then((row) => {
        cy.log('Table row before updation : ' + row.length);
        row.toArray().forEach((element) => {
          if (element.innerHTML.includes(usremail)) {
            cy.log('Row index for the searched item - ' + row.index(element));
            const updatebtn = getCustomerListTable()
              .find('tr')
              .eq(row.index(element))
              .find('td')
              .eq(3)
              .find("button[aria-label='Edit Payee']");
            updatebtn.click({ force: true });
            getMoredetailsButton().should('be.visible', true);
            getMoredetailsButton().click({ force: true });
            getFirstNameField().clear();
            getFirstNameField().type(updatedname).should('have.value', updatedname);
            getButtonUpdate().should('be.enabled', true);
            getButtonUpdate().click({ force: true });
            getCustomerListTable()
              .find('tr')
              .then((nrow) => {
                cy.log('Table row after updation ' + nrow.length);
                nrow.toArray().forEach((el) => {
                  if (el.innerHTML.includes(usremail)) {
                    cy.log('Row index for the searched item after update ' + nrow.index(el));
                    getCustomerListTable()
                      .find('tr')
                      .eq(nrow.index(element))
                      .find('td')
                      .eq(0)
                      .then(function (coln) {
                        expect(coln.text()).to.be.equal(updatedname);
                        getCloseButton().click({ force: true });
                      });
                  }
                });
              });
          }
        });
      });
  });

  it('TC04 : Delete the customer and verify after deletion', () => {
    getInvoiceLink().click({ force: true });
    cy.url().should('include', '/invoices');
    getCreateInvoiceButton().click({ force: true });
    cy.url().should('include', '/invoices/create');
    cy.wait(2000);
    cy.get('h1').contains('Create Invoice');
    getSelectPayeeButton().click({ force: true });
    getCustomerListTable()
      .find('tr')
      .then((row) => {
        cy.log('Table row before deletion : ' + row.length);
        row.toArray().forEach((element) => {
          if (element.innerHTML.includes(usremail)) {
            cy.log('Row index for the deleted item - ' + row.index(element));
            const deletebtn = getCustomerListTable()
              .find('tr')
              .eq(row.index(element))
              .find('td')
              .eq(3)
              .find("button[aria-label='Delete Payee']");
            deletebtn.click({ force: true });
            cy.wait(2000);
            getCustomerListTable()
              .find('tr')
              .then((xrow) => {
                cy.log('Table row after deletion ' + xrow.length);
                xrow.toArray().forEach((els) => {
                  if (els.innerHTML.includes(usremail)) {
                    assert.isFalse((row.length = xrow.length), "Deletion didn't happen");
                  } else {
                    assert.isTrue(
                      row.length > xrow.length,
                      'Customer with email : ' + usremail + ' got successfully deleted'
                    );
                  }
                });
              });
          }
        });
      });
  });

  after(() => {
    getProfileButton().click({ force: true });
    getLogoutButton().click({ force: true });
    cy.url().should('include', '/auth');
  });
});
