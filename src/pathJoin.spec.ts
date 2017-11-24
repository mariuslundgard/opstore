import {pathJoin} from './pathJoin'

describe('opstore/pathJoin', () => {
  it('should join paths', () => {
    expect(pathJoin('a', 'b')).toEqual('a/b')
    expect(pathJoin(null, null)).toEqual(null)
    expect(pathJoin('a', null, 'c', 'd')).toEqual('a/c/d')
  })
})
