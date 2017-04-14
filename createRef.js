'use strict'

module.exports = function createRef (refKey, store, ops) {
  const ref = {}

  Object.keys(ops).forEach((opKey) =>
    ref[opKey] = (...args) =>
      store.dispatch(ops[opKey].create(opKey, refKey, ...args))
  )

  ref.ref = (key) =>
    store.ref([refKey, key].join('/'))

  ref.get = (key) =>
    store.get(key ? [refKey, key].join('/') : refKey)

  ref.subscribe = (observer) =>
    store.subscribe(observer, refKey)

  return ref
}
