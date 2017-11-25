import {createFactory, decr} from '../'
import {IStore, StoreFactory} from '../types'

describe('opstore/ops/decr', () => {
  let create: StoreFactory<any>

  beforeAll(() => {
    create = createFactory({decr})
  })

  it('should decrement a number', () => {
    const store: IStore<number> = create(0)
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

    const store: IStore<IState> = create({foo: {bar: 0}})
    const ref = store.ref('foo')

    ref.decr('bar')
    ref.decr('bar')

    expect(ref.get('bar')).toEqual(-2)
  })
})
