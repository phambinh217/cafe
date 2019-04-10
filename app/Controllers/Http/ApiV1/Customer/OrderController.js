'use strict'

const OrderValidator = use('App/Validators/Customer/OrderValidator')
const InvoiceRepo = use('App/Repos/Customer/InvoiceRepo')
const CustomerRequestRepo = use('App/Repos/Customer/CustomerRequestRepo')
const CustomerRepo = use('App/Repos/Customer/CustomerRepo')
const Event = use('Event')

class OrderController {
    async orderFood ({ auth, request, response }) {
        const validator = await OrderValidator.orderFood(request.post())

        if (validator.fails()) {
            return response.status(406).json({
                success: false,
                message: 'Fail',
                errors: validator.messages()
            })
        }

        const foods = request.post().foods
        const invoice = await CustomerRepo.findOrCreateLatestInvoice(auth.user)
        const addedItems = []

        for (let item of foods) {
            let addedItem = await InvoiceRepo.addInvoiceItem(invoice.id, item.id, item.quantity)
            addedItems.push(addedItem)
        }

        CustomerRequestRepo.createRequestOrderFood(auth.user.id, foods, addedItems)

        Event.fire('customer::orderFood', { userId: auth.user.id, foods: foods })

        return response.json({
            success: true,
            message: 'Done'
        })
    }

    orderGift ({ auth, request, response }) {

    }
}

module.exports = OrderController