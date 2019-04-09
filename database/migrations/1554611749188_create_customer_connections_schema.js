'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateCustomerConnectionsSchema extends Schema {
  up () {
    this.create('customer_connections', (table) => {
      table.increments()
      table.integer('customer1_id')
      table.integer('customer2_id')
      table.string('status').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('customer_connections')
  }
}

module.exports = CreateCustomerConnectionsSchema
