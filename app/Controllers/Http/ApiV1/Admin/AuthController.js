'use strict'

const AuthValidator = use('App/Validators/Admin/AuthValidator')
const AdminRepo = use('App/Repos/Admin/AdminRepo')

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

        const { email, password } = request.all()
        const authPayload = await auth.authenticator('admin').withRefreshToken().attempt(email, password)
        const admin = await AdminRepo.findByEmail(email)

        return response.json({
            success: true,
            message: 'Logged in',
            auth: {
                id: admin.id,
                token: authPayload.token,
                refresh_token: authPayload.refreshToken,
                admin: admin
            }
        })
    }

    async logout ({ auth, request, response }) {

    }
}

module.exports = AuthController
