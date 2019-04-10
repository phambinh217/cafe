'use strict'

const Database = use('Database')
const Hash = use('Hash')

class RefeshAdminPasswordSeeder {
    async run () {
        // return
        const safePassword = await Hash.make('123123')
        const affectedRows = await Database
            .table('admins')
            .update('password', safePassword)
    }
}

module.exports = RefeshAdminPasswordSeeder
