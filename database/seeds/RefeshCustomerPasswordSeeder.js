'use strict'

const Database = use('Database')
const Hash = use('Hash')

class RefeshCustomerPasswordSeeder {
    async run () {
        return
        const safePassword = await Hash.make('123123')
        const affectedRows = await Database
            .table('customers')
            .update('password', safePassword)
    }
}

module.exports = RefeshCustomerPasswordSeeder
