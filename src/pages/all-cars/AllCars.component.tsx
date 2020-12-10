import React, { FC, useState, useMemo, useEffect, useCallback } from 'react'
import { compose } from 'redux'
import { useDispatch, useSelector, connect } from 'react-redux'
import { useAsync } from 'react-async'
import { withRouter, RouteComponentProps, useHistory } from 'react-router'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { FormattedMessage, useIntl, FormattedPlural } from 'react-intl'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { Grid, Box, Button } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import qs from 'query-string'

import Desktop from '~/containers/Desktop'
import BreadCrumbs from '~/components/breadcrumbs'
import BookCarCard from '~/components/cards/BookCarCard'
import { Text, Flexbox, SEO } from '~/components/shared'
import { fetchListigs } from '~/state/modules/listings'
import {
  loadingListingsSelector,
  listingsSelector,
  listingsCountSelector
} from '~/state/modules/listings/listings.selector'

import TestMee from '~/services/TestMee'
import { INITIAL_SEARCH_STATE } from '~/constants/index'

import { SearchCarInputs } from '~/interfaces/inputs'

import CarsFilter from './CarsFilter'
import CarSearch from './CarSearch'

import links from '~/i18n/messages/links'
import smg from '~/i18n/messages/pages'
import mg from './AllCars.messages'
import cfmg from './CarsFilter/CarsFilter.messages'

import useStyle from './AllCars.style'

import CarSearchModal from './CarSearch/CarSearchModal'
import allNews from '../../data/mocks/allNews'

const listingsPlaceholder = new Array(1).fill({})

const AllCars: FC<InjectedFormProps<SearchCarInputs> & RouteComponentProps> = ({
  form,
  initialize,
  reset,
  change
}): JSX.Element => {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const [modal, setModal] = useState(false)
  const [dealers, setDealerNames] = useState<[]>([])

  const loading = useSelector(loadingListingsSelector)
  const total = useSelector(listingsCountSelector)

  const values = {
    ...INITIAL_SEARCH_STATE,
    ...(qs.parse(history.location.search) || {})
  }

  const { search, filters, page = 1 } = useMemo(() => {
    const { page, ...search } = { ...(values || {}) }
    const { sorting: _sorting, ...filters } = search as SearchCarInputs

    return { search, filters, page }
  }, [values])

  useDeepCompareEffect(() => {
    dispatch(fetchListigs({ page, search }))
  }, [search, page])

  const handlePaginationChange = useCallback((_event, page): void => {
    change('page', page)
    window.scrollTo({ top: 0 })
  }, [])

  const totalCars = useMemo(() => Math.ceil(+total / 10), [total])

  return (
    <>
      <SEO title={formatMessage(smg['title.all-cars'])} />

      <Flexbox justifyContent="space-between" alignItems="center">
        <Text variant="h2" mt={3.75} mb={3.75}>
          {total} Articles
        </Text>
      </Flexbox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Flexbox flex={1} flexDirection="column">
            {allNews?.map((car, index) => (
              <BookCarCard loading={loading} key={car.id || index} {...car} />
            ))}
          </Flexbox>
        </Grid>
      </Grid>
    </>
  )
}

export default compose<React.FC>(withRouter)(AllCars)
