import {buildStore} from '../buildStore'
import * as decr from '../ops/decr'
import {IStore, StoreFactory} from '../types'

describe('opstore/ops/decr', () => {
  let createStore: StoreFactory<any>

  beforeAll(() => {
    createStore = buildStore({decr})
  })

  it('should decrement a number', () => {
    const store: IStore<number> = createStore(0)
    const ref = store.ref()

    ref.decr()
    ref.decr()

    expect(ref.get()).toEqual(-2)
  })

  it('should decrement a number by reference', () => {
    interface IState {
      foo: {
        bar: number
      }
    }

    const store: IStore<IState> = createStore({foo: {bar: 0}})
    const ref = store.ref('foo')

    ref.decr('bar')
    ref.decr('bar')

    expect(ref.get('bar')).toEqual(-2)
  })
})
