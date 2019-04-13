'use strict'

const FloorRepo = use('App/Repos/Admin/FloorRepo')

class FloorController {
    async list ({ request, response }) {
        const options = request.all()
        const floors = await FloorRepo.list(options)

        return response.json({
            success: true,
            message: 'Done',
            floors: floors,
        })
    }
}

module.exports = FloorController