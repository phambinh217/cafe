'use strict'

const WebsocketService = use('App/Services/WebsocketService')

class WebsocketController {
    constructor ({ auth, socket, request }) {
        this.socket = socket
        const client = {
            socket: socket,
            auth: auth
        }
        WebsocketService.push(client)
    }

    onClose () {
        WebsocketService.removeBySocketId(this.socket.id)
    }

    onError () {
        WebsocketService.removeBySocketId(this.socket.id)
    }
}

module.exports = WebsocketController
