import { defineMessages } from 'react-intl'

const scope = 'components.layouts.Header'

export default defineMessages({
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Log out'
  },
  'login-as-dealer': {
    id: `${scope}.login-as-dealer`,
    defaultMessage: 'Login as dealer'
  },
  'login-as-user': {
    id: `${scope}.login-as-user`,
    defaultMessage: 'Login as user'
  }
})
