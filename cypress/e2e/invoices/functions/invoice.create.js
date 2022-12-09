// <reference types = "Cypress" />

const credentials = require('../ui/test-data/credentials.test-data');

const invoice = require('../ui/test-data/invoice.create.test-data');
const { truncateToDecimals } = require('../../../support/lib');

import {
  getEmailLogin,
  getPasswordLogin,
  getButtonLogin,
  getInvoiceLink,
  getCreateInvoiceButton,
  getCurrencyDropdown,
  getDescriptioninput,
  getQuantity,
  getUnitPrice,
  getTaxPercent,
  getAmtwithoutTax,
  getTaxAmount,
  getTotalAmount,
  // getGenerateInvoiceButton,
  getSelectPayeeButton,
  getCustomerListTable,
  getDateIssuedOn,
  getDatePaymentDueBy,
} from '../../../support/object-repo';

// Get customer email from the customer table
export function getCustomerEmail() {
  getCustomerListTable()
    .find('tr')
    .eq(1)
    .find('td')
    .eq(1)
    .then(($el) => {
      const emailAddress = $el.text();
      cy.log('Customer Email is : ' + emailAddress);
      cy.wrap(emailAddress).as('customerEmailAddress');
    });
}

// Check if any payee exist in the payee information table
export function checkIfPayeeExist() {
  getInvoiceLink().click({ force: true, multiple: true });
  cy.url().should('include', '/invoices');

  getCreateInvoiceButton().click({ force: true });
  cy.url().should('include', '/invoices/create');

  // cy.wait(2000);
  cy.get('h1').contains('Create Invoice');
  getSelectPayeeButton().click({ force: true });

  getCustomerListTable()
    .find('tr')
    .then((row) => {
      return row.length;
    })
    .should('be.gte', 2);
}

// Login to the DashBoard
export function loginDashboard() {
  const { app_url, username, password } = credentials;

  cy.visit(app_url);

  getEmailLogin().type(username).should('have.value', username);
  getPasswordLogin().type(password).should('have.value', password);
  getButtonLogin().click();

  cy.url().should('include', '/dashboard');
}

//Select the first customer from the table
export function selectFirstCustomer() {
  getCustomerListTable()
    .find('tr')
    .eq(1)
    .find('td')
    .eq(3)
    .find("button[aria-label='Select Payee']")
    .click({ force: true });
}

// Fill invoice details
export function setInvoiceDetails() {
  // set date issued on
  getDateIssuedOn().clear();
  getDateIssuedOn().type(invoice.issuedOn).should('have.value', invoice.issuedOn);

  // set payment due date
  getDatePaymentDueBy().clear();
  getDatePaymentDueBy().type(invoice.paymentDueBy).should('have.value', invoice.paymentDueBy);

  // set currency
  getCurrencyDropdown().click({ force: true });
  cy.get('li').contains(invoice.currency).click({ force: true });

  // set description
  getDescriptioninput().clear();
  getDescriptioninput().type(invoice.description).should('have.value', invoice.description);

  // set quantity
  getQuantity().clear();
  getQuantity().type(invoice.quantity).should('have.value', invoice.quantity);

  // set unit price
  getUnitPrice().clear();
  getUnitPrice().type(invoice.unitPrice).should('have.value', invoice.unitPrice);

  // set tax percent
  getTaxPercent().clear();
  getTaxPercent().type(invoice.tax).should('have.value', invoice.tax);

  // log values
  cy.log('Tax %  : ' + invoice.tax);
  cy.log('Quanity : ' + invoice.quantity);
  cy.log('Unit Price : ' + invoice.unitPrice);

  let amountWithoutTax = invoice.quantity * invoice.unitPrice;
  amountWithoutTax = truncateToDecimals(amountWithoutTax);

  cy.log('Amount without Tax : ' + amountWithoutTax);

  let taxAmount = (invoice.tax / 100) * amountWithoutTax;
  taxAmount = truncateToDecimals(taxAmount);

  cy.log('Tax amount : ' + taxAmount);

  let totalAmount = amountWithoutTax + taxAmount;
  totalAmount = truncateToDecimals(totalAmount);
  cy.log('Total Amount : ' + totalAmount);

  getAmtwithoutTax().should('have.value', amountWithoutTax);
  getTaxAmount().should('have.value', taxAmount);
  getTotalAmount().should('have.value', totalAmount);
}

//View the last created invoice from the table
export function viewLastCreatedInvoice() {
  cy.get("Table[role='table']").find('tr').eq(1).find('td').eq(5).find('a').click({ force: true });
}

// Get creation date from the last created invoice on the invoice table
export function getCreationDate() {
  cy.get("Table[role='table']")
    .find('tr')
    .eq(1)
    .find('td')
    .eq(0)
    .then(($btn) => {
      const creationDate = $btn.text();
      cy.log('Creation date: ' + creationDate);
      cy.wrap(creationDate).as('invoiceCreationDate');
    });
}

//Get invoice number from the last created invoice on the invoice table
export function getInvoiceNumber() {
  cy.get("Table[role='table']")
    .find('tr')
    .eq(1)
    .find('td')
    .eq(1)
    .then(($btn) => {
      const invoiceNumber = $btn.text();
      cy.log('Invoice Number: ' + invoiceNumber);
      cy.wrap(invoiceNumber).as('invoiceNumber');
    });
}

//Get client name from the last created invoice on the invoice table
export function getClientName() {
  cy.get("Table[role='table']")
    .find('tr')
    .eq(1)
    .find('td')
    .eq(2)
    .then(($btn) => {
      const clientNameText = $btn.text();
      cy.log('Client name  is : ' + clientNameText);
      cy.wrap(clientNameText).as('invoiceClientName');
    });
}

//Get invoice status from the last created invoice on the invoice table
export function getInvoiceStatus() {
  cy.get("Table[role='table']")
    .find('tr')
    .eq(1)
    .find('td')
    .eq(3)
    .then(($btn) => {
      const invoiceStatus = $btn.text();
      cy.log('Invoice  status is : ' + invoiceStatus);
      cy.wrap(invoiceStatus).as('invoiceStatus');
    });
}

//Get invoice amount date from the last created invoice on the invoice table
export async function getInvoiceAmount() {
  cy.get("Table[role='table']")
    .find('tr')
    .eq(1)
    .find('td')
    .eq(4)
    .then(($btn) => {
      const invoiceAmount = $btn.text();
      cy.log('Invoice amount is : ' + invoiceAmount);
      cy.wrap(invoiceAmount).as('invoiceAmount');
    });
}
