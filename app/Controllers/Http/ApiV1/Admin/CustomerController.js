'use strict'

const CustomerRepo = use('App/Repos/Admin/CustomerRepo')

class CustomerController {
    async list ({ request, response }) {
        const options = request.all()
        const customers = await CustomerRepo.list(options)

        return response.json({
            success: true,
            message: 'Done',
            customers: customers,
        })
    }
}

module.exports = CustomerController
