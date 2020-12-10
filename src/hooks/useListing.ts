import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch } from '~/state/store'
import { Offer } from '~/model/Offer'
import { AppState } from '~/interfaces/redux'
import { fetchListing } from '~/state/modules/listings/listings.actions'
import {
  getListing,
  updatingListingsSelector
} from '~/state/modules/listings/listings.selector'

const getListingSelector = getListing()

export const useListing = (id: string | number, reject?: Function) => {
  const dispatch: AppDispatch = useDispatch()
  const loading = useSelector(updatingListingsSelector)
  const listing: Offer = useSelector(
    (state: AppState): Offer => getListingSelector(state, id)
  )

  const loadListing = async () => {
    const resultAction = await dispatch(fetchListing(id))
    if (!fetchListing.fulfilled.match(resultAction)) {
      reject && reject()
    }
  }

  useEffect(() => {
    if (loading) return
    if (!id) {
      reject && reject()
    } else if (id) {
      loadListing()
    }
  }, [])

  return { loading: !listing && loading, listing: (listing || {}) as Offer }
}

export default useListing
