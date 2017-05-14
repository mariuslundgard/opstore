'use strict'

const pathJoin = require('../pathJoin')
const property = require('segmented-property')

function exec (store, op) {
  store.state = property.set(store.state, op.key, store.get(op.key) + 1)
  store.notifyObservers(op.key ? op.key.split('/') : ['.'])
}

function create (type, refKey, args) {
  let key = refKey

  if (args.length === 1) {
    key = pathJoin(key, args.shift())
  }

  return {type, key}
}

module.exports = {
  exec,
  create
}
