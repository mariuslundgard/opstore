'use strict'

const assert = require('assert')
const buildStore = require('../buildStore')
const decr = require('../ops/decr')
const {describe, it} = require('mocha')

describe('opstore', () => {
  const createStore = buildStore({decr})

  describe('ops/decr', () => {
    it('should decrement a number', () => {
      const store = createStore(0)
      const ref = store.ref()

      ref.decr()
      ref.decr()

      assert.equal(ref.get(), -2)
    })

    it('should decrement a number by reference', () => {
      const store = createStore({foo: {bar: 0}})
      const ref = store.ref('foo')

      ref.decr('bar')
      ref.decr('bar')

      assert.equal(ref.get('bar'), -2)
    })
  })
})
