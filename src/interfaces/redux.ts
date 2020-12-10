import { ToastrState } from 'react-redux-toastr'

import { CarsReducerState } from '~/state/modules/cars/cars.reducer'
import { ListingsReducerState } from '~/state/modules/listings/listings.reducer'
import { OrderReducerState } from '~/state/modules/orders/orders.reducer'

/**
 * Redux state
 */
export type AppState = Readonly<{
  readonly user: any
  readonly toastr: ToastrState
  readonly cars: CarsReducerState
  readonly orders: OrderReducerState
  readonly listings: ListingsReducerState
}>

/**
 * Redux base action
 */
export type ReduxBaseAction = {
  type: string
  payload?: any
  meta?: any
  error?: any
  included?: any
}
