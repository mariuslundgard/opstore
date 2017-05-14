'use strict'

module.exports = function createRef (refKey, store, ops) {
  const ref = {}

  Object.keys(ops).forEach((opKey) =>
    ref[opKey] = (...args) => {
      return store.dispatch(ops[opKey].create(opKey, refKey, args))
    }
  )

  ref.ref = (key) => {
    const k = [refKey, key].filter((k) => !!k).join('/')
    return store.ref(k)
  }

  ref.get = (key) => {
    const k = [refKey, key].filter((k) => !!k).join('/')
    return store.get(k)
  }

  ref.subscribe = (observer) =>
    store.subscribe(observer, refKey)

  return ref
}
