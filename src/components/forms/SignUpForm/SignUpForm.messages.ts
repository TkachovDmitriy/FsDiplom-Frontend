import { defineMessages } from 'react-intl'

const scope = 'components.forms.SignUpForm'

export default defineMessages({
  // Labels
  'label.name': {
    id: `${scope}.label.name`,
    defaultMessage: 'Full name'
  },
  'label.email': {
    id: `${scope}.label.email`,
    defaultMessage: 'Email'
  },
  'button.sign-up': {
    id: `${scope}.button.sign-up`,
    defaultMessage: 'Sign up'
  }
})
