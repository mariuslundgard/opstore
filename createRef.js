'use strict'

const pathJoin = require('./pathJoin')

module.exports = function createRef (refKey, store, ops) {
  const ref = {}

  Object.keys(ops).forEach((opKey) =>
    ref[opKey] = (...args) =>
      store.dispatch(ops[opKey].create(opKey, refKey, args))
  )

  ref.ref = (key) =>
    store.ref(pathJoin(refKey, key))

  ref.get = (key) =>
    store.get(pathJoin(refKey, key))

  ref.subscribe = (observer) =>
    store.subscribe(observer, refKey)

  return ref
}
