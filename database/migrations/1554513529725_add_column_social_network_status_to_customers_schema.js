'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnSocialNetworkStatusToCustomersSchema extends Schema {
  up () {
    this.table('customers', (table) => {
      table.string('social_network_status').nullable()
      table.string('options').nullable()
    })
  }

  down () {
    this.table('customers', (table) => {
      table.dropColumn('social_network_status')
      table.dropColumn('options')
    })
  }
}

module.exports = AddColumnSocialNetworkStatusToCustomersSchema
