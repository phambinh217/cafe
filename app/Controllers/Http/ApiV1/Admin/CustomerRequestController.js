'use strict'

const CustomerRequestRepo = use('App/Repos/Admin/CustomerRequestRepo')
const CustomerRequestResponse = use('App/Response/ApiV1/Admin/CustomerRequestResponse')
const CustomerRequestValidator = use('App/Validators/Admin/CustomerRequestValidator')

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

    async changeStatus ({ params, request, response }) {
        const customerRequest = await CustomerRequestRepo.find(params.id)
        if (!customerRequest) {
            return response.status(404).json({
                success: false,
                message: 'Not found'
            })
        }

        const validator = await CustomerRequestValidator.changeStatus(request.all())
        if (validator.fails()) {
            return response.status(406).json({
                success: false,
                message: 'Fail'
            })
        }

        const { status } = request.all()
        CustomerRequestRepo.update(customerRequest, { status: status })

        return response.json({
            success: true,
            message: 'Done'
        })
    }

    async assign ({ request, params, response }) {
        const customerRequest = await CustomerRequestRepo.find(params.id)
        if (!customerRequest) {
            return response.status(404).json({
                success: false,
                message: 'Not found'
            })
        }

        const validator = await CustomerRequestValidator.assign(request.all())
        if (validator.fails()) {
            return response.status(406).json({
                success: false,
                message: 'Fail'
            })
        }

        const { assign_admin_id } = request.all()
        CustomerRequestRepo.update(customerRequest, { assign_admin_id: assign_admin_id })

        return response.json({
            success: true,
            message: 'Done'
        })
    }
}

module.exports = CustomerRequestController
