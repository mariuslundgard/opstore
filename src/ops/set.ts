import * as property from 'segmented-property'
import {pathJoin} from '../pathJoin'
import {IStore} from '../types'

export interface ISetOpMsg {
  type: string
  key: string
  value: any
}

export function exec(store: IStore<any>, op: ISetOpMsg) {
  store.state = property.set(store.state, op.key, op.value)
  store.notifyObservers(op.key ? op.key.split('/') : ['.'])
}

export function create(type: string, refKey: string, args: any[]): ISetOpMsg {
  let key = refKey

  if (args.length === 2) {
    key = pathJoin(key, args.shift())
  }

  return {type, key, value: args[0]}
}
