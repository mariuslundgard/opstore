'use strict'

function exec (store, op) {
  const currValue = store.get(op.key)
  const newValue = currValue.map((item) => item)

  newValue.splice(op.index, 1)
  return store.set(op.key, newValue)
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
