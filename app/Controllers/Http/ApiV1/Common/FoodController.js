'use stric'

const FoodRepo = use('App/Repos/Common/FoodRepo')

class FoodController {
    /**
     * Lấy danh sách các món ăn của nhà hàng
     */
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
