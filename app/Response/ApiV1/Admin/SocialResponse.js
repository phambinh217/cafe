'use strict'

class SocialResponse {
    static async listTable (tables) {
        const formatedTables = tables.toJSON()

        formatedTables.map(table => {
            delete table.created_at
            delete table.updated_at
            delete table.deleted_at

            return table.people.map(person => {
                delete person.last_name
                delete person.first_name
                delete person.created_at
                delete person.updated_at
                delete person.deleted_at
                delete person.remember_token
                delete person.options

                return person
            })
        })

        return formatedTables
    }
}

module.exports = SocialResponse
