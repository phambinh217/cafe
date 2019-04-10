'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminTokensSchema extends Schema {
  up () {
    this.create('admin_tokens', (table) => {
      table.increments()
      table.integer('admin_id').unsigned()
      table.string('token', 255).notNullable().unique().index()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('admin_tokens')
  }
}

module.exports = AdminTokensSchema
