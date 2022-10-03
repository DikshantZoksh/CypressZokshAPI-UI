/// <reference types = "Cypress" />

const { generateRequestAuthHeaders } = require('../../pre-request')
const order = require('../../fixtures/TestData.json');
const environments = require('../../environments')
const {baseurl, apiAuth, versions} = environments.testnet

let post_Body = JSON.parse(JSON.stringify(order))

let requestapi = {} ;
let count = 0;

describe('Zoksh OrderCreation API Tests', () => {

    let zokshkey
    let zokshts
    let zokshsign

    beforeEach(() => {

        console.log("BeforeEach Hook started :" + count)
        post_Body = JSON.parse(JSON.stringify(order));
        count = count + 1 ;
        //console.log("Test Flag " + count)
    
          requestapi = {
          url: '/v2/order',
          method: 'POST',
          body: post_Body[count - 1],
          headers: {}
        };

        let authHeaders = generateRequestAuthHeaders(requestapi, apiAuth, versions);
        zokshkey = authHeaders['zoksh-key'];
        zokshts = authHeaders['zoksh-ts'];
        zokshsign = authHeaders['zoksh-sign'];
    })

    it('TC-01 : Token - NA : No Specified chain or currency', (done) => {
      
        cy.request({
            method : requestapi.method ,
            url : baseurl + requestapi.url,
            headers : {
                'Accept' :  'application/json',
                'Content-Type': 'application/json',
                'zoksh-key':  zokshkey,
                'zoksh-ts': zokshts,
                'zoksh-sign': zokshsign
            },
            body : requestapi.body
        }).then((res)=>{
              //cy.log(JSON.stringify(res.body))
              expect(res.status).to.be.equal(200)
              expect(res.body.orderId).to.be.not.null
              expect(res.body.url).to.be.not.null
              let str_ordrId = res.body.orderId
              //cy.log(str_ordrId)
              expect(res.body.url).contains(str_ordrId);
              done();
              
        })
    }).timeout(10000);
    

})
