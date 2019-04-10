'use strict'

const Hash = use('Hash')
const Model = use('App/Lucid/Model')

class Customer extends Model {
    static get hidden () {
        return ['password', 'remember_token']
    }

    static get computed () {
        return ['name']
    }

    requests () {
        return this.hasMany('App/Models/CustomerRequest')
    }

    notifications () {
        return this.hasMany('App/Models/CustomerNotification')
    }

    tokens () {
        return this.hasMany('App/Models/CustomerToken')
    }

    getName ({ first_name, last_name }) {
        return `${first_name} ${last_name}`.trim()
    }

    table () {
        return this.belongsTo('App/Models/Table', 'current_table_id')
    }

    invoices () {
        return this.hasMany('App/Models/Invoice', 'id', 'customer_id')
    }

    connections () {
        return this.hasMany('App/Models/CustomerConnection', 'id', 'customer1_id')
    }
}

module.exports = Customer
