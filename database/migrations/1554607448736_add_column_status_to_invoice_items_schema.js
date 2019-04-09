'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnStatusToInvoiceItemsSchema extends Schema {
  up () {
    this.table('invoice_items', (table) => {
      table.string('status').nullable()
      table.text('metas').nullable()
    })
  }

  down () {
    this.table('invoice_items', (table) => {
      table.dropColumn('status')
      table.dropColumn('metas')
    })
  }
}

module.exports = AddColumnStatusToInvoiceItemsSchema
