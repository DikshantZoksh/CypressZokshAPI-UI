/// <reference types = "Cypress" />

const cred = require('../ui/test-data/credentials.test-data');
const invoice = require('../ui/test-data/invoice.create.test-data')
const { truncateToDecimals } = require('../../../support/lib');
let creation_dt_txt = ""
let invoice_number = 0
let client_name_txt = ""
let invoice_sts = ""
let invoice_amount = 0


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
  getCustomerListTable,
  getdateIssuedOn,
  getdatePaymentdueBy
} from '../../../support/object-repo';



// Check if any payee exist in the payee information table
export function CheckforPayeeExist(){
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
    if(row_count >= 2) {
      return true
      assert(row_count >= 2,"Payee exist in the customer table")
    }else{
      return false
      assert(row_count >= 2,"Customer table is Empty")
    }
  });
}


// Login to the DashBoard
  export function Logindashboard(){
    cy.visit(cred.app_url)
    getEmailLogin().type(cred.username).should('have.value', cred.username);
    getPasswordLogin().type(cred.password).should('have.value', cred.password);
    getButtonLogin().click();
    cy.url().should('include','/dashboard')  
  };

//Select the first customer from the table
  export function selectfirstcustomer(){
    getCustomerListTable()
      .find('tr')
      .eq(1)
      .find('td')
      .eq(3)
      .find("button[aria-label='Select Payee']").click({ force: true })
  }  
      
  //Fill invoice details 
  export function Setinvoicedetails(){
    getdateIssuedOn().clear();
    getdateIssuedOn().type(invoice.issuedon).should('have.value',invoice.issuedon)
    getdatePaymentdueBy().clear();
    getdatePaymentdueBy().type(invoice.paymentdueby).should('have.value',invoice.paymentdueby)
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

  //View the last created invoice from the table
  export function viewlastcreatedinvoice(){
    cy.get("Table[role='table']")
      .find('tr')
      .eq(1)
      .find('td')
      .eq(5)
      .find('a').click({ force: true })
  }  

// Get creation date from the last created invoice on the invoice table
  export function getCreationDate(){
    cy.get("Table[role='table']")
      .find('tr')
      .eq(1)
      .find('td')
      .eq(0)
      .then(($btn) => {
        creation_dt_txt = $btn.text()
        cy.log("creation date is : " + creation_dt_txt)
      })
    return creation_dt_txt
  }
//
  export function getinvoicenumber(){
    cy.get("Table[role='table']")
      .find('tr')
      .eq(1)
      .find('td')
      .eq(1)
      .then(($btn) => {
        invoice_number = $btn.text()
        cy.log("invoice number is : " + invoice_number)
      })
    return invoice_number
  }

  export function getClientname(){
    cy.get("Table[role='table']")
      .find('tr')
      .eq(1)
      .find('td')
      .eq(2)
      .then(($btn) => {
        client_name_txt = $btn.text()
        cy.log("Client name  is : " + client_name_txt)
      })
    return client_name_txt
  }

  export function getinvoicestatus(){
    cy.get("Table[role='table']")
      .find('tr')
      .eq(1)
      .find('td')
      .eq(3)
      .then(($btn) => {
        invoice_sts = $btn.text()
        cy.log("Invoice  status is : " + invoice_sts)
      })
    return invoice_sts
  }

  export function getinvoiceAmount(){
    cy.get("Table[role='table']")
      .find('tr')
      .eq(1)
      .find('td')
      .eq(4)
      .then(($btn) => {
        invoice_amount = $btn.text()
        cy.log("Invoice amount is : " + invoice_amount)
      })
    return invoice_amount
  }




    
  