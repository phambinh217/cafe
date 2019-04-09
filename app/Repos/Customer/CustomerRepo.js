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

    static async setTable (customerId, tableId) {
        return await Customer.query().where('id', customerId).update({ current_table_id: tableId })
    }

    static async findLatestInvoice (customerId) {
        const invoices = await Invoice.query()
            .where('status', Config.get('invoice.status.new'))
            .where('customer_id', customerId)
            .with('items')
            .orderBy('id', 'desc')
            .limit(1)
            .fetch()

        if (invoices.size () > 0) {
            return invoices.first()
        }
    }

    static async findOrCreateLatestInvoice (customerId) {
        const invoices = await Invoice.query()
            .where('status', Config.get('invoice.status.new'))
            .where('customer_id', customerId)
            .orderBy('id', 'desc')
            .limit(1)
            .fetch()

        if (invoices.size() > 0) {
            return invoices.first()
        }

        const customer = await Customer.find(customerId)

        return await Invoice.create({
            customer_id: customerId,
            customer_name: customer.name,
            status: Config.get('invoice.status.new'),
        })
    }

    static async hasRequest (customerId, requestId) {
        const request = await CustomerRequest.query().where('customer_id', customerId).where('id', requestId).fetch()
        return !!request
    }

    static async updateSettings (customerId, settings) {
        const customer = await Customer.find(customerId)
        let options = customer.options ? JSON.parse(customer.options) : {}
        options = {... options, ...settings}
        customer.options = options

        if (options.hasOwnProperty('social_network_status')) {
            customer.social_network_status = options.social_network_status
        }

        return await customer.save()
    }

    static async update (customerId, data) {
        const customer = await Customer.find(customerId)
        customer.merge(data)
        return await customer.save()
    }

    static async connect () {

    }

    static async isConnecting (customerId) {
        const connections = await CustomerConnection.query()
            .where('customer1_id', customeriId)
            .orWhere('customer2_id', customerId)
            .where('accepted', 1)
            .where('status', 'connecting')
            .fetch()

        return connections.size() > 0
    }
}

module.exports = CustomerRepo