'use strict'

const Model = use('App/Lucid/Model')

class Floor extends Model {
    tables () {
        return this.hasMany('App/Models/Table')
    }
}

module.exports = Floor
