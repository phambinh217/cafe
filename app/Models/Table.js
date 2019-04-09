'use strict'

const Model = use('App/Lucid/Model')

class Table extends Model {
    people () {
        return this.hasMany('App/Models/Customer', 'id', 'current_table_id')
    }
}

module.exports = Table
