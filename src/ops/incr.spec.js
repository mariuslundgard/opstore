'use strict'

const buildStore = require('../buildStore')
const incr = require('../ops/incr')

describe('opstore', () => {
  const createStore = buildStore({incr})

  describe('ops/incr', () => {
    it('should increment a number', () => {
      const store = createStore(0)
      const ref = store.ref()

      ref.incr()
      ref.incr()

      expect(ref.get()).toEqual(2)
    })

    it('should increment a number by reference', () => {
      const store = createStore({foo: {bar: 0}})
      const ref = store.ref('foo')

      ref.incr('bar')
      ref.incr('bar')

      expect(ref.get('bar')).toEqual(2)
    })
  })
})
