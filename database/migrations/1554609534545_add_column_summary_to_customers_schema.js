'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnSummaryToCustomersSchema extends Schema {
  up () {
    this.table('customers', (table) => {
      table.text('summary').nullable()
      table.string('address').nullable()
      table.string('facebook').nullable()
      table.string('instagram').nullable()
      table.date('date_of_birth').nullable()
    })
  }

  down () {
    this.table('customers', (table) => {
      table.dropColumn('summary')
      table.dropColumn('address')
      table.dropColumn('facebook')
      table.dropColumn('instagram')
      table.dropColumn('date_of_birth')
    })
  }
}

module.exports = AddColumnSummaryToCustomersSchema
