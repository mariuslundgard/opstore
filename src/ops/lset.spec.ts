import {buildStore} from '../buildStore'
import * as lset from '../ops/lset'
import {IStore, StoreFactory} from '../types'

describe('opstore/ops/lset', () => {
  let createStore: StoreFactory<any>

  beforeAll(() => {
    createStore = buildStore({lset})
  })

  it('should set an item in a list at a given index', () => {
    const store: IStore<number[]> = createStore([0, 0, 0])
    const ref = store.ref()

    ref.lset(1, 1)
    ref.lset(2, 2)

    expect(JSON.stringify(ref.get())).toEqual('[0,1,2]')
  })

  it('should set an item in a list at a given index by reference', () => {
    interface IState {
      foo: {
        bar: number[]
      }
    }

    const store: IStore<IState> = createStore({foo: {bar: [0, 0, 0]}})
    const ref = store.ref('foo')

    ref.lset('bar', 1, 1)
    ref.lset('bar', 2, 2)

    expect(JSON.stringify(ref.get('bar'))).toEqual('[0,1,2]')
  })
})
