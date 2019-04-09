'use strict'

const CustomerRepo = use('App/Repos/Customer/CustomerRepo')
const InvoiceResponse = use('App/Response/ApiV1/InvoiceResponse')

class InvoiceController {
    /**
     * Trả về thông tin hóa đơn hiện tại của khách hàng
     */
    async currentInvoice ({ auth, request, response }) {
        const customerId = auth.user.id
        const latestInvoice = await CustomerRepo.findLatestInvoice(customerId)
        return response.json({
            success: true,
            message: 'Done',
            invoice: latestInvoice ? await InvoiceResponse.currentInvoice(latestInvoice) : {}
        })
    }
}

module.exports = InvoiceController