'use strict'

const Customer = use('App/Models/Customer')

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
}

module.exports = CustomerRepo