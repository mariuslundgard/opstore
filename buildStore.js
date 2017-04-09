'use strict'

const createRef = require('./createRef')
const property = require('@yr/property')

module.exports = function buildStore (ops = {}) {
  return function createStore (initialState) {
    const store = {}
    const refs = {}
    const observers = {}
    const middlewareFns = []

    let state = initialState

    store.ref = (refKey) => {
      refs[refKey] = createRef(refKey, store, ops)
      return refs[refKey]
    }

    store.dispatch = (op) => {
      let middlewareIdx = 0

      const next = () => ops[op.type].exec(store, op)

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

    store.set = (...args) => {
      if (args.length === 2) {
        const [key, value] = args
        state = property.set(state, key, value, {immutable: true})
        store.notifyObservers(key.split('/'))
      } else {
        state = args[0]
        store.notifyObservers(['.'])
      }

      return store
    }  

    store.get = (key) => {
      return key ? property.get(state, key) : state
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
          observer(key === '.' ? state : property.get(state, key))
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
