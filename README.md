# opstore [![Build Status](https://travis-ci.org/mariuslundgard/opstore.svg?branch=master)](https://travis-ci.org/mariuslundgard/opstore)

An operator-based data store for JavaScript.

```sh
npm install opstore
```

## Features
* Single source of truth. Data is stored in a single atom.
* Composable. Keep sizes small and roll your own store by only bundling the operators you need.
* Extensible. Add your own operators and middleware.
* Observable. Subscribe to partial and/or every state change.
* Message-driven. Every operation is dispatched as messages, which enables such things as logging and event sourcing.

## Usage

### Basic usage
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
