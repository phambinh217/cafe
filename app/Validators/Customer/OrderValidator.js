'use strict'

const { validate } = use('Validator')

class OrderValidator {
    static async validateOrderFood (data) {
        return await validate(data, {
            'foods.*.id': 'required',
            'food.*.quantity': 'required|min:1'
        })
    }
}

module.exports = OrderValidator