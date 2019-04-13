'use strict'

const Model = use('App/Lucid/Model')

class Admin extends Model {
    static get hidden () {
        return ['password', 'remember_token']
    }

    tokens () {
        return this.hasMany('App/Models/AdminToken')
    }

    notifications () {
        return this.hasMany('App/Models/AdminNotification')
    }
}

module.exports = Admin
