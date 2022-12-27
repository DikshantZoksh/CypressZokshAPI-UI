/// <reference types = "Cypress" />

import {
  validateCurrandSymbol,
  SelectToken
} from '../../function/ramp';

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
    //Select fiat as DKK
    validateCurrandSymbol('DKK','kr.')
    //Select fiat as NZD
    validateCurrandSymbol('NZD','$')
    //Select fiat as NOK
    validateCurrandSymbol('MXN','$')
    //Select fiat as CAD
    validateCurrandSymbol('CAD','CA$')
    //Select fiat as AUD
    validateCurrandSymbol('AUD','AU$')
    //Select fiat as BRL
    validateCurrandSymbol('BRL','R$')
    //Select fiat as AUD
    validateCurrandSymbol('AUD','AU$')
    //Select fiat as AUD
    validateCurrandSymbol('AUD','AU$')
    //Select fiat as CLP
    validateCurrandSymbol('CLP','CLP$')

  });

  it('Select token', () => {

  validateCurrandSymbol('EUR','€')
  SelectToken('ETH')


  });




});
