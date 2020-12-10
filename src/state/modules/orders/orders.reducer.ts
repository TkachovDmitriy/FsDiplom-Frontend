import { createSlice } from '@reduxjs/toolkit'
import { fetchOrders, updateOrder } from './orders.actions'
import { Order } from '~/model/Order'

export interface OrderReducerState extends FetchStatus {
  data: Order[]
}

const initialState: OrderReducerState = {
  data: [],
  loaded: false,
  loading: true
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {
      state.data = payload
      state.loading = false
      state.loaded = true
    })
    builder.addCase(fetchOrders.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(updateOrder.fulfilled, (state, { payload }) => {
      const index = state.data.findIndex((order) => order.id === payload.id)
      if (index >= 0) {
        state.data[index] = payload
      }
    })
  }
})

export default ordersSlice
