/// <reference types = "Cypress" />

const cred = require('../test-data/credentials.test-data');
const invoiceval = require('../test-data/invoice-calculation.test-data');

const { truncateToDecimals } = require('../../../../support/lib');

import {
  getEmailLogin,
  getPasswordLogin,
  getButtonLogin,
  getInvoiceLink,
  getCreateInvoiceButton,
  getcurrencydropdown,
  getDescriptioninput,
  getQuantity,
  getunitprice,
  gettaxpercent,
  getAmtwithoutTax,
  getTaxAmount,
  getTotalAmount,
  getAddItemButton,
} from '../../../../support/object-repo';

describe("Validate Amount and Tax for multiple scenario's", () => {
  let count = 0;

  before(() => {
    cy.log(invoiceval.length);
    cy.visit(cred.app_url);
    getEmailLogin().type(cred.username).should('have.value', cred.username);
    getPasswordLogin().type(cred.password).should('have.value', cred.password);
    getButtonLogin().click();
    cy.url().should('include', '/dashboard');
  });

  beforeEach(() => {
    console.log('BeforeEach Hook started :' + count);
    count = count + 1;
  });

  it('TC01- Currency = EUR , Qnty = 1, unitprice = 1 , Tax = 0', () => {
    getInvoiceLink().click({ force: true });
    cy.url().should('include', '/invoices');
    getCreateInvoiceButton().click({ force: true });
    cy.url().should('include', '/invoices/create');
    cy.wait(2000);
    cy.get('h1').contains('Create Invoice');
    getcurrencydropdown().click({ force: true });

    cy.get('li')
      .contains(invoiceval[count - 1].Currency)
      .click({ force: true });
    getDescriptioninput().clear();
    getDescriptioninput()
      .type(invoiceval[count - 1].description)
      .should('have.value', invoiceval[count - 1].description);
    getQuantity().clear();
    getQuantity()
      .type(invoiceval[count - 1].Qty)
      .should('have.value', invoiceval[count - 1].Qty);
    getunitprice().clear();
    getunitprice()
      .type(invoiceval[count - 1].unitprice)
      .should('have.value', invoiceval[count - 1].unitprice);
    gettaxpercent().clear();
    gettaxpercent()
      .type(invoiceval[count - 1].tax)
      .should('have.value', invoiceval[count - 1].tax);

    cy.log('Tax %  : ' + invoiceval[count - 1].tax);
    cy.log('Quanity : ' + invoiceval[count - 1].Qty);
    cy.log('Unit Price : ' + invoiceval[count - 1].unitprice);

    let amount_withoutTax = invoiceval[count - 1].Qty * invoiceval[count - 1].unitprice;
    amount_withoutTax = truncateToDecimals(amount_withoutTax);

    cy.log('Amount without Tax : ' + amount_withoutTax);

    let tax_amount = (invoiceval[count - 1].tax / 100) * amount_withoutTax;
    tax_amount = truncateToDecimals(tax_amount);

    cy.log('Tax amount : ' + tax_amount);

    let total_amount = amount_withoutTax + tax_amount;
    total_amount = truncateToDecimals(total_amount);

    cy.log('Total Amount : ' + total_amount);

    getAmtwithoutTax().should('have.value', amount_withoutTax);
    getTaxAmount().should('have.value', tax_amount);
    getTotalAmount().should('have.value', total_amount);
  });

  it('TC02- Currency = USD , Qnty = 10, unitprice = 10, Tax = 1 ', () => {
    getInvoiceLink().click({ force: true });
    cy.url().should('include', '/invoices');
    getCreateInvoiceButton().click({ force: true });
    cy.url().should('include', '/invoices/create');
    cy.wait(2000);
    cy.get('h1').contains('Create Invoice');
    getcurrencydropdown().click({ force: true });
    cy.get('li')
      .contains(invoiceval[count - 1].Currency)
      .click({ force: true });
    getDescriptioninput().clear();
    getDescriptioninput()
      .type(invoiceval[count - 1].description)
      .should('have.value', invoiceval[count - 1].description);
    getQuantity().clear();
    getQuantity()
      .type(invoiceval[count - 1].Qty)
      .should('have.value', invoiceval[count - 1].Qty);
    getunitprice().clear();
    getunitprice()
      .type(invoiceval[count - 1].unitprice)
      .should('have.value', invoiceval[count - 1].unitprice);
    gettaxpercent().clear();
    gettaxpercent()
      .type(invoiceval[count - 1].tax)
      .should('have.value', invoiceval[count - 1].tax);
    cy.log('Tax %  : ' + invoiceval[count - 1].tax);
    cy.log('Quanity : ' + invoiceval[count - 1].Qty);
    cy.log('Unit Price : ' + invoiceval[count - 1].unitprice);
    let amount_withoutTax = invoiceval[count - 1].Qty * invoiceval[count - 1].unitprice;
    amount_withoutTax = truncateToDecimals(amount_withoutTax);
    cy.log('Amount without Tax : ' + amount_withoutTax);
    let tax_amount = (invoiceval[count - 1].tax / 100) * amount_withoutTax;
    tax_amount = truncateToDecimals(tax_amount);
    cy.log('Tax amount : ' + tax_amount);
    let total_amount = amount_withoutTax + tax_amount;
    total_amount = truncateToDecimals(total_amount);
    cy.log('Total Amount : ' + total_amount);
    getAmtwithoutTax().should('have.value', amount_withoutTax);
    getTaxAmount().should('have.value', tax_amount);
    getTotalAmount().should('have.value', total_amount);
  });

  it('TC03 - Currency = MATIC , Qnty = 50 , unitprice = 100  , Tax = 5', () => {
    getInvoiceLink().click({ force: true });
    cy.url().should('include', '/invoices');
    getCreateInvoiceButton().click({ force: true });
    cy.url().should('include', '/invoices/create');
    cy.wait(2000);
    cy.get('h1').contains('Create Invoice');
    getcurrencydropdown().click({ force: true });
    cy.get('li')
      .contains(invoiceval[count - 1].Currency)
      .click({ force: true });
    getDescriptioninput().clear();
    getDescriptioninput()
      .type(invoiceval[count - 1].description)
      .should('have.value', invoiceval[count - 1].description);
    getQuantity().clear();
    getQuantity()
      .type(invoiceval[count - 1].Qty)
      .should('have.value', invoiceval[count - 1].Qty);
    getunitprice().clear();
    getunitprice()
      .type(invoiceval[count - 1].unitprice)
      .should('have.value', invoiceval[count - 1].unitprice);
    gettaxpercent().clear();
    gettaxpercent()
      .type(invoiceval[count - 1].tax)
      .should('have.value', invoiceval[count - 1].tax);
    cy.log('Tax %  : ' + invoiceval[count - 1].tax);
    cy.log('Quanity : ' + invoiceval[count - 1].Qty);
    cy.log('Unit Price : ' + invoiceval[count - 1].unitprice);
    let amount_withoutTax = invoiceval[count - 1].Qty * invoiceval[count - 1].unitprice;
    amount_withoutTax = truncateToDecimals(amount_withoutTax);
    cy.log('Amount without Tax : ' + amount_withoutTax);
    let tax_amount = (invoiceval[count - 1].tax / 100) * amount_withoutTax;
    tax_amount = truncateToDecimals(tax_amount);
    cy.log('Tax amount : ' + tax_amount);
    let total_amount = amount_withoutTax + tax_amount;
    total_amount = truncateToDecimals(total_amount);
    cy.log('Total Amount : ' + total_amount);
    getAmtwithoutTax().should('have.value', amount_withoutTax);
    getTaxAmount().should('have.value', tax_amount);
    getTotalAmount().should('have.value', total_amount);
  });

  it('TC04- Currency = EUR , Qnty = 100 , unitprice = 1000 , Tax = 2.5 ', () => {
    getInvoiceLink().click({ force: true });
    cy.url().should('include', '/invoices');
    getCreateInvoiceButton().click({ force: true });
    cy.url().should('include', '/invoices/create');
    cy.wait(2000);
    cy.get('h1').contains('Create Invoice');
    getcurrencydropdown().click({ force: true });
    cy.get('li')
      .contains(invoiceval[count - 1].Currency)
      .click({ force: true });
    getDescriptioninput().clear();
    getDescriptioninput()
      .type(invoiceval[count - 1].description)
      .should('have.value', invoiceval[count - 1].description);
    getQuantity().clear();
    getQuantity()
      .type(invoiceval[count - 1].Qty)
      .should('have.value', invoiceval[count - 1].Qty);
    getunitprice().clear();
    getunitprice()
      .type(invoiceval[count - 1].unitprice)
      .should('have.value', invoiceval[count - 1].unitprice);
    gettaxpercent().clear();
    gettaxpercent()
      .type(invoiceval[count - 1].tax)
      .should('have.value', invoiceval[count - 1].tax);
    cy.log('Tax %  : ' + invoiceval[count - 1].tax);
    cy.log('Quanity : ' + invoiceval[count - 1].Qty);
    cy.log('Unit Price : ' + invoiceval[count - 1].unitprice);
    let amount_withoutTax = invoiceval[count - 1].Qty * invoiceval[count - 1].unitprice;
    amount_withoutTax = truncateToDecimals(amount_withoutTax);
    cy.log('Amount without Tax : ' + amount_withoutTax);
    let tax_amount = (invoiceval[count - 1].tax / 100) * amount_withoutTax;
    tax_amount = truncateToDecimals(tax_amount);
    cy.log('Tax amount : ' + tax_amount);
    let total_amount = amount_withoutTax + tax_amount;
    total_amount = truncateToDecimals(total_amount);
    cy.log('Total Amount : ' + total_amount);
    getAmtwithoutTax().should('have.value', amount_withoutTax);
    getTaxAmount().should('have.value', tax_amount);
    getTotalAmount().should('have.value', total_amount);
  });

  it('TC05 - Currency = USD , Qnty = 200, unitprice = 2.5 , Tax = 2.05', () => {
    getInvoiceLink().click({ force: true });
    cy.url().should('include', '/invoices');
    getCreateInvoiceButton().click({ force: true });
    cy.url().should('include', '/invoices/create');
    cy.wait(2000);
    cy.get('h1').contains('Create Invoice');
    getcurrencydropdown().click({ force: true });
    cy.get('li')
      .contains(invoiceval[count - 1].Currency)
      .click({ force: true });
    getDescriptioninput().clear();
    getDescriptioninput()
      .type(invoiceval[count - 1].description)
      .should('have.value', invoiceval[count - 1].description);
    getQuantity().clear();
    getQuantity()
      .type(invoiceval[count - 1].Qty)
      .should('have.value', invoiceval[count - 1].Qty);
    getunitprice().clear();
    getunitprice()
      .type(invoiceval[count - 1].unitprice)
      .should('have.value', invoiceval[count - 1].unitprice);
    gettaxpercent().clear();
    gettaxpercent()
      .type(invoiceval[count - 1].tax)
      .should('have.value', invoiceval[count - 1].tax);
    cy.log('Tax %  : ' + invoiceval[count - 1].tax);
    cy.log('Quanity : ' + invoiceval[count - 1].Qty);
    cy.log('Unit Price : ' + invoiceval[count - 1].unitprice);
    let amount_withoutTax = invoiceval[count - 1].Qty * invoiceval[count - 1].unitprice;
    amount_withoutTax = truncateToDecimals(amount_withoutTax);
    cy.log('Amount without Tax : ' + amount_withoutTax);
    let tax_amount = (invoiceval[count - 1].tax / 100) * amount_withoutTax;
    tax_amount = truncateToDecimals(tax_amount);
    cy.log('Tax amount : ' + tax_amount);
    let total_amount = amount_withoutTax + tax_amount;
    total_amount = truncateToDecimals(total_amount);
    cy.log('Total Amount : ' + total_amount);
    getAmtwithoutTax().should('have.value', amount_withoutTax);
    getTaxAmount().should('have.value', tax_amount);
    getTotalAmount().should('have.value', total_amount);
  });

  it('TC06 - Currency = MATIC , Qnty = 200, unitprice = 0.05 , Tax = 0.01', () => {
    getInvoiceLink().click({ force: true });
    cy.url().should('include', '/invoices');
    getCreateInvoiceButton().click({ force: true });
    cy.url().should('include', '/invoices/create');
    cy.wait(2000);
    cy.get('h1').contains('Create Invoice');
    getcurrencydropdown().click({ force: true });
    cy.get('li')
      .contains(invoiceval[count - 1].Currency)
      .click({ force: true });
    getDescriptioninput().clear();
    getDescriptioninput()
      .type(invoiceval[count - 1].description)
      .should('have.value', invoiceval[count - 1].description);
    getQuantity().clear();
    getQuantity()
      .type(invoiceval[count - 1].Qty)
      .should('have.value', invoiceval[count - 1].Qty);
    getunitprice().clear();
    getunitprice()
      .type(invoiceval[count - 1].unitprice)
      .should('have.value', invoiceval[count - 1].unitprice);
    gettaxpercent().clear();
    gettaxpercent()
      .type(invoiceval[count - 1].tax)
      .should('have.value', invoiceval[count - 1].tax);
    cy.log('Tax %  : ' + invoiceval[count - 1].tax);
    cy.log('Quanity : ' + invoiceval[count - 1].Qty);
    cy.log('Unit Price : ' + invoiceval[count - 1].unitprice);
    let amount_withoutTax = invoiceval[count - 1].Qty * invoiceval[count - 1].unitprice;
    amount_withoutTax = truncateToDecimals(amount_withoutTax);
    cy.log('Amount without Tax : ' + amount_withoutTax);
    let tax_amount = (invoiceval[count - 1].tax / 100) * amount_withoutTax;
    tax_amount = truncateToDecimals(tax_amount);
    cy.log('Tax amount : ' + tax_amount);
    let total_amount = amount_withoutTax + tax_amount;
    total_amount = truncateToDecimals(total_amount);
    cy.log('Total Amount : ' + total_amount);
    getAmtwithoutTax().should('have.value', amount_withoutTax);
    getTaxAmount().should('have.value', tax_amount);
    getTotalAmount().should('have.value', total_amount);
  });

  it('TC07 - Add Two items : Currency = MATIC  , Qnty = 20 and 10 , unitprice = 1.75 and 2.95 , Tax = 1.34 and 2.35', () => {
    getInvoiceLink().click({ force: true });
    cy.url().should('include', '/invoices');
    getCreateInvoiceButton().click({ force: true });
    cy.url().should('include', '/invoices/create');
    cy.wait(2000);
    cy.get('h1').contains('Create Invoice');
    getcurrencydropdown().click({ force: true });
    cy.get('li')
      .contains(invoiceval[count - 1].Currency)
      .click({ force: true });
    getDescriptioninput().clear();
    getDescriptioninput()
      .type(invoiceval[count - 1].description_1)
      .should('have.value', invoiceval[count - 1].description_1);
    getQuantity().clear();
    getQuantity()
      .type(invoiceval[count - 1].Qty_1)
      .should('have.value', invoiceval[count - 1].Qty_1);
    getunitprice().clear();
    getunitprice()
      .type(invoiceval[count - 1].unitprice_1)
      .should('have.value', invoiceval[count - 1].unitprice_1);
    gettaxpercent().clear();
    gettaxpercent()
      .type(invoiceval[count - 1].tax_1)
      .should('have.value', invoiceval[count - 1].tax_1);
    getAddItemButton().click({ force: true });
    cy.wait(2000);
    cy.get('input[name="invoiceInclusions.1.description"]')
      .type(invoiceval[count - 1].description_2)
      .should('have.value', invoiceval[count - 1].description_2);
    cy.get('input[name="invoiceInclusions.1.quantity"]').clear();
    cy.get('input[name="invoiceInclusions.1.quantity"]')
      .type(invoiceval[count - 1].Qty_2)
      .should('have.value', invoiceval[count - 1].Qty_2);
    cy.get('input[name="invoiceInclusions.1.unitPrice.value"]').clear();
    cy.get('input[name="invoiceInclusions.1.unitPrice.value"]')
      .type(invoiceval[count - 1].unitprice_2)
      .should('have.value', invoiceval[count - 1].unitprice_2);
    cy.get('input[name="invoiceInclusions.1.taxPercent"]').clear();
    cy.get('input[name="invoiceInclusions.1.taxPercent"]')
      .type(invoiceval[count - 1].tax_2)
      .should('have.value', invoiceval[count - 1].tax_2);
    let amount_withoutTax_1 = invoiceval[count - 1].Qty_1 * invoiceval[count - 1].unitprice_1;
    let amount_withoutTax_2 = invoiceval[count - 1].Qty_2 * invoiceval[count - 1].unitprice_2;
    let amount_withoutTax = amount_withoutTax_1 + amount_withoutTax_2;
    amount_withoutTax = truncateToDecimals(amount_withoutTax);
    cy.log('Amount without Tax : ' + amount_withoutTax);
    let tax_amount_1 = truncateToDecimals((invoiceval[count - 1].tax_1 / 100) * amount_withoutTax_1);
    cy.log('Tax1 amount after truncate : ' + tax_amount_1);
    let tax_amount_2 = truncateToDecimals((invoiceval[count - 1].tax_2 / 100) * amount_withoutTax_2);
    cy.log('Tax2 amount after truncate : ' + tax_amount_2);
    let tax_amount = tax_amount_1 + tax_amount_2;
    cy.log('Total tax amount : ' + tax_amount);
    let total_amount = amount_withoutTax + tax_amount;
    total_amount = truncateToDecimals(total_amount);
    cy.log('Total Amount : ' + total_amount);
    getAmtwithoutTax().should('have.value', amount_withoutTax);
    getTaxAmount().should('have.value', tax_amount);
    getTotalAmount().should('have.value', total_amount);
  });
});
