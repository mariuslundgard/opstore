import {pathJoin} from './pathJoin'
import {IOpHandlers, IOps, IRef, IStore} from './types'

export function createRef<State, SubState>(
  refKey: string,
  store: IStore<State>,
  opHandlers: IOpHandlers<State>
): IRef<SubState, any> {
  const localOps: IOps = {}

  Object.keys(opHandlers).forEach(
    opKey => (localOps[opKey] = (...args: any[]) => store.dispatch(opHandlers[opKey].create(opKey, refKey, args)))
  )

  const ref: IRef<SubState, any> = {
    ...localOps,
    get: key => store.get(pathJoin(refKey, key)),
    ref: key => store.ref(pathJoin(refKey, key)),
    subscribe: observer => store.subscribe(observer, refKey)
  }

  return ref
}
