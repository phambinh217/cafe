'use strict'

const VanillaSerializer = use('App/Lucid/VanillaSerializer')
const LucidModel = use('Model')

class Model extends LucidModel {
    static get Serializer () {
        return VanillaSerializer
    }
}

module.exports = Model
