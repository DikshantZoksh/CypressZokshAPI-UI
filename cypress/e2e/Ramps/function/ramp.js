/// <reference types = "Cypress" />


import {
  btnFiatCurrency,
  inputSelectCurrency,
  firstitemselectcurr,
  currencysign
} from '../../../support/object-repo';

// Validate Currency and symbol
export function validateCurrandSymbol( Curr, Symb) {
  btnFiatCurrency().click({ force: true })
  inputSelectCurrency().type(Curr)
  firstitemselectcurr().click({force: true})
  cy.wait(3000)
  currencysign().should('have.text',Symb)
}

