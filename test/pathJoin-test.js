'use strict'

const assert = require('assert')
const {describe, it} = require('mocha')
const pathJoin = require('../pathJoin')

describe('opstore', () => {
  describe('pathJoin', () => {
    it('should join paths', () => {
      assert.equal(pathJoin('a', 'b'), 'a/b')
      assert.equal(pathJoin(null, null), null)
      assert.equal(pathJoin('a', null, 'c', 'd'), 'a/c/d')
    })
  })
})
