'use strict'

class WebSocketService {
    constructor () {
        this.clients = []
    }

    push (client) {
        this.clients.push(client)
    }

    removeBySocketId (socketId) {
        const index = this.clients.findIndex(client => client.socket.id == socketId)
        if (index > -1) {
            this.clients.splice(index, 1)
        }
    }

    all () {
        return this.clients
    }

    sendToUsers (type, userIds, event, data) {
        const Admin = use('App/Models/Admin')
        const Customer = use('App/Models/Customer')

        const clients = this.clients.filter(client => {
            if (type == 'admin') {
                if (client.auth.user instanceof Admin) {
                    if (userIds.indexOf(client.auth.user.id) > -1) {
                        return true
                    }
                }
            } else if (type == 'customer') {
                if (client.auth.user instanceof Customer) {
                    if (userIds.indexOf(client.auth.user.id) > -1) {
                        return true
                    }
                }
            }

            return false
        })

        if (clients.length > 0) {
            let firstClient
            for (firstClient of clients) break;
            const socketIds = clients.map(i => i.socket.id)
            firstClient.socket.emitTo(event, data, socketIds)
        }
    }
}

module.exports = WebSocketService
