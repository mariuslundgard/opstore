'use strict'

const buildStore = require('./buildStore')
const ops = require('./ops')

module.exports = buildStore(ops)
