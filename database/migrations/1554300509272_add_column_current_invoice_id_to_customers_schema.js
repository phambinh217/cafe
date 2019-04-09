'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnCurrentInvoiceIdToCustomersSchema extends Schema {
  up () {
    this.table('customers', (table) => {
      table.integer('current_invoice_id')
    })
  }

  down () {
    this.table('customers', (table) => {
      table.dropColumn('current_invoice_id')
    })
  }
}

module.exports = AddColumnCurrentInvoiceIdToCustomersSchema
