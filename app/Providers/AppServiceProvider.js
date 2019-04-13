'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const WebsocketService = use('App/Services/WebsocketService')

class AppServiceProvider extends ServiceProvider {
    register () {
        this.app.singleton('App/Services/WebsocketService', function (app) {
            return new WebsocketService
        })
    }

    boot () {

    }
}

module.exports = AppServiceProvider