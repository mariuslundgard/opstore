import * as property from 'segmented-property'
import {pathJoin} from '../pathJoin'
import {IStore} from '../types'

export interface ILRemiOpMsg {
  type: string
  key: string
  index: number
}

export function exec(store: IStore<any>, op: ILRemiOpMsg) {
  const currValue: any = property.get(store.state, op.key)
  const newValue = currValue.slice()

  newValue.splice(op.index, 1)
  store.state = property.set(store.state, op.key, newValue)
  store.notifyObservers(op.key ? op.key.split('/') : ['.'])
}

export function create(type: string, refKey: string, args: any[]): ILRemiOpMsg {
  let key = refKey

  if (args.length === 2) {
    key = pathJoin(key, args.shift())
  }

  return {type, key, index: args[0]}
}
