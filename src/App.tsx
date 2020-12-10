import React from 'react'
import { RouteProps, RouteComponentProps, withRouter } from 'react-router'
import { ModalProvider } from 'react-modal-hook'
import { TransitionGroup } from 'react-transition-group'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import moment from 'moment-timezone'
import 'moment/locale/de'

import MomentAdapter from '@material-ui/pickers/adapter/moment'
import { LocalizationProvider } from '@material-ui/pickers'

import store from './state/store'
import { authtorize } from './state/modules/user'

import GuardRouter from './utils/GuardRoute'

interface AppRouteProps extends RouteProps {
  layout: React.FunctionComponent
  redirect?: string
  meta?: {
    [key: string]: any
  }
}

interface AppState {
  loading: boolean
}

moment.tz.setDefault('Europe/Berlin')

class App extends React.Component<
  WrappedComponentProps & RouteComponentProps,
  AppState
> {
  state = {
    loading: false
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }

  componentDidMount(): void {
    try {
      const jwt = localStorage.getItem('jwt_token')

      if (jwt) {
        this.setState({ loading: true })

        store.dispatch(authtorize({ jwt }))
      }
    } catch (error) {
    } finally {
      this.setState({ loading: false })
    }
  }

  render(): JSX.Element {
    const { loading } = this.state
    const {
      intl: { locale }
    } = this.props

    if (loading) return null

    moment.locale(locale)

    return (
      <LocalizationProvider
        dateLibInstance={moment}
        dateAdapter={MomentAdapter}
        locale={locale}
      >
        <ModalProvider rootComponent={TransitionGroup}>
          <GuardRouter />
        </ModalProvider>
      </LocalizationProvider>
    )
  }
}

export default injectIntl(withRouter(App))
