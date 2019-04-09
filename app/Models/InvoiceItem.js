'use strict'

const Model = use('App/Lucid/Model')

class InvoiceItem extends Model {
    invoice () {
        return this.belongsTo('App/Models/Invoice', 'id', 'invoice_id')
    }
}

module.exports = InvoiceItem
