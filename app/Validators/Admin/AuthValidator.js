'use strict'

const { validate } = use('Validator')

class AuthValidator {
    static async login (data) {
        return await validate(data, {
            email: 'required',
            password: 'required'
        })
    }
}

module.exports = AuthValidator