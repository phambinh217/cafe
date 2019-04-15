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

        return await query.with('assigner').limit(options.per_page).fetch()
    }
}
module.exports = CustomerRequestRepo