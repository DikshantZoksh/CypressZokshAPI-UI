// <reference types = "Cypress" />

const { generateRequestAuthHeaders } = require('../../../../pre-request');
const environments = require('../../../../environments');
const cust = require('../test-data/customer.test-data');
const { apiAuth, versions, custAPIurl, custAPIep, bearerToken } = environments.testnet;

let postBody = JSON.parse(JSON.stringify(cust));

let requestAPI = {};

let customerId = '';
let customerName = '';
let customerEmail = '';
let customerOrganisation = '';
let addressLine1 = '';
let addressLine2 = '';
let customerPincode = 0;
let customerCity = '';
let customerState = '';
let customerCountry = '';
let customerMerchant = '';

describe('Customer API Tests', () => {
  let zokshKey;
  let zokshTimestamp;
  let zokshSign;

  let authHeaders = generateRequestAuthHeaders(requestAPI, apiAuth, versions);
  zokshKey = authHeaders['zoksh-key'];
  zokshTimestamp = authHeaders['zoksh-ts'];
  zokshSign = authHeaders['zoksh-sign'];

  it('TC-01 : Create a customer with Primary and secondary details and validate the data in response ', (done) => {
    requestAPI = {
      url: custAPIep,
      method: 'POST',
      body: postBody,
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
      customerId = res.body.data.customer._id;
      expect(res.body.data.customer.name).to.be.equal(postBody.name);
      customerName = res.body.data.customer.name;
      expect(res.body.data.customer.email).to.be.equal(postBody.email);
      customerEmail = res.body.data.customer.email;
      expect(res.body.data.customer.address[0]).to.be.equal(postBody.address[0]);
      addressLine1 = res.body.data.customer.address[0];
      expect(res.body.data.customer.address[1]).to.be.equal(postBody.address[1]);
      addressLine2 = res.body.data.customer.address[1];
      expect(res.body.data.customer.organisation).to.be.equal(postBody.organisation);
      customerOrganisation = res.body.data.customer.organisation;
      expect(res.body.data.customer.pin).to.be.equal(postBody.pin);
      customerPincode = res.body.data.customer.pin;
      expect(res.body.data.customer.city).to.be.equal(postBody.city);
      customerCity = res.body.data.customer.city;
      expect(res.body.data.customer.state).to.be.equal(postBody.state);
      customerState = res.body.data.customer.state;
      expect(res.body.data.customer.country).to.be.equal(postBody.country);
      customerCountry = res.body.data.customer.country;
      expect(res.body.data.customer.merchant).to.be.equal(postBody.merchant);
      customerMerchant = res.body.data.customer.merchant;
      done();
    });
  }).timeout(10000);

  it('TC-02 : Fetch the created Customer and verify the details in response ', (done) => {
    cy.request({
      method: 'GET',
      url: custAPIurl + custAPIep + '/' + customerId,
      headers: {
        Authorization: 'Bearer ' + bearerToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body.success).to.be.equal(true);
      expect(res.body.data._id).to.be.not.null;
      expect(res.body.data._id).to.be.equal(customerId);
      expect(res.body.data.name).to.be.equal(customerName);
      expect(res.body.data.email).to.be.equal(customerEmail);
      expect(res.body.data.address[0]).to.be.equal(addressLine1);
      expect(res.body.data.address[1]).to.be.equal(addressLine2);
      expect(res.body.data.organisation).to.be.equal(customerOrganisation);
      expect(res.body.data.pin).to.be.equal(customerPincode);
      expect(res.body.data.city).to.be.equal(customerCity);
      expect(res.body.data.state).to.be.equal(customerState);
      expect(res.body.data.country).to.be.equal(customerCountry);
      expect(res.body.data.merchant).to.be.equal(customerMerchant);
      done();
    });
  }).timeout(10000);

  it('TC-03 : Read All : Fetch the created Customer and verify the details in response ', (done) => {
    cy.request({
      method: 'GET',
      url: custAPIurl + custAPIep,
      headers: {
        Authorization: 'Bearer ' + bearerToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body.success).to.be.equal(true);

      let cust_count = res.body.data.customers.length;
      let i = 0;

      cy.log('length of the customers : ' + cust_count);

      for (i = 0; i < cust_count; i++) {
        if (res.body.data.customers[i]._id == customerId) {
          cy.log('Customer identified at index : ' + i);
          expect(res.body.data.customers[i]._id).to.be.equal(customerId);
          expect(res.body.data.customers[i].name).to.be.equal(customerName);
          expect(res.body.data.customers[i].email).to.be.equal(customerEmail);
          expect(res.body.data.customers[i].address[0]).to.be.equal(addressLine1);
          expect(res.body.data.customers[i].address[1]).to.be.equal(addressLine2);
          expect(res.body.data.customers[i].organisation).to.be.equal(customerOrganisation);
          expect(res.body.data.customers[i].pin).to.be.equal(customerPincode);
          expect(res.body.data.customers[i].city).to.be.equal(customerCity);
          expect(res.body.data.customers[i].state).to.be.equal(customerState);
          expect(res.body.data.customers[i].country).to.be.equal(customerCountry);
          expect(res.body.data.customers[i].merchant).to.be.equal(customerMerchant);
        }
      }
      done();
    });
  }).timeout(10000);
});
