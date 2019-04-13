'use strict'

const WebsocketService = use('App/Services/WebsocketService')

class PusherController {
    /**
     * Liệt kê danh sách các client đang kết nối
     */
    async listClient ({ auth, request, response }) {
        const clients = WebsocketService.all()

        return response.json({
            success: true,
            message: 'Done',
            clients: clients
        })
    }
}

module.exports = PusherController