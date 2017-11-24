'use strict'

module.exports = function pathJoin (...segments) {
  const validSegments = segments.filter((k) => !!k)

  if (validSegments.length === 0) return null

  return validSegments.join('/')
}
