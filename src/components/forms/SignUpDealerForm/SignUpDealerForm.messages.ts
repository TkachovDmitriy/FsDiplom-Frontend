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
  'label.phone': {
    id: `${scope}.label.phone`,
    defaultMessage: 'Phone number'
  },
  'label.rules': {
    id: `${scope}.label.rules`,
    defaultMessage: 'Rules'
  },
  'label.opening-hours': {
    id: `${scope}.label.opening-hours`,
    defaultMessage: 'Opening hours'
  },
  'label.town': {
    id: `${scope}.label.town`,
    defaultMessage: 'Town'
  },
  'label.address': {
    id: `${scope}.label.address`,
    defaultMessage: 'Address'
  },
  'label.date': {
    id: `${scope}.label.date`,
    defaultMessage: 'Date'
  },
  'label.time': {
    id: `${scope}.label.time`,
    defaultMessage: 'Time'
  },
  'button.sign-up': {
    id: `${scope}.button.sign-up`,
    defaultMessage: 'Sign up'
  }
})
