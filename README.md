# opstore

An operator-based data store for JavaScript.

```sh
npm install opstore
```

[![build status](https://img.shields.io/travis/mariuslundgard/opstore/master.svg?style=flat-square)](https://travis-ci.org/mariuslundgard/opstore)
[![npm version](https://img.shields.io/npm/v/opstore.svg?style=flat-square)](https://www.npmjs.com/package/opstore)

## Features

* **Single source of truth.** Data is stored in a single, immutable atom.
* **Composable.** Keep sizes small and roll your own store by only bundling the operators you need.
* **Extensible.** Add your own operators and middleware.
* **Observable.** Subscribe to partial and/or every state change.
* **Message-driven.** Every operation is dispatched internally as a message, which enables such things as logging and
  event sourcing by way of middleware.
* **Typed.** Written in TypeScript.

## Motivation

`opstore` was built to make it easier to build “vanilla” web apps. Being able to listen to state changes in certain part
of the state tree, makes it possible to create tiny render cycles that are simple to reason about and perform well.

This project is based on ideas from [Redux](http://redux.js.org/), [Redis](https://redis.io/),
[Firebase](https://firebase.google.com/) and [Yr](https://www.yr.no/en)’s source code.

## Usage

### Out of the box

```js
import {createStore} from 'opstore'

const store = createStore({count: 0})
const countRef = store.ref('count')

countRef.subcribe(count => console.log(count))

console.log(countRef.get()) // 0

countRef.incr() // 1
countRef.incr() // 2
countRef.decr() // 1
countRef.decr() // 0
```

### Composing a store

```js
import {createFactory, lpush, lremi} from 'opstore'

const createStore = createFactory({lpush, lremi})

const store = createStore({
  todos: []
})

const todosRef = store.ref('todos')

todosRef.subscribe(todos => console.log(JSON.stringify(todos)))

console.log(JSON.stringify(store.get())) // []
todosRef.lpush({title: 'A'}) // [{"title":"A"}]
todosRef.lpush({title: 'B'}) // [{"title":"A"},{"title":"B"}]
todosRef.lremi(0) // [{"title":"B"}]
```

## Documentation

See [API Documentation](API.md).

## License

MIT © [Marius Lundgård](https://mariuslundgard.com)
