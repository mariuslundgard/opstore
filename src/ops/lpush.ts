import * as property from 'segmented-property'
import {pathJoin} from '../pathJoin'

export interface ILPushMsg {
  type: string
  key: string
  value: any
}

export function transform(state: any, msg: ILPushMsg) {
  const currValue = property.get(state, msg.key)

  return property.set(state, msg.key, currValue.concat([msg.value]))
}

export function create(type: string, refKey: string, args: any[]): ILPushMsg {
  let key = refKey

  if (args.length === 2) {
    key = pathJoin(key, args.shift())
  }

  return {type, key, value: args[0]}
}
