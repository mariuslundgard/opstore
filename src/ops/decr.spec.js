'use strict'

const buildStore = require('../buildStore')
const decr = require('../ops/decr')

describe('opstore', () => {
  const createStore = buildStore({decr})

  describe('ops/decr', () => {
    it('should decrement a number', () => {
      const store = createStore(0)
      const ref = store.ref()

      ref.decr()
      ref.decr()

      expect(ref.get()).toEqual(-2)
    })

    it('should decrement a number by reference', () => {
      const store = createStore({foo: {bar: 0}})
      const ref = store.ref('foo')

      ref.decr('bar')
      ref.decr('bar')

      expect(ref.get('bar')).toEqual(-2)
    })
  })
})
