'use strict'

const buildStore = require('../buildStore')
const set = require('../ops/set')

describe('opstore', () => {
  const createStore = buildStore({set})

  describe('ops/set', () => {
    it('should set a value', () => {
      const store = createStore(0)
      const ref = store.ref()

      ref.set(1)

      expect(ref.get()).toEqual(1)
    })

    it('should set a value by reference', () => {
      const store = createStore({foo: 1})
      const ref = store.ref()

      ref.set('foo', 2)

      expect(ref.get('foo')).toEqual(2)
    })
  })
})
