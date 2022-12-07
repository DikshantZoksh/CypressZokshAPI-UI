/// <reference types = "Cypress" />

const { generateRequestAuthHeaders } = require('../../../../pre-request');
const environments = require('../env/customer.env');
const cust = require('../test-data/customer-creation.test-data');
const cred = require('../test-data/credentials.test-data');
const { apiAuth, versions, custAPIurl, custAPIep, bearerToken } = environments;

let post_Body = JSON.parse(JSON.stringify(cust));

let requestAPI = {};

import {
  getEmailLogin,
  getPasswordLogin,
  getButtonLogin,
  getInvoiceLink,
  getCreateInvoiceButton,
  getSelectPayeeButton,
  getCustomerListTable,
  getCloseButton,
} from '../../../../support/object-repo';

describe('Customer creation through API and validate on UI', () => {
  let zokshKey;
  let zokshTimestamp;
  let zokshSign;

  let authHeaders = generateRequestAuthHeaders(requestAPI, apiAuth, versions);
  zokshKey = authHeaders['zoksh-key'];
  zokshTimestamp = authHeaders['zoksh-ts'];
  zokshSign = authHeaders['zoksh-sign'];

  it('TC-01 : API : Create a customer with Primary and secondary details and validate the data in response ', (done) => {
    requestAPI = {
      url: custAPIep,
      method: 'POST',
      body: post_Body,
      headers: {},
    };
    cy.request({
      method: requestAPI.method,
      url: custAPIurl + requestAPI.url,
      headers: {
        Authorization: 'Bearer ' + bearerToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'zoksh-key': zokshKey,
        'zoksh-ts': zokshTimestamp,
        'zoksh-sign': zokshSign,
      },
      body: requestAPI.body,
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body.success).to.be.equal(true);
      expect(res.body.data.customer._id).to.be.not.null;
      expect(res.body.data.customer.name).to.be.equal(post_Body.name);
      expect(res.body.data.customer.email).to.be.equal(post_Body.email);
      expect(res.body.data.customer.address[0]).to.be.equal(post_Body.address[0]);
      expect(res.body.data.customer.address[1]).to.be.equal(post_Body.address[1]);
      expect(res.body.data.customer.merchant).to.be.equal(post_Body.merchant);
      done();
    });
  }).timeout(20000);

  it('TC-02 : UI : Verify the customer details on UI created through API', () => {
    cy.log('Email : - ' + post_Body.email + ' will be serached in UI');
    cy.visit(cred.app_url);
    getEmailLogin().type(cred.username).should('have.value', cred.username);
    getPasswordLogin().type(cred.password).should('have.value', cred.password);
    getButtonLogin().click();
    cy.url().should('include', '/dashboard');
    getInvoiceLink().click({ force: true, multiple: true });
    cy.url().should('include', '/invoices');
    getCreateInvoiceButton().click({ force: true });
    cy.url().should('include', '/invoices/create');
    cy.wait(2000);
    cy.get('h1').contains('Create Invoice');
    getSelectPayeeButton().click({ force: true });
    cy.wait(3000);
    getCustomerListTable()
      .find('tr')
      .then((row) => {
        cy.log('Total number of Rows are ' + row.length);
        row.toArray().forEach((element) => {
          if (element.innerHTML.includes(post_Body.email)) {
            cy.log('Email found at row index - ' + row.index(element));
            getCustomerListTable()
              .find('tr')
              .eq(row.index(element))
              .find('td')
              .eq(0)
              .then(function (col) {
                const strname = col.text();
                expect(strname).to.contains(post_Body.name);
                getCloseButton().click({ force: true });
              });
          }
        });
      });
  });
});
