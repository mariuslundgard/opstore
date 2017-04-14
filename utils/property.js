'use strict'

const property = require('@yr/property')

// get: (state, key) -> state
const get = (state, key) => {
  if (!key) {
    return state
  }

  return property.get(state, key)
}

// set: (state, key, value) -> state
const set = (state, key, value) => {
  if (!key) {
    return value
  }

  return property.set(state, key, value, {immutable: true})
}

module.exports = {
  get,
  set
}
