/// <reference types = "Cypress" />

const { generateRequestAuthHeaders } = require('../../../../pre-request');
const order = require('../test-data/order-payload.test-data');
const environments = require('../../../../environments');
const { baseurl, apiAuth, versions } = environments.testnet;
import { getProfileText, getNameField, getEmailField } from '../../../../support/object-repo';

let post_Body = JSON.parse(JSON.stringify(order));

let requestapi = {};
let count = 0;
let res_url = '';

describe('OrderCreation API Tests', () => {
  let zokshkey;
  let zokshts;
  let zokshsign;

  beforeEach(() => {
    console.log('BeforeEach Hook started :' + count);
    post_Body = JSON.parse(JSON.stringify(order));
    count = count + 1;
    requestapi = {
      url: '/v2/order',
      method: 'POST',
      body: post_Body[count - 1],
      headers: {},
    };

    let authHeaders = generateRequestAuthHeaders(requestapi, apiAuth, versions);
    zokshkey = authHeaders['zoksh-key'];
    zokshts = authHeaders['zoksh-ts'];
    zokshsign = authHeaders['zoksh-sign'];
  });

  it('TC-01 : Token - NA : No Specified chain or currency', (done) => {
    cy.request({
      method: requestapi.method,
      url: baseurl + requestapi.url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'zoksh-key': zokshkey,
        'zoksh-ts': zokshts,
        'zoksh-sign': zokshsign,
      },
      body: requestapi.body,
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
      method: requestapi.method,
      url: baseurl + requestapi.url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'zoksh-key': zokshkey,
        'zoksh-ts': zokshts,
        'zoksh-sign': zokshsign,
      },
      body: requestapi.body,
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
      method: requestapi.method,
      url: baseurl + requestapi.url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'zoksh-key': zokshkey,
        'zoksh-ts': zokshts,
        'zoksh-sign': zokshsign,
      },
      body: requestapi.body,
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
      method: requestapi.method,
      url: baseurl + requestapi.url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'zoksh-key': zokshkey,
        'zoksh-ts': zokshts,
        'zoksh-sign': zokshsign,
      },
      body: requestapi.body,
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
      method: requestapi.method,
      url: baseurl + requestapi.url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'zoksh-key': zokshkey,
        'zoksh-ts': zokshts,
        'zoksh-sign': zokshsign,
      },
      body: requestapi.body,
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
      method: requestapi.method,
      url: baseurl + requestapi.url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'zoksh-key': zokshkey,
        'zoksh-ts': zokshts,
        'zoksh-sign': zokshsign,
      },
      body: requestapi.body,
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
      method: requestapi.method,
      url: baseurl + requestapi.url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'zoksh-key': zokshkey,
        'zoksh-ts': zokshts,
        'zoksh-sign': zokshsign,
      },
      body: requestapi.body,
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
      method: requestapi.method,
      url: baseurl + requestapi.url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'zoksh-key': zokshkey,
        'zoksh-ts': zokshts,
        'zoksh-sign': zokshsign,
      },
      body: requestapi.body,
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
