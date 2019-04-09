'use strict'

const InvoiceItem = use('App/Models/InvoiceItem')
const Food = use('App/Models/Food')

class InvoiceRepo {
    static async create () {

    }

    static async pay (invoiceId, data) {

    }

    static async addInvoiceItem (invoiceId, foodId, quantity) {
        let food = await Food.find(foodId)
        return await InvoiceItem.create({
            invoice_id: invoiceId,
            title: food.title,
            price: food.price,
            quantity: quantity
        })
    }

    static async updateInvoiceItem (invoiceItemId, data) {

    }

    static async deleteInvoiceItem (invoiceItemId) {

    }
}

module.exports = InvoiceRepo