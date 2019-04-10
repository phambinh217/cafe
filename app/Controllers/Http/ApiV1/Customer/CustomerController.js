'use strict'

const CustomerValidator = use('App/Validators/Customer/CustomerValidator')
const CustomerRepo = use('App/Repos/Customer/CustomerRepo')

class CustomerController {
    async index ({ auth, request, response }) {
        const customer = auth.user
        return response.json({
            success: true,
            message: 'Done',
            customer: customer
        })
    }

    async setTable ({ auth, request, response }) {
        const validator = await CustomerValidator.setTable(request.all())
        if (validator.fails()) {
            return response.status(406).json({
                success: false,
                message: 'Fails',
                errors: validator.messages()
            })
        }

        CustomerRepo.setTable(auth.user, request.all().table_id)

        return response.json({
            success: true,
            message: 'Done'
        })
    }

    async updateCommon ({ auth, request, response }) {
        const validator = await CustomerValidator.updateCommon(request.all())

        if (validator.fails()) {
            return response.status(406).json({
                success: false,
                message: 'Fail',
                errors: validator.messages()
            })
        }

        CustomerRepo.update(auth.user, request.only([
            'avatar',
            'phone',
            'last_name',
            'first_name',
            'summary',
            'address',
            'date_of_birth',
            'facebook',
            'instagram'
        ]))

        return response.json({
            success: true,
            messages: 'Done'
        })
    }

    async updateSettings ({ auth, request, response }) {
        const validator = await CustomerValidator.updateSettings(request.all())

        if (validator.fails()) {
            return response.status(406).json({
                success: false,
                message: 'Fail',
                errors: validator.messages()
            })
        }

        await CustomerRepo.updateSettings(auth.user, request.only([
            'public_phone_number',
            'public_facebook',
            'public_date_of_birth',
            'public_address',
            'public_instagram',
            'new_friend_notifications',
            'social_network_status'
        ]))

        return response.json({
            success: true,
            messages: 'Done'
        })
    }
}

module.exports = CustomerController