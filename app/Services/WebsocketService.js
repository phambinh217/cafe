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

    sendToUser (type, userId) {

    }
}

module.exports = WebSocketService
