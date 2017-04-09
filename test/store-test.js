'use strict'

const assert = require('assert')
const buildStore = require('../buildStore')
const {describe, it} = require('mocha')

describe('opstore', () => {
  const createStore = buildStore()

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
})
