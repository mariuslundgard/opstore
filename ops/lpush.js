'use strict'

const property = require('segmented-property')

function exec (store, op) {
  const currValue = property.get(store.state, op.key)

  store.state = property.set(store.state, op.key, currValue.concat([op.value]))
  store.notifyObservers(op.key ? op.key.split('/') : ['.'])
}

function create (...args) {
  if (args.length === 4) {
    const [type, refKey, key, value] = args
    return {type, key: [refKey, key].join('/'), value}
  }

  const [type, key, value] = args
  return {type, key, value}
}

module.exports = {
  exec,
  create
}
