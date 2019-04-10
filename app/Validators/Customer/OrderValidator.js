'use strict'

const { validate } = use('Validator')

class OrderValidator {
    static async orderFood (data) {
        return await validate(data, {
            'table_id': 'required',
            'foods.*.id': 'required',
            'food.*.quantity': 'required|min:1'
        })
    }
}

module.exports = OrderValidator