'use strict'

const property = require('../utils/property')

function exec (store, op) {
  const currValue = property.get(store.state, op.key)
  const newValue = currValue.map((item, index) => {
    if (index === op.index) {
      return op.value
    }
    return item
  })

  store.state = property.set(store.state, op.key, newValue)
  store.notifyObservers(op.key ? op.key.split('/') : ['.'])
}

function create (...args) {
  if (args.length === 5) {
    const [type, refKey, key, index, value] = args
    return {type, key: [refKey, key].join('/'), index, value}
  }

  const [type, key, index, value] = args
  return {type, key, index, value}
}

module.exports = {
  exec,
  create
}
