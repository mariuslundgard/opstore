# opstore

An operator-based data store for JavaScript.

```sh
npm install opstore
```

[![Build Status](https://travis-ci.org/mariuslundgard/opstore.svg?branch=master)](https://travis-ci.org/mariuslundgard/opstore)

## Features
* Single source of truth. Data is stored in a single atom.
* Composable. Keep sizes small and roll your own store by only bundling the operators you need.
* Extensible. Add your own operators and middleware.
* Observable. Subscribe to partial and/or every state change.
* Message-driven. Every operation is dispatched as messages, which enables such things as logging and event sourcing.

## Usage

### Out of the box
```js
const {createStore} = require('opstore')

const store = createStore({count: 0})
const countRef = store.ref('count')

countRef.subcribe((count) => console.log(count))

console.log(countRef.get()) // 0

countRef.incr() // 1
countRef.incr() // 2
countRef.decr() // 1
countRef.decr() // 0
```

### Composing a store
```js
const buildStore = require('opstore/buildStore')

const createStore = buildStore({
  lpush: require('opstore/ops/lpush'),
  lremi: require('opstore/ops/lremi')
})

const store = createStore({
  todos: []
})

const todosRef = store.ref('todos')

todosRef.subscribe((todos) =>
  console.log(JSON.stringify(todos)))

console.log(JSON.stringify(store.get())) // []
todosRef.lpush({title: 'A'})             // [{"title":"A"}]
todosRef.lpush({title: 'B'})             // [{"title":"A"},{"title":"B"}]
todosRef.lremi(0)                        // [{"title":"B"}]
```

## API

### Top-level functions

#### `createStore([initialState])`
Creates a store instance.

```js
const createStore = require('opstore')

const store = createStore(1)

console.log(store.get()) // 1
```

### Build functions

#### `buildStore(ops)`
Builds a store factory function (e.g. `createStore`).

```js
const buildStore = require('opstore/buildStore')

// Build a custom store factory
const createStore = buildStore({
  lset: require('opstore/ops/lset')
})

const store = createStore({list: []})
const listRef = store.ref('list')

listRef.lset(0, 1)
listRef.lset(1, 2)

console.log(listRef.get()) // [1, 2]
```

### Store methods

#### `store.dispatch(op)`
Dispatches an operator message.

#### `store.get([key])`
Gets a state snapshot (the current value).

#### `store.notifyObservers(keySegmentArray)`
Notifies observers at any key.
> NOTE: A *key* is a slash-delimited path to a value in the state tree.

#### `store.ref(key)`
Creates a reference to a value in the state tree.

#### `store.set([key], value)`
Sets a value at a key (dispatches a `set` operation).

#### `store.subscribe(observer, [key])`
Subscribes to changes to a key’s value in the state tree.

#### `store.use(middlewareFn)`
Adds a middleware function to the middleware stack. This allows for intercepting operations before they are applied.

### Reference methods (operators)

Using the `ref()` method on the store (see *Store methods* above) yields a reference instance:

```js
const store = createStore({title: 'Hello, world'})
const titleRef = store.ref('title')
// Use the "titleRef" instance to modify the "title" state
```

The reference instance contains the operator methods.

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

#### `ref.lset([key], value)`
Sets a value in a list at a given index.

```js
const store = createStore({items: [1, 2]})
const itemsRef = store.ref('items')

itemsRef.lset(1, 3)
console.log(itemsRef.get()) // [1, 3]
```
