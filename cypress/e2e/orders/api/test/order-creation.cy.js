/// <reference types = "Cypress" />

const { generateRequestAuthHeaders } = require('../../../../pre-request');
const order = require('../test-data/order-payload.test-data');
const environments = require('../../../../environments');
const { baseurl, apiAuth, versions } = environments.testnet;
import { getProfileText, getNameField, getEmailField } from '../../../../support/object-repo';

let post_Body = JSON.parse(JSON.stringify(order));

let requestAPI = {};
let count = 0;
let res_url = '';

describe('OrderCreation API Tests', () => {
  let zokshKey;
  let zokshTimestamp;
  let zokshSign;

  beforeEach(() => {
    console.log('BeforeEach Hook started :' + count);
    post_Body = JSON.parse(JSON.stringify(order));
    count = count + 1;
    requestAPI = {
      url: '/v2/order',
      method: 'POST',
      body: post_Body[count - 1],
      headers: {},
    };

    let authHeaders = generateRequestAuthHeaders(requestAPI, apiAuth, versions);
    zokshKey = authHeaders['zoksh-key'];
    zokshTimestamp = authHeaders['zoksh-ts'];
    zokshSign = authHeaders['zoksh-sign'];
  });

  it('TC-01 : Token - NA : No Specified chain or currency', (done) => {
    cy.request({
      method: requestAPI.method,
      url: baseurl + requestAPI.url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'zoksh-key': zokshKey,
        'zoksh-ts': zokshTimestamp,
        'zoksh-sign': zokshSign,
      },
      body: requestAPI.body,
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body.orderId).to.be.not.null;
      expect(res.body.url).to.be.not.null;
      let str_ordrId = res.body.orderId;
      expect(res.body.url).contains(str_ordrId);
      done();
      res_url = res.body.url;
    });
  });

  it('TC-02 : Token - NA : Prefill - All Blank : No Specified chain or currency', (done) => {
    cy.request({
      method: requestAPI.method,
      url: baseurl + requestAPI.url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'zoksh-key': zokshKey,
        'zoksh-ts': zokshTimestamp,
        'zoksh-sign': zokshSign,
      },
      body: requestAPI.body,
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body.orderId).to.be.not.null;
      expect(res.body.url).to.be.not.null;
      let str_ordrId = res.body.orderId;
      expect(res.body.url).contains(str_ordrId);
      done();
      res_url = res.body.url;
    });
  });

  it('TC-03 : Token - NA : Prefill - Phone, Email - Blank : No Specified chain or currency', (done) => {
    cy.request({
      method: requestAPI.method,
      url: baseurl + requestAPI.url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'zoksh-key': zokshKey,
        'zoksh-ts': zokshTimestamp,
        'zoksh-sign': zokshSign,
      },
      body: requestAPI.body,
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body.orderId).to.be.not.null;
      expect(res.body.url).to.be.not.null;
      let str_ordrId = res.body.orderId;
      expect(res.body.url).contains(str_ordrId);
      done();
      res_url = res.body.url;
    });
  });

  it('TC-04 : Token - NA : Prefill - Name, Email - Blank : No Specified chain or currency', (done) => {
    cy.request({
      method: requestAPI.method,
      url: baseurl + requestAPI.url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'zoksh-key': zokshKey,
        'zoksh-ts': zokshTimestamp,
        'zoksh-sign': zokshSign,
      },
      body: requestAPI.body,
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body.orderId).to.be.not.null;
      expect(res.body.url).to.be.not.null;
      let str_ordrId = res.body.orderId;
      expect(res.body.url).contains(str_ordrId);
      done();
      res_url = res.body.url;
    });
  });

  it('TC-05 : Name,Phone - Blank : No Specified chain or currency', (done) => {
    cy.request({
      method: requestAPI.method,
      url: baseurl + requestAPI.url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'zoksh-key': zokshKey,
        'zoksh-ts': zokshTimestamp,
        'zoksh-sign': zokshSign,
      },
      body: requestAPI.body,
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body.orderId).to.be.not.null;
      expect(res.body.url).to.be.not.null;
      let str_ordrId = res.body.orderId;
      expect(res.body.url).contains(str_ordrId);
      done();
      res_url = res.body.url;
    });
  });

  it('TC-06 : Name,Phone,Label - Blank : No Specified chain or currency', (done) => {
    cy.request({
      method: requestAPI.method,
      url: baseurl + requestAPI.url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'zoksh-key': zokshKey,
        'zoksh-ts': zokshTimestamp,
        'zoksh-sign': zokshSign,
      },
      body: requestAPI.body,
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body.orderId).to.be.not.null;
      expect(res.body.url).to.be.not.null;
      let str_ordrId = res.body.orderId;
      expect(res.body.url).contains(str_ordrId);
      done();
      res_url = res.body.url;
    });
  });

  it('TC-07 : Name,Phone,Description - Blank : No Specified chain or currency', (done) => {
    cy.request({
      method: requestAPI.method,
      url: baseurl + requestAPI.url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'zoksh-key': zokshKey,
        'zoksh-ts': zokshTimestamp,
        'zoksh-sign': zokshSign,
      },
      body: requestAPI.body,
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body.orderId).to.be.not.null;
      expect(res.body.url).to.be.not.null;
      let str_ordrId = res.body.orderId;
      expect(res.body.url).contains(str_ordrId);
      done();
      res_url = res.body.url;
    });
  });

  it('TC-08 : Name,Phone,Extra - Blank : No Specified chain or currency', (done) => {
    cy.request({
      method: requestAPI.method,
      url: baseurl + requestAPI.url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'zoksh-key': zokshKey,
        'zoksh-ts': zokshTimestamp,
        'zoksh-sign': zokshSign,
      },
      body: requestAPI.body,
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body.orderId).to.be.not.null;
      expect(res.body.url).to.be.not.null;
      let str_ordrId = res.body.orderId;
      expect(res.body.url).contains(str_ordrId);
      done();
      res_url = res.body.url;
    });
  });

  afterEach(() => {
    cy.visit(res_url);
    cy.wait(10000);

    getProfileText().contains('You are making a payment to');
    getNameField().should('have.value', post_Body[count - 1].prefill.name);
    getEmailField().should('have.value', post_Body[count - 1].prefill.email);
  });
});
