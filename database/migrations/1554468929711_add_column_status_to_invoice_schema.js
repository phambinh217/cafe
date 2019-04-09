'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnStatusToInvoiceSchema extends Schema {
  up () {
    this.table('invoices', (table) => {
      table.string('status').nullable()
    })
  }

  down () {
    this.table('invoices', (table) => {
      table.dropColumn('status')
    })
  }
}

module.exports = AddColumnStatusToInvoiceSchema
