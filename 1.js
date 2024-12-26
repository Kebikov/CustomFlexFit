

/**
 * @typedef Invoice
 * @property {number} amount
 * 
 * @typedef MailInvoiceExtra
 * @property {string} email
 * 
 * @typedef AddressInvoiceExtra
 * @property {string} address
 * 
 * @typedef {Invoice & MailInvoiceExtra} MailInvoice
 * @typedef {Invoice & AddressInvoiceExtra} AddressInvoice
 */

/** @type {MailInvoice} */
const mailInvoice = {
    amount: 1,
    email: '@mail'
  }