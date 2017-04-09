'use strict'

function exec (store, op) {
  const currValue = store.get(op.key)
  const newValue = currValue.map((item, index) => {
    if (index === op.index) {
      return op.value
    }
    return item
  })

  return store.set(op.key, newValue)
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
