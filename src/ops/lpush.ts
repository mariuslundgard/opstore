import * as property from 'segmented-property'
import {pathJoin} from '../pathJoin'
import {IStore} from '../types'

export interface ILPushOpMsg {
  type: string
  key: string
  value: any
}

export function exec(store: IStore<any>, op: ILPushOpMsg) {
  const currValue = property.get(store.state, op.key)

  store.state = property.set(store.state, op.key, currValue.concat([op.value]))
  store.notifyObservers(op.key ? op.key.split('/') : ['.'])
}

export function create(type: string, refKey: string, args: any[]): ILPushOpMsg {
  let key = refKey

  if (args.length === 2) {
    key = pathJoin(key, args.shift())
  }

  return {type, key, value: args[0]}
}
