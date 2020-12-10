import { Deserializer } from 'jsonapi-serializer'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { Order } from '~/model/Order'
import { AppState } from '~/interfaces/redux'
import { hasRole } from '~/constants/roles'
import TestMee from '~/services/TestMee'

interface ThunkApi {
  state: AppState
}

export const fetchOrders = createAsyncThunk<Order[], void, ThunkApi>(
  'orders::Load',
  async (_data, thunkApi) => {
    const { role } = thunkApi.getState().user
    const { isDealer, isUser } = hasRole(role)

    let payload: Order[]

    if (isUser) {
      const response = await TestMee.loadOrsers()

      payload = await new Deserializer({
        keyForAttribute: 'snake_case'
      }).deserialize(response)
    } else if (isDealer) {
      const response = await TestMee.loadDealerOrsers()

      payload = await new Deserializer({
        keyForAttribute: 'snake_case'
      }).deserialize(response.listing_orders)
    }

    return payload
  }
)

export const updateOrder = createAsyncThunk<
  Order,
  { id: string | number; status: string },
  ThunkApi
>('order::update', async ({ id, status }, thunkApi) => {
  const { role } = thunkApi.getState().user
  const { isDealer, isUser } = hasRole(role)

  let response

  if (isUser) {
    response = await TestMee.updateUserOrder(id, status)
  } else if (isDealer) {
    response = await TestMee.updateDelaerOrder(id, status)
  }

  const payload = await new Deserializer({
    keyForAttribute: 'snake_case'
  }).deserialize(response)

  return payload
})
