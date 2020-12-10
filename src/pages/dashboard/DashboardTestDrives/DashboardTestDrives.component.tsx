import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, useMediaQuery } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'

import {
  loadingOrdersSelector,
  normalizeOrdersSelector,
  loadedOrdersSelector
} from '~/state/modules/orders/orders.selector'
import { fetchOrders } from '~/state/modules/orders'

import TestDriveCard from '~/components/cards/TestDriveCard'
import cardType from '~/components/cards/TestDriveCard/enums'

const DashboardTestDrives: FC = () => {
  const loading = useSelector(loadingOrdersSelector)
  const loaded = useSelector(loadedOrdersSelector)
  const orders = useSelector(normalizeOrdersSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrders())
  }, [])

  return (
    <>
      <TestDriveCard
        role="client"
        testDriveData={orders.upcoming}
        type={cardType.upcoming}
        confirmation
        loading={loading && !loaded}
      />

      <TestDriveCard
        role="client"
        testDriveData={orders.passed}
        type={cardType.passed}
        loading={loading && !loaded}
      />

      <TestDriveCard
        role="client"
        testDriveData={orders.cancelled}
        type={cardType.cancelled}
        loading={loading && !loaded}
      />
    </>
  )
}

export default DashboardTestDrives
