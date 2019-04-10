'use strict'

const CustomerConnection = use('App/Models/CustomerConnection')
const Config = use('Config')

class CustonerConnectionRepo {
    static async create (customerId1, customer2Id, options) {
        options = { ...{ status: 'pending' }, ...options }
        return await CustomerConnection.create({
            ...{
                customer1_id: customerId1,
                customer2_id: customer2Id,
            },
            ...options
        })
    }

    static async accept (connection) {
        connection.status = Config.get('customerConnection.status.accepted')
        return await connection.save()
    }

    static async reject (connection) {
        connection.status = Config.get('customerConnection.status.rejected')
        return await connection.save()
    }

    static async close (connection) {
        connection.status = Config.get('customerConnection.status.closed')

        return await connection.save()
    }
}

module.exports = CustonerConnectionRepo