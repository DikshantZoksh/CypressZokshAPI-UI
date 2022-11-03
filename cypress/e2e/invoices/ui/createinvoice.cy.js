/// <reference types = "Cypress" />

const cred = require('./test-data/credentials.test-data');
const invoice = require('./test-data/invoice.create.test-data')
const { truncateToDecimals } = require('../../../support/lib');

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
  getGenerateInvoiceButton,
  getSelectPayeeButton,
  getCustomerListTable

} from '../../../support/object-repo';

describe("Create and view the invoice", () => {

  it('Create invoice', () => {

    Logindashboard()
    CheckforPayeeExist()
    selectfirstcustomer()
    Setinvoicedetails()
    getGenerateInvoiceButton().click({force:true}) 

  });


});


// Check if any payee exist in the payee information table
function CheckforPayeeExist(){
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
    let row_count = row.length
    if(row_count > 2) {
      return true
      assert(row_count > 2,"Payee exist in the customer table")
    }else{
      return false
      assert(row_count > 2,"Customer table is Empty")
    }
  });
}


// Login to the DashBoard
  function Logindashboard(){
    cy.visit(cred.app_url)
    getEmailLogin().type(cred.username).should('have.value', cred.username);
    getPasswordLogin().type(cred.password).should('have.value', cred.password);
    getButtonLogin().click();
    cy.url().should('include','/dashboard')  
  };

//Select the first customer from the table
  function selectfirstcustomer(){
    getCustomerListTable()
      .find('tr')
      .eq(1)
      .find('td')
      .eq(3)
      .find("button[aria-label='Select Payee']").click({ force: true })
  }

      
      
  //Fill invoice details 
  function Setinvoicedetails(){
    getcurrencydropdown().click({ force: true });
    cy.get('li')
      .contains(invoice.Currency)
      .click({ force: true });
    getDescriptioninput().clear();
    getDescriptioninput()
      .type(invoice.description)
      .should('have.value', invoice.description);
    getQuantity().clear();
    getQuantity()
      .type(invoice.Qty)
      .should('have.value', invoice.Qty);
    getunitprice().clear();
    getunitprice()
      .type(invoice.unitprice)
      .should('have.value', invoice.unitprice);
    gettaxpercent().clear();
    gettaxpercent()
      .type(invoice.tax)
      .should('have.value', invoice.tax);
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

