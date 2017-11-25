import * as property from 'segmented-property'
import builtinOpHandlers from './ops'
import {createRef} from './ref'
import {IMsg, IObservers, IOperators, IRefs, IStore, MiddlewareFn, StoreFactory} from './types'

export const createStore: StoreFactory<any> = createFactory(builtinOpHandlers)

export function createFactory<State>(operators: IOperators<State> = {}): StoreFactory<State> {
  return (initialState: State): IStore<State> => {
    const refs: IRefs = {}
    const observers: IObservers = {}
    const middlewareFns: MiddlewareFn[] = []

    let prevState: State

    const applyOp = (msg: IMsg) => {
      if (operators[msg.type]) {
        prevState = store.state
        store.state = operators[msg.type].transform(store.state, msg)
        store.notifyObservers(msg.key ? msg.key.split('/') : ['.'])
      } else {
        throw new Error(`Unknown operation: ${msg.type}`)
      }
    }

    const store: IStore<State> = {
      state: initialState,

      ref: refKey => {
        refs[refKey] = createRef(refKey, store, operators)
        return refs[refKey]
      },

      dispatch: op => {
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
      },

      get: key => {
        return key ? property.get(store.state, key) : store.state
      },

      subscribe: (observer, refKey = '.') => {
        if (!observers[refKey]) {
          observers[refKey] = []
        }

        observers[refKey].push(observer)

        return {
          unsubscribe: () => {
            observers[refKey].splice(observers[refKey].indexOf(observer), 1)

            if (observers[refKey].length === 0) {
              delete observers[refKey]
            }
          }
        }
      },

      notifyObservers: keyArray => {
        const key = keyArray.join('/')

        if (observers[key]) {
          const prevValue = key === '.' ? prevState : property.get(prevState, key)
          const currValue = key === '.' ? store.state : property.get(store.state, key)

          if (prevValue !== currValue) {
            observers[key].forEach(observer => {
              observer.next(currValue)
            })
          }
        }

        keyArray.pop()

        if (keyArray.length) {
          store.notifyObservers(keyArray)
        } else if (key !== '.') {
          store.notifyObservers(['.'])
        }

        return store
      },

      use: middlewareFn => {
        middlewareFns.push(middlewareFn)
      }
    }

    return store
  }
}
