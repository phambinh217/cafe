'use strict'

const AdminNotification = use('App/Repos/Admin/AdminNotification')

class CustomerListener {
    async orderFood ({ customer, foods, tableId, customerRequest }) {
        customer = customer.toJSON()

        const data = {
            title: customer.name,
            content: customerRequest.title,
            type: 'new_order',
            metas: {
                source: {
                    type: 'customer_request',
                    id: customerRequest.id
                },
                customerId: customer.id,
                orderType: 'food',
            }
        }
        AdminNotification.sendToAllAdmins(data)
    }
}

module.exports = CustomerListener
