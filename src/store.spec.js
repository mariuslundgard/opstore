'use strict'

const {createStore} = require('./')

describe('opstore', () => {
  describe('store', () => {
    it('should store data', () => {
      const store = createStore(true)
      expect(store.get()).toEqual(true)
    })

    it('should update stored data', () => {
      const store = createStore(true)
      const ref = store.ref()

      expect(store.get()).toEqual(true)
      ref.set(false)
      expect(store.get()).toEqual(false)
    })

    it('should stream state changes', done => {
      expect.assertions(3)

      const store = createStore(-1)
      const ref = store.ref()

      let idx = 0
      const unsubscribe = store.subscribe(state => {
        expect(state).toEqual(idx)

        if (idx === 2) {
          unsubscribe()
          done()
        } else {
          idx += 1
        }
      })

      ref.set(0)
      ref.set(1)
      ref.set(2)
    })

    it('should enable event sourcing', () => {
      const store1 = createStore({list: [], dict: {}, count: 0})
      const store2 = createStore({list: [], dict: {}, count: 0})
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
  })
})
