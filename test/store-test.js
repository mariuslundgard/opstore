'use strict'

const assert = require('assert')
const {createStore} = require('../')
const {describe, it} = require('mocha')

describe('opstore', () => {
  it('should store data', () => {
    const store = createStore(true)
    assert(store.get())
  })

  it('should update stored data', () => {
    const store = createStore(true)
    assert(store.get())
    store.set(false)
    assert(store.get() === false)
  })

  it('should stream state changes', (done) => {
    const store = createStore(-1)

    let idx = 0
    const unsubscribe = store.subscribe((state) => {
      assert(state === idx)
      if (idx === 2) {
        unsubscribe()
        done()
      } else {
        idx += 1
      }
    })

    store.set(0)
    store.set(1)
    store.set(2)
  })

  it('should enable event sourcing', () => {
    const store1 = createStore({list: [], dict: {}, count: 0})
    const store2 = createStore({list: [], dict: {}, count: 0})
    const listRef = store1.ref('list')
    const dictRef = store1.ref('dict')
    const countRef = store1.ref('count')

    // Add middleware to pass ops from one store to another
    store1.use((op, next) => {
      store2.dispatch(op)
      next()
    })

    listRef.lpush(1)
    listRef.lset(1, 3)
    listRef.lremi(0)
    countRef.incr()
    countRef.incr()
    countRef.decr()
    dictRef.set('foo', 'bar')

    assert.equal(
      JSON.stringify(store1.get()),
      JSON.stringify(store2.get())
    )
  })
})
