export interface IObserver<T> {
  next: (value: T) => void
  error?: (err: Error) => void
  complete?: () => void
}

export interface IObservers {
  [key: string]: Array<IObserver<any>>
}

export interface ISubscription {
  unsubscribe: () => void
}

export type Op = (...args: any[]) => void

export interface IRef<T, A> {
  ref: (key?: string) => IRef<A, any>
  get: (key?: string) => any
  subscribe: (observer: IObserver<T>) => ISubscription
  // tslint:disable-next-line ban-types
  [key: string]: Function
}

export interface IRefs {
  [key: string]: IRef<any, any>
}

export interface IMsg {
  type: string
  [key: string]: any
}

export interface IOperator<T> {
  create: (...args: any[]) => IMsg
  transform: (state: T, msg: IMsg) => T
}

export interface IOperators<T> {
  [key: string]: IOperator<T>
}

export interface IOps {
  [key: string]: Op
}

export type MiddlewareFn = (msfg: IMsg, next: () => void) => void

export interface IStore<T> {
  dispatch: (op: any) => void
  get: (path?: string) => any
  notifyObservers: (keys: string[]) => void
  ref: (key?: string) => IRef<T, any>
  state: T
  subscribe: (observer: IObserver<any>, refKey?: string) => ISubscription
  use: (middlewareFn: MiddlewareFn) => void
}

export type StoreFactory<T> = (state: T) => IStore<T>
