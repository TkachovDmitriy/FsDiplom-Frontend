import { combineReducers, CombinedState } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import { AppState } from '~/interfaces/redux'
import normalizrMiddleware from './middlewares/normalizrMiddleware'
import * as reducers from './modules'

// Actions unions
import { UserActionsUnion, UserActionsTypes } from './modules/user/user.types'

export type ActionsUnion = UserActionsUnion

const rootReducer = (
  state: AppState | undefined,
  action: ActionsUnion
): CombinedState<AppState> => {
  if (action.type === UserActionsTypes.LOGOUT)
    state = {
      ...state,
      user: undefined,
      orders: undefined,
      cars: undefined
    }
  return combineReducers<AppState>({
    ...reducers
  })(state, action)
}

const initStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    normalizrMiddleware
  ]
})

export type AppDispatch = typeof initStore.dispatch

export default initStore
