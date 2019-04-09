'use strict'

const Route = use('Route')

Route.on('/').render('welcome')

Route.post('auth/login', 'ApiV1/Customer/AuthController.login').prefix('api/v1/customer')

Route.group(() => {
    Route.get('/', 'ApiV1/Customer/CustomerController.index')
    Route.get('requests', 'ApiV1/Customer/CustomerRequestController.list')
    Route.post('requests/:request_id/cancel', 'ApiV1/Customer/CustomerRequestController.cancel')

    Route.post('update_settings', 'ApiV1/Customer/CustomerController.updateSettings')
    Route.get('invoices/current', 'ApiV1/Customer/InvoiceController.currentInvoice')
    Route.post('set_table', 'ApiV1/Customer/CustomerController.setTable')
    Route.post('order/foods', 'ApiV1/Customer/OrderController.orderFood').middleware('customerSetTable')

    Route.post('social/connections/:id/reject', 'ApiV1/Customer/SocialController.reject')
    Route.post('social/connections/:id/accept', 'ApiV1/Customer/SocialController.accept')
    Route.post('social/:id/connect', 'ApiV1/Customer/SocialController.connect')
})
.prefix('api/v1/customer')
.middleware('auth:customer')

Route.group(() => {
    Route.get('foods', 'ApiV1/Common/FoodController.list')
    Route.get('social/tables', 'ApiV1/Common/SocialController.listTable')
})
.prefix('api/v1/common')