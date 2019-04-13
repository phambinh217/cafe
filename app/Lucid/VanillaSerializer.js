'use strict'

const _ = require('lodash')

class VanillaSerializer {
  constructor (rows, pages = null, isOne = false) {
    this.rows = rows

    this.pages = pages

    this.isOne = isOne
  }

  rows () {
    return this.rows
  }

  _attachRelations (modelInstance, output) {
    _.each(modelInstance.$relations, (values, relation) => {
      output[relation] = values && typeof (values.toJSON) === 'function' ? values.toJSON() : values
    })
  }

  _attachMeta (modelInstance, output) {
    if (_.size(modelInstance.$sideLoaded)) {
      output.__meta__ = _.clone(modelInstance.$sideLoaded)
    }
  }

  _getRowJSON (modelInstance) {
    const json = modelInstance.toObject()
    this._attachRelations(modelInstance, json)
    this._attachMeta(modelInstance, json)
    return json
  }

  addRow (row) {
    this.rows.push(row)
  }

  first () {
    return _.first(this.rows)
  }

  nth (index) {
    return _.nth(this.rows, index) || null
  }

  last () {
    return _.last(this.rows)
  }

  size () {
    return this.isOne ? 1 : this.rows.length
  }

  toJSON () {
    if (this.isOne) {
      return this._getRowJSON(this.rows)
    }

    const data = this.rows.map(this._getRowJSON.bind(this))
    if (this.pages) {
      return _.merge({}, this.pages, { data })
    }
    return data
  }

  toString () {
    return JSON.stringify(this.formated())
  }

  formated () {
    return this.toJSON()
  }
}

module.exports = VanillaSerializer
