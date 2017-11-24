'use strict'

const {createStore} = require('./')

describe('opstore', () => {
  describe('ref', () => {
    it('should create sub-reference', () => {
      const store = createStore({dict: {items: []}})
      const dictRef = store.ref('dict')
      const itemsRef = dictRef.ref('items')

      expect(Array.isArray(itemsRef.get())).toEqual(true)
    })
  })
})
