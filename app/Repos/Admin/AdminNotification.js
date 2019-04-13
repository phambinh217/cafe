'use strict'

const AdminRepo = use('App/Repos/Admin/AdminRepo')
const WebsocketService = use('App/Services/WebsocketService')

class AdminNotification {
    static async sendToAllAdmins (data) {
        const admins = await AdminRepo.all()
        data = {...data, ...{ is_checked: false, scope: 'all' }}
        for (let admin of admins.rows) {
            admin.notifications().create(data)
            WebsocketService.sendToUser('admin', admin.id)
        }
    }
}

module.exports = AdminNotification