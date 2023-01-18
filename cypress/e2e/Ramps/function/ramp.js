/// <reference types = "Cypress" />

const walletinfo = require('..//test-data/walletinfo.test-data');

import {
  btnFiatCurrency,
  inputSelectCurrency,
  firstitemselectcurr,
  currencysign,
  dropCryptoCurrency,
  firsttokenselect,
  YourName,
  Email,
  wallet
} from '../../../support/object-repo';

// Validate Currency and symbol
export function validateCurrandSymbol( Curr, Symb) {
  btnFiatCurrency().click({ force: true })
  inputSelectCurrency().type(Curr)
  firstitemselectcurr().click({force: true})
  cy.wait(3000)
  currencysign().should('have.text',Symb)
}

// Select crypto token from dropdown
export function SelectToken( tok,symb) {
  dropCryptoCurrency().click({ force: true })
  inputSelectCurrency().type(tok)
  firsttokenselect().click({force: true})
  cy.wait(2000)
}

// Click token button
export function ClickButton(btn) {
  cy.get('button').contains(btn).click({force:true});
  cy.wait(2000)
}

//Enter wallet info
export function Enterwalletinfo() {
  YourName().type(walletinfo.name).should('have.value',walletinfo.name)
  Email().type(walletinfo.email).should('have.value',walletinfo.email)
  wallet().type(walletinfo.wallet).should('have.value',walletinfo.wallet)
  cy.wait(2000)
} 
