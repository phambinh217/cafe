'use strict'

const WebsocketService = use('App/Services/WebsocketService')

class WebsocketController {
    constructor ({ auth, socket, request }) {
        this.socket = socket
        const clients = {
            socket: socket,
            auth: auth
        }

        WebsocketService.push(clients)
    }

    onClose () {
        WebsocketService.removeBySocketId(this.socket.id)
    }

    onError () {
        WebsocketService.removeBySocketId(this.socket.id)
    }
}

module.exports = WebsocketController
