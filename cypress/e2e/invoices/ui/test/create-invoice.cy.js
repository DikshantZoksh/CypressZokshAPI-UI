// <reference types = "Cypress" />

const invoicefun = require('../../functions/invoice.create');

let customerEmail = '';
let creationText = '';
let invoiceNumber = '';
let clientName = '';
let statusText = '';
let amountVal = null;

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

describe('Create and view the invoice', async () => {
  it('Create invoice', async () => {
    let payeeExists;

    loginDashboard();
    payeeExists = await checkIfPayeeExist();
    customerEmail = await getCustomerEmail();
    selectFirstCustomer();
    setInvoiceDetails();
    getGenerateInvoiceButton().click({ force: true });
  });

  it('View invoice', async () => {
    getInvoiceLink().click({ force: true, multiple: true });

    const invoiceTbl = cy.get("Table[role='table']");
    if (invoiceTbl.should('exist')) {
      creationText = await getCreationDate();

      invoiceNumber = await getInvoiceNumber();
      cy.log(`Invoice number fetched from table : ${invoiceNumber}`);

      clientName = await getClientName();
      statusText = await getInvoiceStatus();
      amountVal = await getInvoiceAmount();

      if (expect(clientName).to.contains(customerEmail)) {
        cy.log('Condtion is True');
        viewLastCreatedInvoice();
      }
    }
  });

  // it('Invoice validation ', () => {
  //   cy.url().should('include', '/read');
  //   // getInvoiceNum().should('have.text', invoiceNumber);
  // });
});
