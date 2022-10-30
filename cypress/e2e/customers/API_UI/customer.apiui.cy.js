// <reference types = "Cypress" />

const { generateRequestAuthHeaders } = require('../../../pre-request');
const environments = require('./env/customer.env');
const cust = require('./test-data/customercreation.test-data');
const cred = require('./test-data/credentials.test-data');
const { apiAuth, versions, custAPIurl, custAPIep, bearerToken } = environments ;

let post_Body = JSON.parse(JSON.stringify(cust));

let requestapi = {};

let Cust_name = ''  ;
let cust_email = '' ;

import {
  getEmailLogin,
  getPasswordLogin,
  getButtonLogin,
  getInvoiceLink,
  getCreateInvoiceButton,
  getSelectPayeeButton,
  getCustomerListTable,
  getCloseButton,
} from '../../../support/object-repo';

describe('Customer creation through API and validate on UI', () => {
  let zokshkey;
  let zokshts;
  let zokshsign;

  let authHeaders = generateRequestAuthHeaders(requestapi, apiAuth, versions);
  zokshkey = authHeaders['zoksh-key'];
  zokshts = authHeaders['zoksh-ts'];
  zokshsign = authHeaders['zoksh-sign'];

  it('TC-01 : API : Create a customer with Primary and secondary details and validate the data in response ', (done) => {
    requestapi = {
      url: custAPIep,
      method: 'POST',
      body: post_Body,
      headers: {},
    };
    cy.request({
      method: requestapi.method,
      url: custAPIurl + requestapi.url,
      headers: {
        Authorization: 'Bearer ' + bearerToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'zoksh-key': zokshkey,
        'zoksh-ts': zokshts,
        'zoksh-sign': zokshsign,
      },
      body: requestapi.body,
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body.success).to.be.equal(true);
      expect(res.body.data.customer._id).to.be.not.null;
      expect(res.body.data.customer.name).to.be.equal(post_Body.name);
      Cust_name = res.body.data.customer.name;
      expect(res.body.data.customer.email).to.be.equal(post_Body.email);
      cust_email = res.body.data.customer.email;
      expect(res.body.data.customer.address[0]).to.be.equal(post_Body.address[0]);
      expect(res.body.data.customer.address[1]).to.be.equal(post_Body.address[1]);
      expect(res.body.data.customer.organisation).to.be.equal(post_Body.organisation);
      expect(res.body.data.customer.pin).to.be.equal(post_Body.pin);
      expect(res.body.data.customer.city).to.be.equal(post_Body.city);
      expect(res.body.data.customer.state).to.be.equal(post_Body.state);
      expect(res.body.data.customer.country).to.be.equal(post_Body.country);
      expect(res.body.data.customer.merchant).to.be.equal(post_Body.merchant);
      done();
    });
  }).timeout(10000);

  it('TC02 : UI : Verify the customer details on UI created through API', () => {
    cy.log("Email : - " + cust_email + " will be serached in UI")
    cy.visit(cred.app_url)
    getEmailLogin().type(cred.username).should('have.value', cred.username);
    getPasswordLogin().type(cred.password).should('have.value', cred.password);
    getButtonLogin().click();
    cy.url().should('include', '/dashboard');
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
        cy.log("Total number of Rows are " + row.length);
        row.toArray().forEach((element) => {
          if (element.innerHTML.includes(cust_email)) {
            cy.log("Email found at row index - " + row.index(element));
            getCustomerListTable()
              .find('tr')
              .eq(row.index(element))
              .find('td')
              .eq(0)
              .then(function (col) {
                const strname = col.text();
                expect(strname).to.contains(Cust_name);
                getCloseButton().click({ force: true });
              });
          }
        });
      });
  });
});
