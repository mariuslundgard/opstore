# API Documentation

* [Top-level functions](#top-level-functions)
  * [`createStore`](#createStore)
  * [`createFactory`](#createFactory)
* [Store methods](#store-methods)
  * [`store.dispatch`](#store.dispatch)
  * [`store.get`](#store.get)
  * [`store.notifyObservers`](#store.notifyObservers)
  * [`store.ref`](#store.ref)
  * [`store.subscribe`](#store.subscribe)
  * [`store.use`](#store.use)
* [Reference methods](#reference-methods)
  * [`ref.get`](#ref.get)
  * [`ref.ref`](#ref.ref)
  * [`ref.subscribe`](#ref.subscribe)
* [Reference operator methods (optional)](#reference-operator-methods-optional)
  * [`ref.decr`](#ref.decr)
  * [`ref.incr`](#ref.incr)
  * [`ref.lpush`](#ref.lpush)
  * [`ref.lremi`](#ref.lremi)
  * [`ref.lset`](#ref.lset)
  * [`ref.set`](#ref.set)

## Top-level functions

### <a name="createStore"></a> `createStore([initialState])`

Creates a store instance.

```js
import {createStore} from 'opstore'

const store = createStore(1)

console.log(store.get()) // 1
```

### <a name="createFactory"></a> `createFactory(opHandlers)`

Builds a store factory function.

```js
import {createFactory, decr, incr, lpush, lremi, lset, set} from 'opstore'

// Build a custom store factory with just the necessary operators
const createStore = createFactory({decr, incr, lpush, lremi, lset, set})

const store = createStore({list: []})
const listRef = store.ref('list')

listRef.lset(0, 1)
listRef.lset(1, 2)

console.log(listRef.get()) // [1, 2]
```

## Store methods

### <a name="store.dispatch"></a> `store.dispatch(op)`

Dispatches an operator message.

### <a name="store.get"></a> `store.get([key])`

Gets a state snapshot (the current value).

### <a name="store.notifyObservers"></a> `store.notifyObservers(keySegmentArray)`

Notifies observers at any key.

> NOTE: A _key_ is a slash-delimited path to a value in the state tree.

### <a name="store.ref"></a> `store.ref([key])`

Creates a reference to a value in the state tree.

### <a name="store.subscribe"></a> `store.subscribe(observer, [key])`

Subscribes to changes to a key’s value in the state tree.

```js
const store = opstore.create(0)

store.subscribe({
  next(state) {
    console.log(state)
  }
})

store.ref().incr() // 1
store.ref().incr() // 2
```

### <a name="store.use"></a> `store.use(middlewareFn)`

Adds a middleware function to the middleware stack. This allows for intercepting operations before they are applied.

```js
const store = opstore.create([])
const ref = store.ref()

// Add a simple logger middleware
store.use((op, next) => {
  console.log(JSON.stringify(op))
  next()
})

ref.lpush(1) // {"type":"lpush","value":1}
```

## Reference methods

Using the `ref()` method on the store (see _Store methods_ above) yields a reference instance:

```js
const store = opstore.create({title: 'Hello, world'})
const titleRef = store.ref('title')
// Use the "titleRef" instance to modify the "title" state
```

The reference instance contains the operator methods. Using references is the only way to change state.

### <a name="ref.get"></a> `ref.get([key])` (built-in)

Gets a state snapshot (the current value).

### <a name="ref.ref"></a> `ref.ref([key])` (built-in)

Creates a reference to a value in the state tree, relative to the parent reference.

### <a name="ref.subscribe"></a> `ref.subscribe(observer)` (built-in)

Subscribe to state changes.

```js
const store = opstore.create({items: []})
const itemsRef = store.ref('items')

itemsRef.subscribe({next: console.log})

itemsRef.lpush(1) // [1]
itemsRef.lpush(2) // [1, 2]
```

### Reference operator methods (optional)

### <a name="ref.decr"></a> `ref.decr([key])`

Decrements a numeric value.

```js
const store = opstore.create({count: 0})
const countRef = store.ref('count')

console.log(countRef.get()) // 0
countRef.decr()
console.log(countRef.get()) // -1
```

### <a name="ref.incr"></a> `ref.incr([key])`

Increments a numeric value.

```js
const store = opstore.create({count: 0})
const countRef = store.ref('count')

console.log(countRef.get()) // 0
countRef.incr()
console.log(countRef.get()) // 1
```

### <a name="ref.lpush"></a> `ref.lpush([key], value)`

Pushes a value to end of a list.

```js
const store = opstore.create({items: []})
const itemsRef = store.ref('items')

itemsRef.lpush(1)
itemsRef.lpush(2)
console.log(itemsRef.get()) // [1, 2]
```

### <a name="ref.lremi"></a> `ref.lremi([key], index)`

Removes a value from a list at the given index.

```js
const store = opstore.create({items: [1, 2]})
const itemsRef = store.ref('items')

itemsRef.lremi(1)
console.log(itemsRef.get()) // [2]
```

### <a name="ref.lset"></a> `ref.lset([key], index, value)`

Sets a value in a list at a given index.

```js
const store = opstore.create({items: [1, 2]})
const itemsRef = store.ref('items')

itemsRef.lset(1, 3)
console.log(itemsRef.get()) // [1, 3]
```

### <a name="ref.set"></a> `ref.set([key], value)`

Sets a value at a key.

```js
const store = opstore.create({foo: 1})
const fooRef = store.ref('foo')

fooRef.set(2)
console.log(fooRef.get()) // 2
```
