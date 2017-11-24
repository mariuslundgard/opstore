import {buildStore} from '../buildStore'
import * as lpush from '../ops/lpush'
import {IStore, StoreFactory} from '../types'

describe('opstore/ops/lpush', () => {
  let createStore: StoreFactory<any>

  beforeAll(() => {
    createStore = buildStore({lpush})
  })

  it('should push an item to the end of a list', () => {
    const store: IStore<number[]> = createStore([])
    const ref = store.ref()

    ref.lpush(1)
    ref.lpush(2)

    expect(JSON.stringify(ref.get())).toEqual('[1,2]')
  })

  it('should push an item to the end of a list by reference', () => {
    interface IState {
      foo: {
        bar: number[]
      }
    }

    const store: IStore<IState> = createStore({foo: {bar: []}})
    const ref = store.ref('foo')

    ref.lpush('bar', 1)
    ref.lpush('bar', 2)

    expect(JSON.stringify(ref.get('bar'))).toEqual('[1,2]')
  })
})
