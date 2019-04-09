'use strict'

const TableRepo = use('App/Repos/Common/TableRepo')
const SocialResponse = use('App/Response/ApiV1/SocialResponse')

class SocialController {
    /**
     * Lấy thông tin các bàn của nhà hàng
     * Kèm theo thông tin của mọi người đang bật chế độ công khai
     */
    async listTable ({ request, response }) {
        const options = request.all()
        const tables = await TableRepo.list(options)

        return response.json({
            success: true,
            message: 'Done',
            tables: await SocialResponse.listTable(tables),
        })
    }
}

module.exports = SocialController
