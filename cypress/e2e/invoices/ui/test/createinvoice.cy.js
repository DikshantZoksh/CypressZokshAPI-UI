/// <reference types = "Cypress" />

const cred = require('../test-data/credentials.test-data');
const invoice = require('../test-data/invoice.create.test-data')
const { truncateToDecimals } = require('../../../../support/lib');
const invoicefun = require('../../functions/invoice.create')

let customer_email = ""
let creation_txt = ""
//let invoice_no = ""
let client_name = ""
let status_txt = ""
let amount_val = null


import { Logindashboard } from '../../functions/invoice.create';
import { selectfirstcustomer } from '../../functions/invoice.create';
import { Setinvoicedetails } from '../../functions/invoice.create';
import { CheckforPayeeExist } from '../../functions/invoice.create';
import { viewlastcreatedinvoice } from '../../functions/invoice.create';
import { getCreationDate } from '../../functions/invoice.create';
import { getinvoicenumber } from '../../functions/invoice.create';
import { getClientname } from '../../functions/invoice.create';
import { getinvoicestatus } from '../../functions/invoice.create';
import { getinvoiceAmount } from '../../functions/invoice.create';
import { getCustomerEmail } from '../../functions/invoice.create';

import {
  getGenerateInvoiceButton,
  getInvoiceLink,
  getinvoicenum,
  getissuedonDate,
  getPaymentdueDate
} from '../../../../support/object-repo';

describe("Create and view the invoice", () => {

  it('Create invoice', () => {
    
    Logindashboard()
    CheckforPayeeExist()
    selectfirstcustomer()
    customer_email = getCustomerEmail()
    selectfirstcustomer()
    Setinvoicedetails()
    getGenerateInvoiceButton().click({force:true}) 

  });

  it('View invoice' , () => {
    getInvoiceLink().click({ force: true });
    cy.wait(5000)
    const invoice_tbl = cy.get("Table[role='table']")
    if (invoice_tbl.should('exist')){
       creation_txt = getCreationDate()
       cy.log(creation_txt)
       cy.log(getinvoicenumber())
       //cy.log("Invoice number fetched from table :" +invoice_no)
       client_name = getClientname()
       status_txt = getinvoicestatus()
       amount_val = getinvoiceAmount()
       if (expect(client_name).to.contains(customer_email)){
        cy.log("Condtion is True")
        viewlastcreatedinvoice()
       }
      }
  })

  it('Invoice validation ',() => {
    cy.wait(5000)
    cy.url().should('include','/read')
    getinvoicenum().should('have.text',invoice_no)
    
  })

});




