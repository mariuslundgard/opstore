import {pathJoin} from './pathJoin'
import {IObserver, IOperators, IOps, IRef, IStore} from './types'
import {basicAssign} from './utils'

export function createRef<State, SubState>(
  refKey: string,
  store: IStore<State>,
  operators: IOperators<State>
): IRef<SubState, any> {
  const localOps: IOps = {}

  Object.keys(operators).forEach(
    opKey => (localOps[opKey] = (...args: any[]) => store.dispatch(operators[opKey].create(opKey, refKey, args)))
  )

  const ref: IRef<SubState, any> = basicAssign(
    {
      get: (key: string) => store.get(pathJoin(refKey, key)),
      ref: (key: string) => store.ref(pathJoin(refKey, key)),
      subscribe: (observer: IObserver<SubState>) => store.subscribe(observer, refKey)
    },
    localOps
  )

  return ref
}
