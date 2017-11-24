import {buildStore} from './buildStore'
import opHandlers from './ops'
import {StoreFactory} from './types'

export const createStore: StoreFactory<any> = buildStore(opHandlers)
