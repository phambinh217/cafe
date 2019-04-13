'use strict'

const FoodRepo = use('App/Repos/Admin/FoodRepo')

class FoodController {
    async list ({ request, response }) {
        const options = request.all()
        const foods = await FoodRepo.list(options)

        return response.json({
            success: true,
            message: 'Done',
            foods: foods,
        })
    }
}

module.exports = FoodController
