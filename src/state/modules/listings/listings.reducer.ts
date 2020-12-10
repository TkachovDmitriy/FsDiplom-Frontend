import { fetchListigs, fetchListing } from './listings.actions'
import { createSlice } from '@reduxjs/toolkit'

import { Offer } from '~/model/Offer'

export interface ListingsReducerState {
  data: Offer[]
  pagination: any
  loaded: boolean
  loading: boolean
  updating: boolean
}

const initialState: ListingsReducerState = {
  data: [],
  pagination: {},
  loaded: false,
  loading: false,
  updating: false
}

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListigs.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchListigs.fulfilled, (state, { payload }) => {
      state.data = payload.data
      state.pagination = payload.pagination
      state.loading = false
      state.loaded = true
    })
    builder.addCase(fetchListigs.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(fetchListing.pending, (state) => {
      state.updating = true
    })
    builder.addCase(fetchListing.fulfilled, (state, { payload }) => {
      const carIndex = state.data.findIndex(({ id }) => +id === +payload.id)
      if (carIndex >= 0) {
        state.data[carIndex] = payload
      } else {
        state.data.push(payload)
      }

      state.updating = false
    })
    builder.addCase(fetchListing.rejected, (state) => {
      state.updating = false
    })
  }
})

export default listingsSlice
