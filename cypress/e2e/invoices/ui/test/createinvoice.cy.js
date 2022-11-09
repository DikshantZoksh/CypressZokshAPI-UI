/// <reference types = "Cypress" />

const cred = require('../test-data/credentials.test-data');
const invoice = require('../test-data/invoice.create.test-data')
const { truncateToDecimals } = require('../../../../support/lib');

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



import {
  getGenerateInvoiceButton,
  getInvoiceLink
} from '../../../../support/object-repo';

describe("Create and view the invoice", () => {

  it('Create invoice', () => {
    
    Logindashboard()
    CheckforPayeeExist()
    selectfirstcustomer()
    Setinvoicedetails()
    getGenerateInvoiceButton().click({force:true}) 

  });

  it('View invoice' , () => {
    getInvoiceLink().click({ force: true });
    cy.wait(5000)
    const invoice_tbl = cy.get("Table[role='table']")
    if (invoice_tbl.should('exist') ){
       let creation_txt = getCreationDate()
       let invoice_no = getinvoicenumber()
       let client_name = getClientname()
       let status_txt = getinvoicestatus()
       let amount_val = getinvoiceAmount()
       viewlastcreatedinvoice()
      }
  })

  it('validate the invoice',() => {
    cy.url().should('include','/read')
    

  })

});




