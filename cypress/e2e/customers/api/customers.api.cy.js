// <reference types = "Cypress" />

const { generateRequestAuthHeaders } = require('../../../pre-request');
const environments = require('../../../environments');
const cust = require('./test-data/customer.test-data');
const { apiAuth, versions, custAPIurl, custAPIep, bearerToken } = environments.testnet;

let post_Body = JSON.parse(JSON.stringify(cust));

let requestapi = {};

let Cust_id = '';
let Cust_name = '';
let cust_email = '';
let cust_org = '';
let addrs_0 = '';
let addrs_1 = '';
let cust_pin = 0;
let cust_city = '';
let cust_state = '';
let cust_country = '';
let cust_merchant = '';

describe('Customer API Tests', () => {
  let zokshkey;
  let zokshts;
  let zokshsign;

  let authHeaders = generateRequestAuthHeaders(requestapi, apiAuth, versions);
  zokshkey = authHeaders['zoksh-key'];
  zokshts = authHeaders['zoksh-ts'];
  zokshsign = authHeaders['zoksh-sign'];

  it('TC-01 : Create a customer with Primary and secondary details and validate the data in response ', (done) => {
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
      Cust_id = res.body.data.customer._id;
      expect(res.body.data.customer.name).to.be.equal(post_Body.name);
      Cust_name = res.body.data.customer.name;
      expect(res.body.data.customer.email).to.be.equal(post_Body.email);
      cust_email = res.body.data.customer.email;
      expect(res.body.data.customer.address[0]).to.be.equal(post_Body.address[0]);
      addrs_0 = res.body.data.customer.address[0];
      expect(res.body.data.customer.address[1]).to.be.equal(post_Body.address[1]);
      addrs_1 = res.body.data.customer.address[1];
      expect(res.body.data.customer.organisation).to.be.equal(post_Body.organisation);
      cust_org = res.body.data.customer.organisation;
      expect(res.body.data.customer.pin).to.be.equal(post_Body.pin);
      cust_pin = res.body.data.customer.pin;
      expect(res.body.data.customer.city).to.be.equal(post_Body.city);
      cust_city = res.body.data.customer.city;
      expect(res.body.data.customer.state).to.be.equal(post_Body.state);
      cust_state = res.body.data.customer.state;
      expect(res.body.data.customer.country).to.be.equal(post_Body.country);
      cust_country = res.body.data.customer.country;
      expect(res.body.data.customer.merchant).to.be.equal(post_Body.merchant);
      cust_merchant = res.body.data.customer.merchant;
      done();
    });
  }).timeout(10000);

  it('TC-02 : Fetch the created Customer and verify the details in response ', (done) => {
    cy.request({
      method: 'GET',
      url: custAPIurl + custAPIep + '/' + Cust_id,
      headers: {
        Authorization: 'Bearer ' + bearerToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body.success).to.be.equal(true);
      expect(res.body.data._id).to.be.not.null;
      expect(res.body.data._id).to.be.equal(Cust_id);
      expect(res.body.data.name).to.be.equal(Cust_name);
      expect(res.body.data.email).to.be.equal(cust_email);
      expect(res.body.data.address[0]).to.be.equal(addrs_0);
      expect(res.body.data.address[1]).to.be.equal(addrs_1);
      expect(res.body.data.organisation).to.be.equal(cust_org);
      expect(res.body.data.pin).to.be.equal(cust_pin);
      expect(res.body.data.city).to.be.equal(cust_city);
      expect(res.body.data.state).to.be.equal(cust_state);
      expect(res.body.data.country).to.be.equal(cust_country);
      expect(res.body.data.merchant).to.be.equal(cust_merchant);
      done();
    });
  }).timeout(10000);
});
