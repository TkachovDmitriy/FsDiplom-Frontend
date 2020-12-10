import React, { FC, useMemo } from 'react'
import { RouteComponentProps, Redirect, Route, RouteProps } from 'react-router'
import { useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import { router, RouterRoute } from '../routes'

import { LocalizedSwitch } from '~/containers/LocalizedSwitch'
import { AppState } from '~/interfaces/redux'
import { createLocalizedPath } from './localizedPath'

const AppRoute: React.FC<RouteProps & RouterRoute> = (props) => {
  const {
    component: Component,
    layout: Layout,
    meta = {},
    redirect,
    ...rest
  } = props

  const { locale } = useIntl()
  const { role } = useSelector((state: AppState) => state?.user)

  const toRedirect = useMemo(() => {
    const path = router.beforeEnter(props) || redirect
    if (path) return createLocalizedPath(path, locale)
  }, [role])

  return toRedirect ? (
    <Redirect to={toRedirect} />
  ) : (
    <Route
      {...rest}
      render={(props: RouteComponentProps): JSX.Element => (
        <Layout>
          <Component {...props} {...meta} />
        </Layout>
      )}
    />
  )
}

const GuardRouter: FC = () => {
  return (
    <LocalizedSwitch>
      {router.routes.map((routeProps) => {
        return <AppRoute key={routeProps.path} {...routeProps} />
      })}
    </LocalizedSwitch>
  )
}
export default GuardRouter
