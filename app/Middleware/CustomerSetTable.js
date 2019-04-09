'use strict'

const Customer = use('App/Models/Customer')

class CustomerSetTable {
    async handle ({ auth, request, response }, next) {
        const table = await auth.user.current_table_id
        if (!table) {
            return response.status(400).json({
                success: false,
                message: 'Không biết khách ngồi ở bàn nào'
            })
        }
        await next()
    }
}

module.exports = CustomerSetTable
