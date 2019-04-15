'use strict'

const Table = use('App/Models/Table')
const Config = use('Config')

class TableRepo {
    /**
     * Lấy danh sách các bàn trong nhà hàng
     * Kèm theo thông tin khách đang bật chế độ công khai
     */
    static async list (options) {
        options = { ...{ per_page: 20 }, ...options }
        let query = Table.query()

        if (options.hasOwnProperty('ignore_ids')) {
            if (typeof options.ignore_ids == 'string' && options.ignore_ids.length > 0) {
                options.ignore_ids = options.ignore_ids.split(',').map(id => id.trim())
            }

            if (Array.isArray(options.ignore_ids) && options.ignore_ids.length > 0) {
                query = query.whereNotIn('id', options.ignore_ids)
            }
        }

        return await query
            .with('people')
            .limit(options.per_page)
            .fetch()
    }
}

module.exports = TableRepo