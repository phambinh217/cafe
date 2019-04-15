'use strict'

const CustomerRequest = use('App/Models/CustomerRequest')

class CustomerRequestRepo {
    static async list (options) {
        options = { ...{ per_page: 20 }, ...options }
        let query = CustomerRequest.query()

        if (options.hasOwnProperty('ignore_ids')) {
            if (typeof options.ignore_ids == 'string' && options.ignore_ids.length > 0) {
                options.ignore_ids = options.ignore_ids.split(',').map(id => id.trim())
            }

            if (Array.isArray(options.ignore_ids) && options.ignore_ids.length > 0) {
                query = query.whereNotIn('id', options.ignore_ids)
            }
        }

        if (options.hasOwnProperty('status')) {
            query = query.where('status', options.status)
        }

        if (options.hasOwnProperty('sort')) {
            switch (options.sort) {
                case 'latest':
                    query = query.orderBy('updated_at', 'desc')
                    break;
                case 'oldest':
                    query = query.orderBy('updated_at', 'asc')
                    break;
            }
        }

        return await query.with('assigner').limit(options.per_page).fetch()
    }

    static async update (customerRequest, data) {
        customerRequest.merge(data)
        await customerRequest.save()
        return customerRequest
    }

    static async find (requestId) {
        return await CustomerRequest.find(requestId)
    }
}
module.exports = CustomerRequestRepo