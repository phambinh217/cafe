'use strict'

const Hash = use('Hash')
const Model = use('App/Lucid/Model')

class CustomerRequest extends Model {
    assigner () {
        return this.belongsTo('App/Models/Admin', 'assign_admin_id')
    }

    customer () {
        return this.belongsTo('App/Models/Customer', 'customer_id')
    }
}

module.exports = CustomerRequest
