'use strict'

const AdminNotification = use('App/Repos/Admin/AdminNotification')

class CustomerListener {
    async orderFood ({ customerId, foods }) {
        AdminNotification.sendToAllAdmins()
    }
}

module.exports = CustomerListener
