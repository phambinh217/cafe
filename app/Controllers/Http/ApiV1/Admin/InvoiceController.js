'use strict'

const InvoiceRepo = use('App/Repos/Admin/InvoiceRepo')

class InvoiceController {
    async list ({ request, response }) {
        const options = request.all()
        const invoices = await InvoiceRepo.list(options)

        return response.json({
            success: true,
            message: 'Done',
            invoices: invoices,
        })
    }
}

module.exports = InvoiceController
