'use strict'

const assert = require('assert')
const buildStore = require('../buildStore')
const set = require('../ops/set')
const {describe, it} = require('mocha')

describe('opstore', () => {
  const createStore = buildStore({set})

  describe('ops/set', () => {
    it('should set a value', () => {
      const store = createStore(0)
      const ref = store.ref()

      ref.set(1)

      assert.equal(ref.get(), 1)
    })
  })
})
