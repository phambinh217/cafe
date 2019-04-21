'use strict'

const CustomerRepo = use('App/Repos/Admin/CustomerRepo')

class SocialResponse {
    static async listTable (tables) {
        const formatedTables = tables.toJSON()

        for (let table of formatedTables) {
            delete table.created_at
            delete table.updated_at
            delete table.deleted_at

            for (let person of table.people) {
                delete person.created_at
                delete person.updated_at
                delete person.deleted_at
                delete person.remember_token
                delete person.options
                person.is_connecting = await CustomerRepo.isConnecting(person.id)
            }
        }

        return formatedTables
    }
}

module.exports = SocialResponse
