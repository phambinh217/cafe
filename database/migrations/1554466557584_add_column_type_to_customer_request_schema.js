'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnTypeToCustomerRequestSchema extends Schema {
  up () {
    this.table('customer_requests', (table) => {
      table.string('type').nullable()
    })
  }

  down () {
    this.table('customer_requests', (table) => {
      table.dropColumn('type')
    })
  }
}

module.exports = AddColumnTypeToCustomerRequestSchema
