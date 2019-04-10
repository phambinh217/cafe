'use strict'

class CustomerRequestResponse {
    static async list (requests) {
        const formatedRequests = requests.toJSON()

        formatedRequests.map(request => {
            delete request.updated_at
            delete request.assign_admin_id

            request.metas = JSON.parse(request.metas)
            if (request.assigner) {
                delete request.assigner.created_at
                delete request.assigner.updated_at
                delete request.assigner.deleted_at
                delete request.assigner.password
                delete request.assigner.role
            }

            return request
        })

        return formatedRequests
    }
}

module.exports = CustomerRequestResponse