/// <reference types = "Cypress" />

import {
  validateCurrandSymbol
} from '../../function/ramp';

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
    validateCurrandSymbol('EUR','€')
    //Select fiat as USD
    validateCurrandSymbol('USD','$')
    //Select fiat as GBP
    validateCurrandSymbol('GBP','£')
     //Select fiat as CHF
    validateCurrandSymbol('CHF','CHF')
    //Select fiat as SEK
    validateCurrandSymbol('SEK','kr')
    //Select fiat as PLN
    validateCurrandSymbol('PLN','zł')
    //Select fiat as NOK
    validateCurrandSymbol('NOK','kr')
    
  });

});
