export const getProfileText = () => cy.get('p.profile__text__subheader');
export const getNameField = () => cy.get('input[name="name"]');
export const getEmailField = () => cy.get('input[name="email"]');

//Object from Dashboard Login page
export const getEmailLogin = () => cy.get('input#email');
export const getPasswordLogin = () => cy.get('input#password')
export const getButtonLogin = () => cy.get('button[type = submit]')

//Object from Dasboard page
export const getInvoiceLink = () => cy.get('a[href ="/invoices"]')
export const getProfileButton = () => cy.get("button[aria-label='account of current user']")
export const getLogoutButton = () => cy.get("li[aria-label='signout']")



//Object from Dashboard > Invoice page >Payee information
export const getCreateInvoiceButton = () => cy.get("button[aria-label$='Create Invoice']")
export const getSelectPayeeButton = () => cy.get("button[aria-label$='Select payee']")
export const getCustomerListTable = () => cy.get("table[aria-label$='Customer List']")
export const getCloseButton = () => cy.get("button[aria-label$='close']")
export const getAddPayeeButton = () => cy.get('button').contains('Add Payee')
export const getCompanyField = () => cy.get("input[name='organisation']")
export const getMoredetailsButton = () => cy.get('button').contains('Fill More details')
export const getFirstNameField = () => cy.get("input[name='name']")
export const getButtonSubmit = () => cy.get('button').contains('Submit')
export const getButtonUpdate = () => cy.get('button').contains('Update')