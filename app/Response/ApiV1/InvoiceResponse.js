'use strict'

class InvoiceResponse {
    static async currentInvoice (invoice) {
        const formatedInvoice = invoice.toJSON()
        console.log(formatedInvoice.items)
        delete formatedInvoice.delete_at

        formatedInvoice.items.map(item => {
            delete item.updated_at
            return item
        })

        return formatedInvoice
    }
}

module.exports = InvoiceResponse
