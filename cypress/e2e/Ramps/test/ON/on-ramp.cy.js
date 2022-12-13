/// <reference types = "Cypress" />

import {
  btnFiatCurrency,
  inputSelectCurrency,
  currencysign,
  getIssuedOnDate,
  getPaymentDueDate,
} from '../../../../support/object-repo';

describe('Ramp On aggregator validation', () => {
  before(() => {
    cy.visit('https://pay.testnet.zoksh.com/ramps');
    cy.url().should('include', '/ramps');
  });

  it('Validate Fiat currency and currency sign', () => {

    //Select fiat as EUR
    btnFiatCurrency().click({ force: true })
    inputSelectCurrency().type('EUR')
    cy.get('div.li.li-currency.MuiBox-root.css-5hut7e').eq(0).find('div[role="button"]').click({force: true})
    cy.wait(3000)
    currencysign().should('have.text','€')

    //Select fiat as USD
    btnFiatCurrency().click({ force: true })
    inputSelectCurrency().type('USD')
    cy.get('div.li.li-currency.MuiBox-root.css-5hut7e').eq(0).find('div[role="button"]').click({force: true})
    cy.wait(3000)
    currencysign().should('have.text','$')

     //Select fiat as GBP
     btnFiatCurrency().click({ force: true })
     inputSelectCurrency().type('GBP')
     cy.get('div.li.li-currency.MuiBox-root.css-5hut7e').eq(0).find('div[role="button"]').click({force: true})
     cy.wait(3000)
     currencysign().should('have.text','£')

     //Select fiat as CHF
     btnFiatCurrency().click({ force: true })
     inputSelectCurrency().type('CHF')
     cy.get('div.li.li-currency.MuiBox-root.css-5hut7e').eq(0).find('div[role="button"]').click({force: true})
     cy.wait(3000)
     currencysign().should('have.text','CHF')

     //Select fiat as SEK
     btnFiatCurrency().click({ force: true })
     inputSelectCurrency().type('SEK')
     cy.get('div.li.li-currency.MuiBox-root.css-5hut7e').eq(0).find('div[role="button"]').click({force: true})
     cy.wait(3000)
     currencysign().should('have.text','kr')

    //Select fiat as PLN
    btnFiatCurrency().click({ force: true })
    inputSelectCurrency().type('PLN')
    cy.get('div.li.li-currency.MuiBox-root.css-5hut7e').eq(0).find('div[role="button"]').click({force: true})
    cy.wait(3000)
    currencysign().should('have.text','zł')



  });

});
