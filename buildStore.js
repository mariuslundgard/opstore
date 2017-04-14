'use strict'

const createRef = require('./createRef')
const property = require('./utils/property')

module.exports = function buildStore (ops = {}) {
  return function createStore (initialState) {
    const store = {state: initialState}
    const refs = {}
    const observers = {}
    const middlewareFns = []

    const applyOp = (op) => {
      if (ops[op.type]) {
        return ops[op.type].exec(store, op)
      }

      throw new Error(`Unknown operation: ${op.type}`)
    }

    store.ref = (refKey) => {
      refs[refKey] = createRef(refKey, store, ops)
      return refs[refKey]
    }

    store.dispatch = (op) => {
      let middlewareIdx = 0

      const next = () => applyOp(op)

      const callNext = () => {
        const middlewareFn = middlewareFns[middlewareIdx++]

        if (middlewareFn) {
          middlewareFn(op, callNext)
        } else {
          next()
        }
      }

      callNext()

      return store
    }

    store.get = (key) => {
      return key ? property.get(store.state, key) : store.state
    }

    store.subscribe = (observer, refKey = '.') => {
      if (!observers[refKey]) {
        observers[refKey] = []
      }

      observers[refKey].push(observer)

      return () => {
        observers[refKey].splice(observers[refKey].indexOf(observer), 1)
        if (observers[refKey].length === 0)
          delete observers[refKey]
      }
    }

    store.notifyObservers = (keyArray) => {
      const key = keyArray.join('/')

      if (observers[key]) {
        observers[key].forEach((observer) => {
          observer(key === '.' ? store.state : property.get(store.state, key))
        })
      }

      keyArray.pop()

      if (keyArray.length) {
        store.notifyObservers(keyArray)
      } else if (key !== '.') {
        store.notifyObservers(['.'])
      }

      return store
    }

    store.use = (middlewareFn) => {
      middlewareFns.push(middlewareFn)
    }

    return store
  }
}
