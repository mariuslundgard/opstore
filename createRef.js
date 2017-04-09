'use strict'

module.exports = function createRef (refKey, store, ops) {
  const ref = {}
  
  Object.keys(ops).forEach((opKey) => {
    ref[opKey] = (...args) => {
      return store.dispatch(ops[opKey].create(opKey, refKey, ...args))
    }
  })

  ref.get = (key) =>
    store.get(key ? [refKey, key].join('/') : refKey)

  ref.set = (...args) => {
    if (args.length === 2) {
      const [key, value] = args
      return store.set(key ? [refKey, key].join('/') : refKey, value)
    }

    return store.set(refKey, args[0])
  }

  ref.subscribe = (observer) =>
    store.subscribe(observer, refKey)

  return ref
}
