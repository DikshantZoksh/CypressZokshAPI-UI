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
export async function getCustomerEmail() {
  return new Promise((resolve, reject) => {
    getCustomerListTable()
      .find('tr')
      .eq(1)
      .find('td')
      .eq(1)
      .then(($el) => {
        const emailAddress = $el.text();
        cy.log('Customer Email is : ' + emailAddress);
        resolve(emailAddress);
      });
  });
}

// Check if any payee exist in the payee information table
export async function checkIfPayeeExist() {
  getInvoiceLink().click({ force: true, multiple: true });
  cy.url().should('include', '/invoices');

  getCreateInvoiceButton().click({ force: true });
  cy.url().should('include', '/invoices/create');

  // cy.wait(2000);
  cy.get('h1').contains('Create Invoice');
  getSelectPayeeButton().click({ force: true });

  return new Promise((resolve, reject) => {
    getCustomerListTable()
      .find('tr')
      .then((row) => {
        let row_count = row.length;
        if (row_count >= 2) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
  });
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
  getDateIssuedOn().clear();
  getDateIssuedOn().type(invoice.issuedon).should('have.value', invoice.issuedon);
  getDatePaymentDueBy().clear();
  getDatePaymentDueBy().type(invoice.paymentdueby).should('have.value', invoice.paymentdueby);
  getCurrencyDropdown().click({ force: true });
  cy.get('li').contains(invoice.Currency).click({ force: true });
  getDescriptioninput().clear();
  getDescriptioninput().type(invoice.description).should('have.value', invoice.description);
  getQuantity().clear();
  getQuantity().type(invoice.Qty).should('have.value', invoice.Qty);
  getUnitPrice().clear();
  getUnitPrice().type(invoice.unitprice).should('have.value', invoice.unitprice);
  getTaxPercent().clear();
  getTaxPercent().type(invoice.tax).should('have.value', invoice.tax);

  cy.log('Tax %  : ' + invoice.tax);
  cy.log('Quanity : ' + invoice.Qty);
  cy.log('Unit Price : ' + invoice.unitprice);

  let amount_withoutTax = invoice.Qty * invoice.unitprice;
  amount_withoutTax = truncateToDecimals(amount_withoutTax);

  cy.log('Amount without Tax : ' + amount_withoutTax);

  let tax_amount = (invoice.tax / 100) * amount_withoutTax;
  tax_amount = truncateToDecimals(tax_amount);

  cy.log('Tax amount : ' + tax_amount);

  let total_amount = amount_withoutTax + tax_amount;
  total_amount = truncateToDecimals(total_amount);

  cy.log('Total Amount : ' + total_amount);
  getAmtwithoutTax().should('have.value', amount_withoutTax);
  getTaxAmount().should('have.value', tax_amount);
  getTotalAmount().should('have.value', total_amount);
}

//View the last created invoice from the table
export function viewLastCreatedInvoice() {
  cy.get("Table[role='table']").find('tr').eq(1).find('td').eq(5).find('a').click({ force: true });
}

// Get creation date from the last created invoice on the invoice table
export async function getCreationDate() {
  return new Promise((resolve, reject) => {
    cy.get("Table[role='table']")
      .find('tr')
      .eq(1)
      .find('td')
      .eq(0)
      .then(($btn) => {
        const creationDate = $btn.text();
        cy.log('Creation date: ' + creationDate);
        resolve(creationDate);
      });
  });
}

//Get invoice number from the last created invoice on the invoice table
export async function getInvoiceNumber() {
  return new Promise((resolve, reject) => {
    cy.get("Table[role='table']")
      .find('tr')
      .eq(1)
      .find('td')
      .eq(1)
      .then(($btn) => {
        const val = $btn.text();
        resolve(val);
      });
  });
}

//Get client name from the last created invoice on the invoice table
export async function getClientName() {
  return new Promise((resolve, reject) => {
    cy.get("Table[role='table']")
      .find('tr')
      .eq(1)
      .find('td')
      .eq(2)
      .then(($btn) => {
        const clientNameText = $btn.text();
        cy.log('Client name  is : ' + clientNameText);
        resolve(clientNameText);
      });
  });
}

//Get invoice status from the last created invoice on the invoice table
export async function getInvoiceStatus() {
  return new Promise((resolve, reject) => {
    cy.get("Table[role='table']")
      .find('tr')
      .eq(1)
      .find('td')
      .eq(3)
      .then(($btn) => {
        const invoiceStatus = $btn.text();
        cy.log('Invoice  status is : ' + invoiceStatus);
        resolve(invoiceStatus);
      });
  });
}

//Get invoice amount date from the last created invoice on the invoice table
export async function getInvoiceAmount() {
  return new Promise((resolve, reject) => {
    cy.get("Table[role='table']")
      .find('tr')
      .eq(1)
      .find('td')
      .eq(4)
      .then(($btn) => {
        const invoiceAmount = $btn.text();
        cy.log('Invoice amount is : ' + invoiceAmount);
        resolve(invoiceAmount);
      });
  });
}
