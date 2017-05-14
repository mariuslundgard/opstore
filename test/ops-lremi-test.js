'use strict'

const assert = require('assert')
const buildStore = require('../buildStore')
const lremi = require('../ops/lremi')
const {describe, it} = require('mocha')

describe('opstore', () => {
  const createStore = buildStore({lremi})

  describe('ops/lremi', () => {
    it('should remove an item from at list at a given index', () => {
      const store = createStore([0, 1, 2])
      const ref = store.ref()

      ref.lremi(1)

      assert.equal(JSON.stringify(ref.get()), '[0,2]')
    })

    it('should remove an item from at list at a given index by reference', () => {
      const store = createStore({foo: {bar: [0, 1, 2]}})
      const ref = store.ref('foo')

      ref.lremi('bar', 1)

      assert.equal(JSON.stringify(ref.get('bar')), '[0,2]')
    })
  })
})
