'use strict'

const Customer = use('App/Models/Customer')
const CustomerConnection = use('App/Models/CustomerConnection')

class CustomerRepo {
    static async list (options) {
        options = { ...{ per_page: 20 }, ...options }
        let query = Customer.query()

        if (options.hasOwnProperty('ignore_ids')) {
            if (typeof options.ignore_ids == 'string') {
                options.ignore_ids = options.ignore_ids.split(',').map(id => id.trim())
            }
            query = query.whereNotIn('id', options.ignore_ids)
        }

        return await query.limit(options.per_page).fetch()
    }

    static async all () {
        return await Customer.all()
    }

    static async isConnecting (customerId) {
        const connections = await CustomerConnection.query()
            .where('customer1_id', customerId)
            .orWhere('customer2_id', customerId)
            // .where('accepted', 1)
            .where('status', 'connecting')
            .fetch()

        return connections.size() > 0
    }
}

module.exports = CustomerRepo