'use strict'

function exec (store, op) {
  return store.set(op.key, store.get(op.key).concat([op.value]))
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
