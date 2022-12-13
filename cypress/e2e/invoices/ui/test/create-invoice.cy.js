/// <reference types = "Cypress" />


import {
  loginDashboard,
  selectFirstCustomer,
  setInvoiceDetails,
  checkIfPayeeExist,
  viewLastCreatedInvoice,
  getCreationDate,
  getInvoiceNumber,
  getClientName,
  getInvoiceStatus,
  getInvoiceAmount,
  getCustomerEmail,
  cancelLastCreatedInvoice
} from '../../functions/invoice.create';

import {
  getGenerateInvoiceButton,
  getInvoiceLink,
  getInvoiceNum,
  getIssuedOnDate,
  getPaymentDueDate,
} from '../../../../support/object-repo';

describe('Invoice Creation', () => {
  before(() => {
    loginDashboard();
  });

  it('Create and view the invoice', () => {
    checkIfPayeeExist();
    getCustomerEmail();
    selectFirstCustomer();
    setInvoiceDetails();
    getGenerateInvoiceButton().click({ force: true });
    cy.wait(4500);
    getInvoiceLink().click({ force: true, multiple: true });
    const invoiceTbl = cy.get("Table[role='table']");
    if (invoiceTbl.should('exist')) {
      getCreationDate();
      getInvoiceNumber();
      getClientName();
      getInvoiceStatus();
      getInvoiceAmount();
      cy.get('@invoiceClientName').then((clientName) => {
        cy.get('@customerEmailAddress').then((emailAddress) => {
          expect(clientName).to.contains(emailAddress);
          viewLastCreatedInvoice();
        });
      });
      cy.get('@invoiceNumber').then((invoicenumber) => {
        getInvoiceNum().should('have.text',invoicenumber)
      });
    }
  });

  it('Cancel the view and validate', () => {
    checkIfPayeeExist();
    getCustomerEmail();
    selectFirstCustomer();
    setInvoiceDetails();
    getGenerateInvoiceButton().click({ force: true });
    cy.wait(4500);
    getInvoiceLink().click({ force: true, multiple: true });
    const invoiceTbl = cy.get("Table[role='table']");
    if (invoiceTbl.should('exist')) {
      getCreationDate();
      getInvoiceNumber();
      getClientName();
      getInvoiceStatus();
      getInvoiceAmount();
      cy.get('@invoiceClientName').then((clientName) => {
        cy.get('@customerEmailAddress').then((emailAddress) => {
          expect(clientName).to.contains(emailAddress);
          cancelLastCreatedInvoice();
        });
      });
      cy.wait(4000);
      getInvoiceStatus();
      cy.get('@invoiceStatus').then((invoiceStatus) => {
        expect(invoiceStatus).to.be.eql('CANCELLED')
      });
    }
  });




});
