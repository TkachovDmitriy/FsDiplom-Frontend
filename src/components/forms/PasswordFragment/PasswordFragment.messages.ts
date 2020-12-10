import { defineMessages } from 'react-intl'

const scope = 'components.forms.PasswordFragment'

export default defineMessages({
  'label.password': {
    id: `${scope}.label.password`,
    defaultMessage: 'Password'
  },
  'label.password_confirmation': {
    id: `${scope}.label.password_confirmation`,
    defaultMessage: 'Confirm password'
  },
  'label.password.new': {
    id: `${scope}.label.password.new`,
    defaultMessage: 'New password'
  },
  'label.password_confirmation.new': {
    id: `${scope}.label.password_confirmation.new`,
    defaultMessage: 'Confirm new password'
  }
})
