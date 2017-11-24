'use strict'

const buildStore = require('../buildStore')
const lset = require('../ops/lset')

describe('opstore', () => {
  const createStore = buildStore({lset})

  describe('ops/lset', () => {
    it('should set an item in a list at a given index', () => {
      const store = createStore([0, 0, 0])
      const ref = store.ref()

      ref.lset(1, 1)
      ref.lset(2, 2)

      expect(JSON.stringify(ref.get())).toEqual('[0,1,2]')
    })

    it('should set an item in a list at a given index by reference', () => {
      const store = createStore({foo: {bar: [0, 0, 0]}})
      const ref = store.ref('foo')

      ref.lset('bar', 1, 1)
      ref.lset('bar', 2, 2)

      expect(JSON.stringify(ref.get('bar'))).toEqual('[0,1,2]')
    })
  })
})
