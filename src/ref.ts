import {pathJoin} from './pathJoin'
import {IObserver, IOpHandlers, IOps, IRef, IStore} from './types'
import {basicAssign} from './utils'

export function createRef<State, SubState>(
  refKey: string,
  store: IStore<State>,
  opHandlers: IOpHandlers<State>
): IRef<SubState, any> {
  const localOps: IOps = {}

  Object.keys(opHandlers).forEach(
    opKey => (localOps[opKey] = (...args: any[]) => store.dispatch(opHandlers[opKey].create(opKey, refKey, args)))
  )

  const ref: IRef<SubState, any> = basicAssign({
    get: (key: string) => store.get(pathJoin(refKey, key)),
    ref: (key: string) => store.ref(pathJoin(refKey, key)),
    subscribe: (observer: IObserver<SubState>) => store.subscribe(observer, refKey)
  }, localOps)

  return ref
}
