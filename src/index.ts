import * as decr from './ops/decr'
import * as incr from './ops/incr'
import * as lpush from './ops/lpush'
import * as lremi from './ops/lremi'
import * as lset from './ops/lset'
import * as set from './ops/set'
import {createFactory, createStore} from './store'
import {IOperators, IStore} from './types'

// Export op handlers
export {decr, incr, lremi, lset, lpush, set}

// Export top-level methods
export {createFactory, createStore}

// Export types
export {IOperators, IStore}

// Export default
export default {createFactory, createStore}
