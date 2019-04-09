'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnQuantityToInvoiceItemsSchema extends Schema {
  up () {
    this.table('invoice_items', (table) => {
      table.integer('quantity').default(1)
    })
  }

  down () {
    this.table('invoice_items', (table) => {
      table.dropColumn('quantity')
    })
  }
}

module.exports = AddColumnQuantityToInvoiceItemsSchema
