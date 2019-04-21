'use strict'

const CustomerRequest = use('App/Models/CustomerRequest')
const Database = use('Database')

class CustomerRequestRepo {
    static async count (options) {
        const query = this.query(options)
        return await query.getCount()
    }

    static query (options) {
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

        if (options.hasOwnProperty('customer_ids')) {
            if (typeof options.customer_ids == 'string' && options.customer_ids.length > 0) {
                options.customer_ids = options.customer_ids.split(',').map(id => id.trim())
            }

            if (Array.isArray(options.customer_ids) && options.customer_ids.length > 0) {
                query = query.whereIn('customer_id', options.customer_ids)
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
                case 'position-desc':
                    query = query.orderBy('position', 'desc')
                    break;
                case 'position-asc':
                    query = query.orderBy('position', 'asc')
                    break;
                case 'oldest':
                    query = query.orderBy('updated_at', 'asc')
                    break;
            }
        }

        return query
    }

    static async list (options) {
        const query = this.query(options)

        return await query
            .with('customer')
            .with('assigner')
            .limit(options.per_page)
            .fetch()
    }

    static async update (customerRequest, data) {
        customerRequest.merge(data)
        await customerRequest.save()
        return customerRequest
    }

    static async find (requestId) {
        return (await CustomerRequest.query().where('id', requestId).with('customer').fetch()).first()
    }

    static async updatePositions (positions) {
        for (let position in positions) {
            let id = positions[position]
            await Database.table('customer_requests').where('id', id).update({ position: position })
        }
    }
}
module.exports = CustomerRequestRepo