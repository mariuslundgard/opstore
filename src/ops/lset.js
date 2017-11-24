'use strict'

const pathJoin = require('../pathJoin')
const property = require('segmented-property')

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

function create (type, refKey, args) {
  let key = refKey

  if (args.length === 3) {
    key = pathJoin(key, args.shift())
  }

  return {type, key, index: args[0], value: args[1]}
}

module.exports = {
  exec,
  create
}
