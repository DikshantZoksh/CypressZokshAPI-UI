/// <reference types = "Cypress" />


import {
  btnFiatCurrency,
  inputSelectCurrency,
  firstitemselectcurr,
  currencysign,
  dropCryptoCurrency,
  firsttokenselect
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

