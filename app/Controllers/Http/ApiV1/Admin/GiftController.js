'use strict'

const GiftRepo = use('App/Repos/Admin/GiftRepo')

class GiftController {
    async list ({ request, response }) {
        const options = request.all()
        const gifts = await GiftRepo.list(options)

        return response.json({
            success: true,
            message: 'Done',
            gifts: gifts,
        })
    }
}

module.exports = GiftController
