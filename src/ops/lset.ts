import * as property from 'segmented-property'
import {pathJoin} from '../pathJoin'
import {IStore} from '../types'

export interface ILSetOpMsg {
  type: string
  key: string
  index: number
  value: any
}

export function exec(store: IStore<any>, op: ILSetOpMsg) {
  const currValue: any[] = property.get(store.state, op.key)
  const newValue = currValue.map((item, index) => {
    if (index === op.index) {
      return op.value
    }
    return item
  })

  store.state = property.set(store.state, op.key, newValue)
  store.notifyObservers(op.key ? op.key.split('/') : ['.'])
}

export function create(type: string, refKey: string, args: any[]): ILSetOpMsg {
  let key = refKey

  if (args.length === 3) {
    key = pathJoin(key, args.shift())
  }

  return {type, key, index: args[0], value: args[1]}
}
