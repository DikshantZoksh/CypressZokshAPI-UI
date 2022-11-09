/// <reference types = "Cypress" />

const cred = require('./test-data/credentials.test-data');
const invoice = require('./test-data/invoice.create.test-data')
const { truncateToDecimals } = require('../../../support/lib');

import { Logindashboard } from '../functions/invoice';
import { selectfirstcustomer } from '../functions/invoice';
import { Setinvoicedetails } from '../functions/invoice';
import { CheckforPayeeExist } from '../functions/invoice';

import {
  getGenerateInvoiceButton,
} from '../../../support/object-repo';

describe("Create and view the invoice", () => {

  it('Create invoice', () => {
    
    Logindashboard()
    CheckforPayeeExist()
    selectfirstcustomer()
    Setinvoicedetails()
    getGenerateInvoiceButton().click({force:true}) 

  });

  it('View invoice' , () => {

    
  })

});




