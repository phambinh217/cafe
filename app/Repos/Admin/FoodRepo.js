'use strict'

const Food = use('App/Models/Food')

class FoodRepo {
    static async list (options) {
        options = { ...{ per_page: 20 }, ...options }
        let query = Food.query()

        if (options.hasOwnProperty('ignore_ids')) {
            if (typeof options.ignore_ids == 'string' && options.ignore_ids.length > 0) {
                options.ignore_ids = options.ignore_ids.split(',').map(id => id.trim())
            }

            if (Array.isArray(options.ignore_ids) && options.ignore_ids.length > 0) {
                query = query.whereNotIn('id', options.ignore_ids)
            }
        }

        return await query.limit(options.per_page).fetch()
    }
}

module.exports = FoodRepo