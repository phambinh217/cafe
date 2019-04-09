'use strict'

const Config = use('Config')

class SocialResponse {
    static async listTable (tables) {
        const formatedTables = tables.toJSON()

        formatedTables.map(table => {
            delete table.created_at
            delete table.updated_at
            delete table.deleted_at

            return table.people.map(person => {
                const options = person.options ? JSON.parse(person.options) : {}
                const publicOrPrivate = {
                    phone: 'public_phone_number',
                    address: 'public_phone_number',
                    facebook: 'public_phone_number',
                    instagram: 'public_phone_number',
                    date_of_birth: 'public_phone_number',
                }

                for (let field in publicOrPrivate) {
                    if (!options.hasOwnProperty(field)
                        || options.hasOwnProperty(field) == '0'
                    ) {
                        person[field] = 'Không công khai'
                    }
                }

                if (person.social_network_status == Config.get('socialNetwork.status.private')) {
                    person.name = '[Không công khai]'
                }

                delete person.last_name
                delete person.first_name
                delete person.created_at
                delete person.updated_at
                delete person.deleted_at
                delete person.remember_token
                delete person.current_invoice_id
                delete person.options

                return person
            })
        })

        return formatedTables
    }
}

module.exports = SocialResponse