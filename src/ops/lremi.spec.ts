import {buildStore} from '../buildStore'
import * as lremi from '../ops/lremi'
import {IStore, StoreFactory} from '../types'

describe('opstore/ops/lremi', () => {
  let createStore: StoreFactory<any>

  beforeAll(() => {
    createStore = buildStore({lremi})
  })

  it('should remove an item from at list at a given index', () => {
    const store: IStore<number[]> = createStore([0, 1, 2])
    const ref = store.ref()

    ref.lremi(1)

    expect(JSON.stringify(ref.get())).toEqual('[0,2]')
  })

  it('should remove an item from at list at a given index by reference', () => {
    interface IState {
      foo: {
        bar: number[]
      }
    }

    const store: IStore<IState> = createStore({foo: {bar: [0, 1, 2]}})
    const ref = store.ref('foo')

    ref.lremi('bar', 1)

    expect(JSON.stringify(ref.get('bar'))).toEqual('[0,2]')
  })
})
