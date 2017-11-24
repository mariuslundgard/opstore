import * as property from 'segmented-property'
import {pathJoin} from '../pathJoin'
import {IStore} from '../types'

export interface IIncrOpMsg {
  type: string
  key: string
}

export function exec(store: IStore<any>, op: IIncrOpMsg) {
  store.state = property.set(store.state, op.key, store.get(op.key) + 1)
  store.notifyObservers(op.key ? op.key.split('/') : ['.'])
}

export function create(type: string, refKey: string, args: string[]): IIncrOpMsg {
  let key = refKey

  if (args.length === 1) {
    key = pathJoin(key, args.shift())
  }

  return {type, key}
}
