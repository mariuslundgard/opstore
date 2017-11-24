# API Documentation

## Top-level functions

### `createStore([initialState])`

Creates a store instance.

```js
const createStore = require('opstore')

const store = createStore(1)

console.log(store.get()) // 1
```

## Build functions

### `buildStore(ops)`

Builds a store factory function (e.g. `createStore`).

```js
const buildStore = require('opstore/src/buildStore')

// Build a custom store factory
const createStore = buildStore({
  lset: require('opstore/src/ops/lset')
})

const store = createStore({list: []})
const listRef = store.ref('list')

listRef.lset(0, 1)
listRef.lset(1, 2)

console.log(listRef.get()) // [1, 2]
```

## Store methods

### `store.dispatch(op)`

Dispatches an operator message.

### `store.get([key])`

Gets a state snapshot (the current value).

### `store.notifyObservers(keySegmentArray)`

Notifies observers at any key.

> NOTE: A _key_ is a slash-delimited path to a value in the state tree.

### `store.ref([key])`

Creates a reference to a value in the state tree.

### `store.subscribe(observer, [key])`

Subscribes to changes to a key’s value in the state tree.

### `store.use(middlewareFn)`

Adds a middleware function to the middleware stack. This allows for intercepting operations before they are applied.

```js
const store = createStore([])
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
const store = createStore({title: 'Hello, world'})
const titleRef = store.ref('title')
// Use the "titleRef" instance to modify the "title" state
```

The reference instance contains the operator methods. Using references is the only way to change state.

#### `ref.get([key])` (built-in)

Gets a state snapshot (the current value).

#### `ref.ref([key])` (built-in)

Creates a reference to a value in the state tree, relative to the parent reference.

#### `ref.subscribe(observerFn)` (built-in)

Subscribe to state changes.

```js
const store = createStore({items: []})
const itemsRef = store.ref('items')

itemsRef.subscribe(console.log)

itemsRef.lpush(1) // [1]
itemsRef.lpush(2) // [1, 2]
```

### Operators

#### `ref.decr([key])`

Decrements a numeric value.

```js
const store = createStore({count: 0})
const countRef = store.ref('count')

console.log(countRef.get()) // 0
countRef.decr()
console.log(countRef.get()) // -1
```

#### `ref.incr([key])`

Increments a numeric value.

```js
const store = createStore({count: 0})
const countRef = store.ref('count')

console.log(countRef.get()) // 0
countRef.incr()
console.log(countRef.get()) // 1
```

#### `ref.lpush([key], value)`

Pushes a value to end of a list.

```js
const store = createStore({items: []})
const itemsRef = store.ref('items')

itemsRef.lpush(1)
itemsRef.lpush(2)
console.log(itemsRef.get()) // [1, 2]
```

#### `ref.lremi([key], index)`

Removes a value from a list at the given index.

```js
const store = createStore({items: [1, 2]})
const itemsRef = store.ref('items')

itemsRef.lremi(1)
console.log(itemsRef.get()) // [2]
```

#### `ref.lset([key], index, value)`

Sets a value in a list at a given index.

```js
const store = createStore({items: [1, 2]})
const itemsRef = store.ref('items')

itemsRef.lset(1, 3)
console.log(itemsRef.get()) // [1, 3]
```

#### `ref.set([key], value)`

Sets a value at a key.

```js
const store = createStore({foo: 1})
const fooRef = store.ref('foo')

fooRef.set(2)
console.log(fooRef.get()) // 2
```
