'use strict'

const Customer = use('App/Models/Customer')
const CustomerRequest = use('App/Models/CustomerRequest')
const Invoice = use('App/Models/Invoice')
const CustomerConnection = use('App/Models/CustomerConnection')
const Config = use('Config')

class CustomerRepo {
    static async findByEmail (email) {
        return await Customer.findBy('email', email)
    }

    static async findByPhone (phone) {
        return await Customer.findBy('phone', phone)
    }

    static async setTable (customer, tableId) {
        return await customer.update({ current_table_id: tableId })
    }

    static async findLatestInvoice (customer) {
        const invoices = await Invoice.query()
            .where('status', Config.get('invoice.status.new'))
            .where('customer_id', customer.id)
            .with('items')
            .orderBy('id', 'desc')
            .limit(1)
            .fetch()

        if (invoices.size () > 0) {
            return invoices.first()
        }
    }

    static async findOrCreateLatestInvoice (customer) {
        const invoices = await Invoice.query()
            .where('status', Config.get('invoice.status.new'))
            .where('customer_id', customer.id)
            .orderBy('id', 'desc')
            .limit(1)
            .fetch()

        if (invoices.size() > 0) {
            return invoices.first()
        }

        return await Invoice.create({
            customer_id: customer.id,
            customer_name: customer.name,
            status: Config.get('invoice.status.new'),
        })
    }

    static async hasRequest (customer, requestId) {
        const request = await CustomerRequest.query().where('customer_id', customer.id).where('id', requestId).fetch()
        return !!request
    }

    static async updateSettings (customer, settings) {
        let options = customer.options ? JSON.parse(customer.options) : {}
        options = {... options, ...settings}
        customer.options = options

        if (options.hasOwnProperty('social_network_status')) {
            customer.social_network_status = options.social_network_status
        }

        return await customer.save()
    }

    static async update (customer, data) {
        customer.merge(data)
        return await customer.save()
    }

    static async connect () {

    }

    static async isConnecting (customerId) {
        const connections = await CustomerConnection.query()
            .where('customer1_id', customerId)
            .orWhere('customer2_id', customerId)
            .where('accepted', 1)
            .where('status', 'connecting')
            .fetch()

        return connections.size() > 0
    }
}

module.exports = CustomerRepo