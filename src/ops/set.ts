import * as property from 'segmented-property'
import {pathJoin} from '../pathJoin'

export interface ISetMsg {
  type: string
  key: string
  value: any
}

export function transform(state: any, msg: ISetMsg) {
  return property.set(state, msg.key, msg.value)
}

export function create(type: string, refKey: string, args: any[]): ISetMsg {
  let key = refKey

  if (args.length === 2) {
    key = pathJoin(key, args.shift())
  }

  return {type, key, value: args[0]}
}
