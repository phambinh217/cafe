'use strict'

const Floor = use('App/Models/Floor')

class FloorRepo {
    static async list (options) {
        options = { ...{ per_page: 20 }, ...options }
        let query = Floor.query()

        if (options.hasOwnProperty('ignore_ids')) {
            if (typeof options.ignore_ids == 'string') {
                options.ignore_ids = options.ignore_ids.split(',').map(id => id.trim())
            }
            query = query.whereNotIn('id', options.ignore_ids)
        }

        return await query.limit(options.per_page).fetch()
    }

    static async all () {
        return await Floor.all()
    }
}

module.exports = FloorRepo