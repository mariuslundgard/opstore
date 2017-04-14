'use strict'

const assert = require('assert')
const {createStore} = require('../')
const {describe, it} = require('mocha')

describe('opstore', () => {
  describe('ref', () => {
    it('should create sub-reference', () => {
      const store = createStore({dict: {items: []}})
      const dictRef = store.ref('dict')
      const itemsRef = dictRef.ref('items')

      assert(Array.isArray(itemsRef.get()))
    })
  })
})
