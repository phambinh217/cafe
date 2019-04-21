'use strict'

const AdminNotification = use('App/Repos/Admin/AdminNotification')
const CustomerRepo = use('App/Repos/Customer/CustomerRepo')

class CustomerListener {
    async orderFood ({ customer, foods, tableId, customerRequest }) {
        CustomerRepo.update(customer, { current_table_id: tableId })

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
