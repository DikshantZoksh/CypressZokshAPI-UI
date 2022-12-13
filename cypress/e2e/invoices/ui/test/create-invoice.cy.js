// <reference types = "Cypress" />

const invoicefun = require('../../functions/invoice.create');

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
} from '../../functions/invoice.create';

import {
  getGenerateInvoiceButton,
  getInvoiceLink,
  getInvoiceNum,
  getIssuedOnDate,
  getPaymentDueDate,
} from '../../../../support/object-repo';

let  invoiceNumber = 0;

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

    // wait for the generate invoice request to complete
    cy.wait(4500);

    getInvoiceLink().click({ force: true, multiple: true });

    const invoiceTbl = cy.get("Table[role='table']");
    if (invoiceTbl.should('exist')) {
      getCreationDate();
      getInvoiceNumber();
      getClientName();
      getInvoiceStatus();
      getInvoiceAmount();
      //invoiceNumber = cy.get('@invoiceNumber')
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
});
