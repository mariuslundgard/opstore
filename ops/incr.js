'use strict'

function exec (store, op) {
  return store.set(op.key, store.get(op.key) + 1)
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
