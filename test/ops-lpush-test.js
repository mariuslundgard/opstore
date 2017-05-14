'use strict'

const assert = require('assert')
const buildStore = require('../buildStore')
const lpush = require('../ops/lpush')
const {describe, it} = require('mocha')

describe('opstore', () => {
  const createStore = buildStore({lpush})

  describe('ops/lpush', () => {
    it('should push an item to the end of a list', () => {
      const store = createStore([])
      const ref = store.ref()

      ref.lpush(1)
      ref.lpush(2)

      assert.equal(JSON.stringify(ref.get()), '[1,2]')
    })

    it('should push an item to the end of a list by reference', () => {
      const store = createStore({foo: {bar: []}})
      const ref = store.ref('foo')

      ref.lpush('bar', 1)
      ref.lpush('bar', 2)

      assert.equal(JSON.stringify(ref.get('bar')), '[1,2]')
    })
  })
})
