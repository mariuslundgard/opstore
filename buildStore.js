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

    const applyOp = (op) => {
      if (ops[op.type]) {
        ops[op.type].exec(store, op)
      } else if (op.type === 'set') {
        if (op.key) {
          state = property.set(state, op.key, op.value, {immutable: true})
          store.notifyObservers(op.key.split('/'))
        } else {
          state = op.value
          store.notifyObservers(['.'])
        }
      } else {
        throw new Error(`Unknown operation: ${op.type}`)
      }
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

    store.set = (...args) => {
      if (args.length === 2) {
        store.dispatch({type: 'set', key: args[0], value: args[1]})
      } else {
        store.dispatch({type: 'set', value: args[0]})
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
