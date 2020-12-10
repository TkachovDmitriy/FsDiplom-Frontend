import { createAsyncThunk } from '@reduxjs/toolkit'
import { Deserializer } from 'jsonapi-serializer'

import TestMee from '~/services/TestMee'
import { Offer } from '~/model/Offer'

export const fetchListigs = createAsyncThunk<
  { data: Offer[]; pagination: {} },
  { page?: number; search: {} }
>('listings::Load', async ({ page, search }) => {
  const res = await TestMee.getListings(page, search)

  const data = await new Deserializer({
    keyForAttribute: 'snake_case'
  }).deserialize(res.listings)

  const promoted = await new Deserializer({
    keyForAttribute: 'snake_case',
    promoted: true
  }).deserialize(res.promoted)

  return { data: [...promoted, ...data], pagination: res.pagy }
})

interface ValidationErrors {
  errorMessage: string
  field_errors: Record<string, string>
}

export const fetchListing = createAsyncThunk<Offer, string | number>(
  'listing::Load',
  async (id, { rejectWithValue }) => {
    try {
      const res = await TestMee.getListingCar(id)

      const payload = await new Deserializer({
        keyForAttribute: 'snake_case'
      }).deserialize(res)

      return payload
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)
