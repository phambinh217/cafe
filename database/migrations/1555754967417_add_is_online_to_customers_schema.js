'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddIsOnlineToCustomersSchema extends Schema {
  up () {
    this.table('customers', (table) => {
      table.boolean('is_online').default(false)
    })
  }

  down () {
    this.table('customers', (table) => {
      table.dropColumn('is_online')
    })
  }
}

module.exports = AddIsOnlineToCustomersSchema
