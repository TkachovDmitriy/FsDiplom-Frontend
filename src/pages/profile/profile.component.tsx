import React, { FC, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useIntl } from 'react-intl'

import AccountDetails from '~/components/forms/AccountDetails'
import BreadCrumbs from '~/components/breadcrumbs'
import { SEO } from '~/components/shared'
import BlockHeader from '~/components/BlockHeader'
import TestDriveCard from '~/components/cards/TestDriveCard'
import cardType from '~/components/cards/TestDriveCard/enums'
import ChangePassword from '~/components/forms/ChangePassword'

import { deleteUserAccount } from '~/state/modules/user'
import { fetchOrders } from '~/state/modules/orders'
import {
  normalizeOrdersSelector,
  loadingOrdersSelector,
  loadedOrdersSelector
} from '~/state/modules/orders/orders.selector'

import { createLocalizedPath } from '~/utils/localizedPath'
import smg from '~/i18n/messages/pages'
import links from '~/i18n/messages/links'
import mg from './profile.messages'

import useStyle from './profile.style'
import DeleteAccount from '~/components/deleteAcc'

const breadcrumbs = [
  { langLabel: links.homePage, route: '/' },
  { langLabel: links.profile, route: '/profile' }
]

const Profile: FC = (): JSX.Element => {
  const { formatMessage, locale } = useIntl()
  const history = useHistory()
  const classes = useStyle()
  const dispatch = useDispatch()

  const orders = useSelector(normalizeOrdersSelector)
  const loading = useSelector(loadingOrdersSelector)
  const loaded = useSelector(loadedOrdersSelector)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [])

  const deleteAccount = (): void => {
    dispatch(deleteUserAccount())
    history.push(createLocalizedPath('/', locale))
  }

  return (
    <>
      <SEO title={formatMessage(smg['title.profile'])} />

      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <BlockHeader
        marginTop={4}
        className={classes.title}
        translateMessageObj={mg['title']}
      />
      <TestDriveCard
        mt={2.5}
        testDriveData={orders.upcoming}
        type={cardType.upcoming}
        loading={loading && !loaded}
      />
      <TestDriveCard
        testDriveData={orders.passed}
        type={cardType.passed}
        loading={loading && !loaded}
      />
      <TestDriveCard
        testDriveData={orders.cancelled}
        type={cardType.cancelled}
        loading={loading && !loaded}
      />

      <BlockHeader translateMessageObj={mg['accountDetails']} />
      <AccountDetails />

      <BlockHeader translateMessageObj={mg['changePassword']} />
      <ChangePassword />

      <BlockHeader translateMessageObj={mg['deleteYourAccount']} />
      <DeleteAccount />
    </>
  )
}

export default Profile
