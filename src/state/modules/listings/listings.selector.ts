import { AppState } from '~/interfaces/redux'
import { Offer } from '~/model/Offer'
import { createSelector } from 'reselect'

export const loadingListingsSelector = (state: AppState): boolean =>
  state.listings.loading
export const updatingListingsSelector = (state: AppState): boolean =>
  state.listings.updating
export const loadedListingsSelector = (state: AppState): boolean =>
  state.listings.loaded
export const listingsSelector = (state: AppState): Offer[] =>
  state.listings.data

export const listingsCountSelector = (state: AppState): {} =>
  state.listings.pagination.count

const getListingId = (state: AppState, listingId): string => listingId

export const parseListingsSelector = createSelector(
  listingsSelector,
  (listings) =>
    listings.reduce(
      (acc, listing) => {
        if (listing.promoted) {
          acc.promoted.push(listing)
        } else {
          acc.other.push(listing)
        }

        return acc
      },
      { promoted: [], other: [] }
    )
)

export const getListing = (): Function =>
  createSelector(
    [listingsSelector, getListingId],
    (listing, id: number | string): Offer => {
      return listing.find((listing) => Number(listing.id) === Number(id))
    }
  )
