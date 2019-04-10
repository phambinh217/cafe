'use strict'

const Admin = use('App/Models/Admin')

class AdminRepo {
    static async findByEmail (email) {
        return await Admin.findBy('email', email)
    }
}

module.exports = AdminRepo