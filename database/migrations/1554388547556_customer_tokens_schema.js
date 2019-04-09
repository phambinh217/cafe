'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerTokensSchema extends Schema {
  up () {
    this.create('customer_tokens', (table) => {
      table.increments()
      table.integer('customer_id').unsigned()
      table.string('token', 255).notNullable().unique().index()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('customer_tokens')
  }
}

module.exports = CustomerTokensSchema
