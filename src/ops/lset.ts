import * as property from 'segmented-property'
import {pathJoin} from '../pathJoin'

export interface ILSetMsg {
  type: string
  key: string
  index: number
  value: any
}

export function transform(state: any, msg: ILSetMsg) {
  const currValue: any[] = property.get(state, msg.key)
  const newValue = currValue.map((item, index) => {
    if (index === msg.index) {
      return msg.value
    }
    return item
  })

  return property.set(state, msg.key, newValue)
}

export function create(type: string, refKey: string, args: any[]): ILSetMsg {
  let key = refKey

  if (args.length === 3) {
    key = pathJoin(key, args.shift())
  }

  return {type, key, index: args[0], value: args[1]}
}
