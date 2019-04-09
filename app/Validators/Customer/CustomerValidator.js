'use strict'

const { validate } = use('Validator')
const Config = use('Config')

class CustomerValidator {
    static async setTable (data) {
        return await validate(data, {
            table_id: 'required',
        })
    }

    static async updateCommon (data) {
        return await validate(data, {

        })
    }

    static async updateSettings (data) {
        const socialNetworkStatus = Object.values(Config.get('socialNetwork.status')).join(',')

        return await validate(data, {
            public_phone_number: 'in:0,1',
            new_friend_notifications: 'in:0,1',
            social_network_status: 'in:' + socialNetworkStatus,
        })
    }
}

module.exports = CustomerValidator