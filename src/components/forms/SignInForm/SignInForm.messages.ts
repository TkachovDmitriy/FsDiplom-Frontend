import { defineMessages } from 'react-intl'

const scope = 'components.forms.SignInForm'

export default defineMessages({
  'label.email': {
    id: `${scope}.label.email`,
    defaultMessage: 'Email'
  },
  'link.forgot-password': {
    id: `${scope}.link.forgot-password`,
    defaultMessage: 'Forgot password?'
  },
  'button.sign-in': {
    id: `${scope}.button.sign-in`,
    defaultMessage: 'Sign in'
  }
})
