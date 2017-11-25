import {createFactory, set} from '../'
import {IStore, StoreFactory} from '../types'

describe('opstore/ops/set', () => {
  let createStore: StoreFactory<any>

  beforeAll(() => {
    createStore = createFactory({set})
  })

  it('should set a value', () => {
    const store: IStore<number> = createStore(0)
    const ref = store.ref()

    ref.set(1)

    expect(ref.get()).toEqual(1)
  })

  it('should set a value by reference', () => {
    interface IState {
      foo: number
    }

    const store: IStore<IState> = createStore({foo: 1})
    const ref = store.ref()

    ref.set('foo', 2)

    expect(ref.get('foo')).toEqual(2)
  })
})
