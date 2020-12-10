import React from 'react'
import { Redirect } from 'react-router'

import store from '~/state/store'
import { RolesUnion } from '~/constants/roles'

export const Authorization = (allowedRoles: Array<RolesUnion>) => (
  WrappedComponent
): React.ComponentClass =>
  class WithAuthorization extends React.Component {
    state = {
      user: store.getState().user
    }

    render(): JSX.Element {
      const { role } = this.state.user

      if (allowedRoles.includes(role))
        return <WrappedComponent {...this.props} />

      return <Redirect to="/" />
    }
  }

export const User = Authorization(['user'])

export const Dealer = Authorization(['dealer', 'admin'])

export const Admin = Authorization(['admin'])
