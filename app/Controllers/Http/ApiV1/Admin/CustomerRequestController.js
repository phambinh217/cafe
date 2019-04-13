'use strict'

const CustomerRequestRepo = use('App/Repos/Admin/CustomerRequestRepo')
const CustomerRequestResponse = use('App/Response/ApiV1/Admin/CustomerRequestResponse')

class CustomerRequestController {
    async list ({ request, response }) {
        const options = request.all()
        const requests = await CustomerRequestRepo.list(options)

        return response.json({
            success: true,
            message: 'Done',
            requests: await CustomerRequestResponse.list(requests)
        })
    }

    async store () {

    }

    async update () {

    }

    async assignAdmin () {

    }
}

module.exports = CustomerRequestController
