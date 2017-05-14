'use strict'

const assert = require('assert')
const buildStore = require('../buildStore')
const lset = require('../ops/lset')
const {describe, it} = require('mocha')

describe('opstore', () => {
  const createStore = buildStore({lset})

  describe('ops/lset', () => {
    it('should set an item in a list at a given index', () => {
      const store = createStore([0, 0, 0])
      const ref = store.ref()

      ref.lset(1, 1)
      ref.lset(2, 2)

      assert.equal(JSON.stringify(ref.get()), '[0,1,2]')
    })

    it('should set an item in a list at a given index by reference', () => {
      const store = createStore({foo: {bar: [0, 0, 0]}})
      const ref = store.ref('foo')

      ref.lset('bar', 1, 1)
      ref.lset('bar', 2, 2)

      assert.equal(JSON.stringify(ref.get('bar')), '[0,1,2]')
    })
  })
})
