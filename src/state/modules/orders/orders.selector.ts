import { createSelector } from 'reselect'
import { Order } from '~/model/Order'
import { AppState } from '~/interfaces/redux'

export const dataOrdersSelector = (state: AppState): Order[] =>
  state.orders.data
export const loadingOrdersSelector = (state: AppState): boolean =>
  state.orders.loading
export const loadedOrdersSelector = (state: AppState): boolean =>
  state.orders.loaded
export const checkDataOrdersSelector = (state: AppState): boolean =>
  !!state.orders.data?.length

export const normalizeOrdersSelector = createSelector(
  dataOrdersSelector,
  (orders) =>
    orders.reduce(
      (acc, order) => {
        if (order.order_type === 'booking') {
          if (order.status === 'pending') {
            acc.upcoming.push(order)
          } else if (order.status === 'paid') {
            acc.passed.push(order)
          } else if (order.status === 'canceled') {
            acc.cancelled.push(order)
          }
        }

        return acc
      },
      { upcoming: [], passed: [], cancelled: [] }
    )
)
