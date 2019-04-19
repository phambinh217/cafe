'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddPositionColumnToCustomerRequestsSchema extends Schema {
  up () {
    this.table('customer_requests', (table) => {
      table.float('position').nullable()
      table.datetime('archived_at').nullable()
    })
  }

  down () {
    this.table('customer_requests', (table) => {
      table.dropColumn('position')
      table.dropColumn('archived_at')
    })
  }
}

module.exports = AddPositionColumnToCustomerRequestsSchema
