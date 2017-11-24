'use strict'

const buildStore = require('../buildStore')
const lremi = require('../ops/lremi')

describe('opstore', () => {
  const createStore = buildStore({lremi})

  describe('ops/lremi', () => {
    it('should remove an item from at list at a given index', () => {
      const store = createStore([0, 1, 2])
      const ref = store.ref()

      ref.lremi(1)

      expect(JSON.stringify(ref.get())).toEqual('[0,2]')
    })

    it('should remove an item from at list at a given index by reference', () => {
      const store = createStore({foo: {bar: [0, 1, 2]}})
      const ref = store.ref('foo')

      ref.lremi('bar', 1)

      expect(JSON.stringify(ref.get('bar'))).toEqual('[0,2]')
    })
  })
})
