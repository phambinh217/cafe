'use strict'

const CustomerRepo = use('App/Repos/Customer/CustomerRepo')
const CustomerConnectionRepo = use('App/Repos/Customer/CustomerConnectionRepo')

class SocialController {
    /**
     * Kết nối khách đang đăng nhập với một khác khác
     *
     * Nếu 1 trong 2 người đang kết nối rồi thì không thể kết nối được nữa
     */
    async connect ({ auth, params, request, response }) {
        if (await CustomerRepo.isConnecting(auth.user.id)) {
            return response.status(400).json({
                success: false,
                message: 'Bạn đang kết nối. Không thể kết nối với người khác.'
            })

        }

        if (await CustomerRepo.isConnecting(params.customer_id)) {
            return response.status(400).json({
                success: false,
                message: 'Người bạn muốn kết nối đang trong một kết nối khác.'
            })
        }

        await CustomerConnectionRepo.create(auth.user.id, params.customer_id)

        return response.json({
            success: true,
            message: 'Done'
        })
    }

    /**
     * Đồng ý kết nối
     */
    async acceptConnection ({ auth, params, request, response }) {
        const connection = await CustomerConnectionRepo.find(params.connection_id)

        if (connection.customer2_id != auth.user.id) {
            return response.status(400).json({
                success: false,
                message: 'Bạn không có kết nối này'
            })
        }

        if (connection.status != Config.get('customerConnection.status.pending')) {
            return response.status(400).json({
                success: false,
                message: 'Kết nối không ở trạng thái chờ trước đó'
            })
        }

        await CustomerConnectionRepo.accept(params.connection_id)

        return response.json({
            success: true,
            message: 'Done'
        })
    }

    /**
     * Từ chối kết nối
     */
    async rejectConnection ({ auth, params, request }) {
        const connection = await CustomerConnectionRepo.find(params.connection_id)

        if (connection.customer2_id != auth.user.id) {
            return response.status(400).json({
                success: false,
                message: 'Bạn không có kết nối này'
            })
        }

        if (connection.status != Config.get('customerConnection.status.pending')) {
            return response.status(400).json({
                success: false,
                message: 'Kết nối không ở trạng thái chờ trước đó'
            })
        }

        await CustomerConnectionRepo.reject(params.connection_id)

        return response.json({
            success: true,
            message: 'Done'
        })
    }

    /**
     * Đóng kết nối
     */
    async closeConnection ({ auth, params, request }) {
        const connection = await CustomerConnectionRepo.find(params.connection_id)

        if (connection.customer2_id != auth.user.id && connection.customer1_id != auth.user.id) {
            return response.status(400).json({
                success: false,
                message: 'Bạn không có kết nối này'
            })
        }

        if (connection.status != Config.get('customerConnection.status.connecting')) {
            return response.status(400).json({
                success: false,
                message: 'Kết nối không ở trạng thái đang kết nối trước đó'
            })
        }

        await CustomerConnectionRepo.close(params.connection_id)

        return response.json({
            success: true,
            message: 'Done'
        })
    }
}

module.exports = SocialController
