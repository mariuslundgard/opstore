'use strict'

const pathJoin = require('../pathJoin')
const property = require('segmented-property')

function exec (store, op) {
  const currValue = property.get(store.state, op.key)

  store.state = property.set(store.state, op.key, currValue.concat([op.value]))
  store.notifyObservers(op.key ? op.key.split('/') : ['.'])
}

function create (type, refKey, args) {
  let key = refKey

  if (args.length === 2) {
    key = pathJoin(key, args.shift())
  }

  return {type, key, value: args[0]}
}

module.exports = {
  exec,
  create
}
