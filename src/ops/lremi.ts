import * as property from 'segmented-property'
import {pathJoin} from '../pathJoin'

export interface ILRemiMsg {
  type: string
  key: string
  index: number
}

export function transform(state: any, msg: ILRemiMsg) {
  const currValue: any = property.get(state, msg.key)
  const newValue = currValue.slice()

  newValue.splice(msg.index, 1)

  return property.set(state, msg.key, newValue)
}

export function create(type: string, refKey: string, args: any[]): ILRemiMsg {
  let key = refKey

  if (args.length === 2) {
    key = pathJoin(key, args.shift())
  }

  return {type, key, index: args[0]}
}
