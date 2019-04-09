'use strict'

const VanillaSerializer = use('App/Lucid/VanillaSerializer')

class Model extends use('Model') {
    static get Serializer () {
        return VanillaSerializer
    }
}

module.exports = Model
