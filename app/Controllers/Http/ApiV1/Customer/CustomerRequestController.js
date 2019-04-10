'use strict'

const CustomerRequestRepo = use('App/Repos/Customer/CustomerRequestRepo')
const CustomerRepo = use('App/Repos/Customer/CustomerRepo')
const CustomerRequestResponse = use('App/Response/ApiV1/CustomerRequestResponse')

class CustomerRequestController {
    /**
     * Lấy danh sách các yêu cầu của khách hàng
     */
    async list ({ auth, request, response }) {
        const options = request.all()
        const requests = await CustomerRequestRepo.list(auth.user.id, options)

        return response.json({
            success: true,
            message: 'Done',
            requests: await CustomerRequestResponse.list(requests),
        })
    }

    /**
     * Hủy yêu cầu
     */
    async cancel ({ auth, request, params, response }) {
        const hasRequest = await CustomerRepo.hasRequest(auth.user, params.request_id)
        const customerRequest = await CustomerRequestRepo.find(params.request_id)
        const cancelable = await CustomerRequestRepo.cancelable(customerRequest)

        if (!hasRequest) {
            return response.status(400).json({
                success: false,
                message: 'Bad request'
            })
        }

        if (!cancelable) {
            return response.status(400).json({
                success: false,
                message: 'Yêu cầu đã được tiếp nhận, hoặc đã hủy trước đó.'
            })
        }

        await CustomerRequestRepo.cancel(customerRequest)

        return response.json({
            success: true,
            message: 'Done'
        })
    }
}

module.exports = CustomerRequestController