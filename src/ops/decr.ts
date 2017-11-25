import * as property from 'segmented-property'
import {pathJoin} from '../pathJoin'

export interface IDecrMsg {
  type: string
  key: string
}

export function transform(state: any, msg: IDecrMsg) {
  return property.set(state, msg.key, property.get(state, msg.key) - 1)
}

export function create(type: string, refKey: string, args: string[]): IDecrMsg {
  let key = refKey

  if (args.length === 1) {
    key = pathJoin(key, args.shift())
  }

  return {type, key}
}
