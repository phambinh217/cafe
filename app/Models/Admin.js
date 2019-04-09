'use strict'

const Model = use('App/Lucid/Model')

class Admin extends Model {
    static get hidden () {
        return ['password', 'remember_token']
    }
}

module.exports = Admin
