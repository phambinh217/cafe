'use strict'

const Customer = use('App/Models/Customer')
const Config = use('Config')

class CustomerRandomSocialNetworkStatusSeeder {
    async run () {
        return
        const customers = await Customer.all()
        for (let customer of customers.rows) {
            const random = Math.floor(Math.random() * 10)
            const status = random % 2 == 0 ? Config.get('socialNetwork.status.public') : Config.get('socialNetwork.status.private')
            customer.social_network_status = status
            customer.current_table_id = (random % 10) > 0 ? random % 10 : 1
            await customer.save()
        }
    }
}

module.exports = CustomerRandomSocialNetworkStatusSeeder
