'use strict'

const { validate } = use('Validator')
const Config = use('Config')

class CustomerRequestValidator {
    static async changeStatus (data) {
        const statusAvailable = Object.keys(Config.get('customerRequest.status')).join(',')
        return await validate(data, {
            status: 'required|in:' + statusAvailable,
        })
    }

    static async assign (data) {
        return await validate(data, {
            assign_admin_id: 'required'
        })
    }
}

module.exports = CustomerRequestValidator