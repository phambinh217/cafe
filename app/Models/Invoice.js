'use strict'

const Model = use('App/Lucid/Model')

class Invoice extends Model {
    items () {
        return this.hasMany('App/Models/InvoiceItem', 'id', 'invoice_id')
    }
}

module.exports = Invoice
