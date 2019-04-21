'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddIsOnlineToAdminsSchema extends Schema {
  up () {
    this.table('admins', (table) => {
      table.boolean('is_online').default(false)
    })
  }

  down () {
    this.table('admins', (table) => {
      table.dropColumn('is_online')
    })
  }
}

module.exports = AddIsOnlineToAdminsSchema
