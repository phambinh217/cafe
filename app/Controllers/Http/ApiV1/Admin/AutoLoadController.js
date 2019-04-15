'use strict'
const AdminRepo = use('App/Repos/Admin/AdminRepo')

class AutoLoadController {
    async autoload ({ request, response }) {
        const admins = await AdminRepo.all()
        return response.json({
            data: {
                admins: admins
            }
        })
    }
}

module.exports = AutoLoadController
