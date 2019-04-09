'use strict'

class WebSocketController {
    constructor ({ auth, socket, request }) {
        this.socket.auth = auth
    }
}

module.exports = WebSocketController
