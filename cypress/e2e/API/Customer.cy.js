/// <reference types = "Cypress" />

const { generateRequestAuthHeaders } = require('../../pre-request')
const environments = require('../../environments')
const cust = require('../../fixtures/Customer.json')
const { apiAuth,versions,custAPIurl,bearerToken } = environments.testnet

let post_Body = JSON.parse(JSON.stringify(cust))

let requestapi = {};
let count = 0;


describe('Customer API Tests', () => {

    let zokshkey
    let zokshts
    let zokshsign

    beforeEach(() => {

        console.log("BeforeEach Hook started :" + count)
        post_Body = JSON.parse(JSON.stringify(cust));
        count = count + 1;
        requestapi = {
            url: '/api/v1/customers',
            method: 'POST',
            body: post_Body[count - 1],
            headers: {}
        };

        let authHeaders = generateRequestAuthHeaders(requestapi, apiAuth, versions);
        zokshkey = authHeaders['zoksh-key'];
        zokshts = authHeaders['zoksh-ts'];
        zokshsign = authHeaders['zoksh-sign'];
    })

    it('TC-01 : Create a customer with Primary details and validate the data in response ', (done) => {
        cy.request({
            method: requestapi.method,
            url: custAPIurl + requestapi.url,
            headers: {
                'Authorization' : 'Bearer ' + bearerToken ,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'zoksh-key': zokshkey,
                'zoksh-ts': zokshts,
                'zoksh-sign': zokshsign
            },
            body: requestapi.body
        }).then((res) => {
            expect(res.status).to.be.equal(200)
            expect(res.body.success).to.be.equal(true)
            expect(res.body.data.customer._id).to.be.not.null
            expect(res.body.data.customer.name).to.be.equal(post_Body[count-1].name)
            expect(res.body.data.customer.email).to.be.equal(post_Body[count-1].email)
            expect(res.body.data.customer.organisation).to.be.equal(post_Body[count-1].organisation)
            expect(res.body.data.customer.merchant).to.be.equal(post_Body[count-1].merchant)
            done();
            
        });     
    });

    it('TC-02 : Create a customer with Primary and secornday details and validate the data in response ', (done) => {
        cy.request({
            method: requestapi.method,
            url: custAPIurl + requestapi.url,
            headers: {
                'Authorization' : 'Bearer ' + bearerToken ,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'zoksh-key': zokshkey,
                'zoksh-ts': zokshts,
                'zoksh-sign': zokshsign
            },
            body: requestapi.body
        }).then((res) => {
            expect(res.status).to.be.equal(200)
            expect(res.body.success).to.be.equal(true)
            expect(res.body.data.customer._id).to.be.not.null
            expect(res.body.data.customer.name).to.be.equal(post_Body[count-1].name)
            expect(res.body.data.customer.email).to.be.equal(post_Body[count-1].email)
            expect(res.body.data.customer.address[0]).to.be.equal(post_Body[count-1].address[0])
            expect(res.body.data.customer.address[1]).to.be.equal(post_Body[count-1].address[1])
            expect(res.body.data.customer.organisation).to.be.equal(post_Body[count-1].organisation)
            expect(res.body.data.customer.pin).to.be.equal(post_Body[count-1].pin)
            expect(res.body.data.customer.city).to.be.equal(post_Body[count-1].city)
            expect(res.body.data.customer.state).to.be.equal(post_Body[count-1].state)
            expect(res.body.data.customer.country).to.be.equal(post_Body[count-1].country)
            expect(res.body.data.customer.merchant).to.be.equal(post_Body[count-1].merchant)
            done();
        });     
    }).timeout(10000);
});
