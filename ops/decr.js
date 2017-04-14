'use strict'

const property = require('../utils/property')

function exec (store, op) {
  store.state = property.set(store.state, op.key, store.get(op.key) - 1)
  store.notifyObservers(op.key ? op.key.split('/') : ['.'])
}

function create (...args) {
  if (args.length === 3) {
    const [type, refKey, key] = args
    return {type, key: [refKey, key].join('/')}
  }

  const [type, key] = args
  return {type, key}
}

module.exports = {
  exec,
  create
}
