'use strict'

const TableRepo = use('App/Repos/Admin/TableRepo')

class TableController {
    async list ({ request, response }) {
        const options = request.all()
        const tables = await TableRepo.list(options)

        return response.json({
            success: true,
            message: 'Done',
            tables: tables,
        })
    }
}

module.exports = TableController
