'use strict'

const assert = require('assert')
const buildStore = require('../buildStore')
const incr = require('../ops/incr')
const {describe, it} = require('mocha')

describe('opstore', () => {
  const createStore = buildStore({incr})

  describe('ops/incr', () => {
    it('should increment a number', () => {
      const store = createStore(0)
      const ref = store.ref()

      ref.incr()
      ref.incr()

      assert.equal(ref.get(), 2)
    })

    it('should increment a number by reference', () => {
      const store = createStore({foo: {bar: 0}})
      const ref = store.ref('foo')

      ref.incr('bar')
      ref.incr('bar')

      assert.equal(ref.get('bar'), 2)
    })
  })
})
