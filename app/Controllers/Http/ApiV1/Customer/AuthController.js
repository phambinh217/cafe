'use strict'

const AuthValidator = use('App/Validators/Customer/AuthValidator')
const CustomerRepo = use('App/Repos/Customer/CustomerRepo')

class AuthController {
    async login ({ auth, request, response }) {
        const validator = await AuthValidator.login(request.all())
        if (validator.fails()) {
            return response.status(406).json({
                success: false,
                message: 'Fail',
                errors: validator.messages()
            })
        }

        const { phone, password } = request.all()
        const authPayload = await auth.authenticator('customer').withRefreshToken().attempt(phone, password)
        const customer = await CustomerRepo.findByPhone(phone)

        return response.json({
            success: true,
            message: 'Logged in',
            auth: {
                id: customer.id,
                token: authPayload.token,
                refresh_token: authPayload.refreshToken,
                customer: customer
            }
        })
    }
}

module.exports = AuthController
