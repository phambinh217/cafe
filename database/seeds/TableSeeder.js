'use strict'

const Database = use('Database')
const Table = use('App/Models/Table')

class TableSeeder {
    async run () {
        return
        for (let i = 1; i <= 10; i++) {
            await Table.findOrCreate({ title: `Bàn ${i}` }, {
                title: `Bàn ${i}`,
                floor_id: 1
            })
        }
    }
}

module.exports = TableSeeder
