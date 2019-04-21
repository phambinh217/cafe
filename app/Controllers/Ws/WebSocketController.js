'use strict'

const WebsocketService = use('App/Services/WebsocketService')
const Admin = use('App/Models/Admin')
const Customer = use('App/Models/Customer')

class WebsocketController {
    constructor ({ auth, socket, request }) {
        this.socket = socket
        this.auth = auth
        const client = {
            socket: socket,
            auth: auth
        }
        WebsocketService.push(client)

        this.onOpen()
        this.timer = null
    }

    async onOpen () {
        clearTimeout(this.timer)
        if (this.auth instanceof Admin) {
            await Admin.query().where('id', this.auth.user.id).update('is_online', true)
        } else if (this.auth instanceof Customer) {
            await Customer.query().where('id', this.auth.user.id).update('is_online', true)
        }
    }

    async onClose () {
        const closeSoscketAfterMinus = 15
        this.timer = setTimeout(e => {
            if (this.auth instanceof Admin) {
                await Admin.query().where('id', this.auth.user.id).update('is_online', false)
            } else if (this.auth instanceof Customer) {
                await Customer.query().where('id', this.auth.user.id).update('is_online', false)
            }

            WebsocketService.removeBySocketId(this.socket.id)
        }, closeSoscketAfterMinus * 1000 * 60)
    }

    onError () {
        WebsocketService.removeBySocketId(this.socket.id)
    }
}

module.exports = WebsocketController
