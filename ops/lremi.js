'use strict'

const property = require('../utils/property')

function exec (store, op) {
  const currValue = property.get(store.state, op.key)
  const newValue = currValue.map((item) => item)

  newValue.splice(op.index, 1)
  store.state = property.set(store.state, op.key, newValue)
  store.notifyObservers(op.key ? op.key.split('/') : ['.'])
}

function create (...args) {
  if (args.length === 4) {
    const [type, refKey, key, index] = args
    return {type, key: [refKey, key].join('/'), index}
  }

  const [type, key, index] = args
  return {type, key, index}
}

module.exports = {
  exec,
  create
}
