import opstore from './'
import {IStore} from './types'

describe('opstore/store', () => {
  it('should store data', () => {
    const store = opstore.createStore(true)
    expect(store.get()).toEqual(true)
  })

  it('should update stored data', () => {
    const store: IStore<boolean> = opstore.createStore(true)
    const ref = store.ref()

    expect(store.get()).toEqual(true)
    ref.set(false)
    expect(store.get()).toEqual(false)
  })

  it('should stream state changes', done => {
    expect.assertions(3)

    type State = number

    const store: IStore<State> = opstore.createStore(-1)
    const ref = store.ref()

    let idx = 0
    const subscription = store.subscribe({
      next: state => {
        expect(state).toEqual(idx)

        if (idx === 2) {
          subscription.unsubscribe()
          done()
        } else {
          idx += 1
        }
      }
    })

    ref.set(0)
    ref.set(1)
    ref.set(2)
  })

  it('should enable event sourcing', () => {
    interface IState {
      list: number[]
      dict: {
        [key: string]: number
      }
      count: number
    }

    const store1: IStore<IState> = opstore.createStore({list: [], dict: {}, count: 0})
    const store2: IStore<IState> = opstore.createStore({list: [], dict: {}, count: 0})
    const listRef = store1.ref('list')
    const dictRef = store1.ref('dict')
    const countRef = store1.ref('count')

    // Add middleware to pass ops from one store to another
    store1.use((op, next) => {
      store2.dispatch(op)
      next()
    })

    listRef.lpush(1)
    listRef.lset(1, 3)
    listRef.lremi(0)
    countRef.incr()
    countRef.incr()
    countRef.decr()
    dictRef.set('foo', 'bar')

    expect(JSON.stringify(store1.get())).toEqual(JSON.stringify(store2.get()))
  })

  it('should create sub-reference', () => {
    interface IState {
      dict: {
        items: any[]
      }
    }

    const store: IStore<IState> = opstore.createStore({dict: {items: []}})
    const dictRef = store.ref('dict')
    const itemsRef = dictRef.ref('items')

    expect(Array.isArray(itemsRef.get())).toEqual(true)
  })

  it('should not send values when unchanged', () => {
    expect.assertions(1)

    const store: IStore<any> = opstore.createStore({
      bar: 1,
      foo: 1
    })

    const fooRef = store.ref('foo')

    fooRef.subscribe({
      next: () => {
        expect(true).toEqual(true)
      }
    })

    fooRef.set(1)
    fooRef.set(2)
  })
})
