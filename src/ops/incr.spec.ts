import {createFactory, incr} from '../'
import {IStore, StoreFactory} from '../types'

describe('opstore/ops/incr', () => {
  let createStore: StoreFactory<any>

  beforeAll(() => {
    createStore = createFactory({incr})
  })

  it('should increment a number', () => {
    const store: IStore<number> = createStore(0)
    const ref = store.ref()

    ref.incr()
    ref.incr()

    expect(ref.get()).toEqual(2)
  })

  it('should increment a number by reference', () => {
    interface IState {
      foo: {
        bar: number
      }
    }

    const store: IStore<IState> = createStore({foo: {bar: 0}})
    const ref = store.ref('foo')

    ref.incr('bar')
    ref.incr('bar')

    expect(ref.get('bar')).toEqual(2)
  })
})
