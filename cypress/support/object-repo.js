// <reference types = "Cypress" />

export const getProfileText = () => cy.get('p.profile__text__subheader');
export const getNameField = () => cy.get('input[name="name"]');
export const getEmailField = () => cy.get('input[name="email"]');

//Object from Dashboard Login page
export const getEmailLogin = () => cy.get('input#email');
export const getPasswordLogin = () => cy.get('input#password');
export const getButtonLogin = () => cy.get('button[type = submit]');

//Object from Dasboard page
export const getInvoiceLink = () => cy.get('a[href ="/invoices"]');
export const getProfileButton = () => cy.get("button[aria-label='account of current user']");
export const getLogoutButton = () => cy.get("li[aria-label='signout']");

//Object from Dashboard > Invoice page >Payee information
export const getCreateInvoiceButton = () => cy.get("button[aria-label$='Create Invoice']");
export const getSelectPayeeButton = () => cy.get("button[aria-label$='Select payee']");
export const getCustomerListTable = () => cy.get("table[aria-label$='Customer List']");
export const getCloseButton = () => cy.get("button[aria-label$='close']");
export const getAddPayeeButton = () => cy.get('button').contains('Add Payee');
export const getCompanyField = () => cy.get("input[name='organisation']");
export const getMoreDetailsButton = () => cy.get('button').contains('Fill More details');
export const getFirstNameField = () => cy.get("input[name='name']");
export const getButtonSubmit = () => cy.get('button').contains('Submit');
export const getButtonUpdate = () => cy.get('button').contains('Update');
export const getAddressInput = () => cy.get('input[name="address.0"]');
export const getCurrencyDropdown = () => cy.get('div.MuiBox-root.css-i3pbo').find("button[tabindex='0']");
export const getDescriptioninput = () => cy.get('input[name="invoiceInclusions.0.description"]');
export const getQuantity = () => cy.get('input[name="invoiceInclusions.0.quantity"]');
export const getUnitPrice = () => cy.get('input[name="invoiceInclusions.0.unitPrice.value"]');
export const getDiscount = () => cy.get('input[name="invoiceInclusions.0.discount.value"]');
export const getTaxPercent = () => cy.get('input[name="invoiceInclusions.0.taxPercent"]');
export const getAmtwithoutTax = () => cy.get('input[name="invoiceTotal.totalAmountWithoutTax"]');
export const getTaxAmount = () => cy.get('input[name="invoiceTotal.totalTaxAmount"]');
export const getTotalAmount = () => cy.get('input[name="invoiceTotal.totalAmount"]');
export const getAddItemButton = () => cy.get('div.MuiBox-root.css-uewl2b').find("button[tabindex='0']");

//Object from Invoice page
export const getGenerateInvoiceButton = () => cy.get('button').contains('Generate Invoice');
export const getDateIssuedOn = () => cy.get('input[placeholder="dd/mm/yyyy"]').eq(0);
export const getDatePaymentDueBy = () => cy.get('input[placeholder="dd/mm/yyyy"]').eq(1);

//Object from Read Invoice
export const getInvoiceNum = () => cy.get('div.invoice-view__identifiers__values.MuiBox-root.css-dvrkiq').eq(0);
export const getIssuedOnDate = () => cy.get('div.invoice-view__identifiers__values.MuiBox-root.css-dvrkiq').eq(1);
export const getPaymentDueDate = () => cy.get('div.invoice-view__identifiers__values.MuiBox-root.css-dvrkiq').eq(2);
