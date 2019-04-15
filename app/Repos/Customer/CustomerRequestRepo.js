'use strict'

const CustomerRequest = use('App/Models/CustomerRequest')
const Food = use('App/Models/Food')
const Table = use('App/Models/Table')
const InvoiceItem = use('App/Models/InvoiceItem')
const Config = use('Config')

class CustomerRequestRepo {
    static async list (customerId, options) {
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

        return await query.with('assigner').where('customer_id', customerId).limit(options.per_page).fetch()
    }

    static async createRequestOrderFood (customer, foods, items, tableId) {
        const fetchedFoods = await Food.query().setVisible(['id', 'title', 'price']).whereIn('id', foods.map(f => f.id)).fetch()
        const requestTitleSegments = []
        for (let item of fetchedFoods.toJSON()) {
            let quantity = foods.find(f => f.id == item.id).quantity
            requestTitleSegments.push(`${quantity} ${item.title}`)
        }

        const tables = await Table.query().setVisible(['id', 'title']).where('id', tableId).fetch()
        const table = tables.first()
        const title = requestTitleSegments.join(', ') + ` tới bàn ${table.title}`

        return await customer.requests().create({
            title: title,
            status: Config.get('customerRequest.status.new'),
            type: Config.get('customerRequest.type.order_food'),
            metas: {
                foods: fetchedFoods.toJSON(),
                table: table.toJSON(),
                invoiceItemIds: items.map(i => i.id)
            },
        })
    }

    /**
     * Kiểm tra xem 1 request có thể bị hủy không
     * 1 Request có thể bị hủy khi nó là yêu cầu mới
     */
    static async cancelable (request) {
        return request.status == Config.get('customerRequest.status.new')
    }

    static async cancel (request) {
        if (request.status == Config.get('customerRequest.status.cancel')) {
            return
        }

        request.status = Config.get('customerRequest.status.cancel')
        request.save()

        if (request.type == Config.get('customerRequest.type.order_food')) {
            const metas = request.metas ? JSON.parse(request.metas) : {}
            if (metas.hasOwnProperty('invoiceItemIds')) {
                const invoiceItems = await InvoiceItem.query().whereIn('id', metas.invoiceItemIds).fetch()
                for (let invoiceItem of invoiceItems.rows) {
                    invoiceItem.status = Config.get('invoice.item.status.cancel')
                    const cancelAt = new Date()
                    invoiceItem.metas = {
                        cancelAt: cancelAt.toLocaleString(),
                        cancelReason: 'Hủy từ yêu cầu của khách hàng'
                    }
                    await invoiceItem.save()
                }
            }
        }
    }
}

module.exports = CustomerRequestRepo
