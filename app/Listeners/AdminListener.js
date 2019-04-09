'use strict'

const CustomerNotification = use('App/Repos/Customer/CustomerNotification')

class AdminListener {
    async handledRequest () {
        CustomerNotification.sendToCustomer()
    }
}

module.exports = CustomerListener