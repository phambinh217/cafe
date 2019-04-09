'use strict'

const Ws = use('Ws')
const Admin = use('App/Models/Admin')
const Customer = use('App/Models/Customer')

class WebSocketService {
    static async findByUserId (userId, type) {
        const needSockets = []
        try {
            const sockets = Ws.getChannel('ws').getTopic('ws')
            for (let [key, socket] of sockets) {
                if (socket.auth.id == userId) {
                    if (type == 'admin' && socket.auth.user instanceof Admin
                        || type == 'customer' && socket.auth.user instanceof Customer
                    ) {
                        needSockets.push(socket)
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }

        return needSockets
    }

    static async broadcastTo () {

    }
}

module.exports = WebSocketService