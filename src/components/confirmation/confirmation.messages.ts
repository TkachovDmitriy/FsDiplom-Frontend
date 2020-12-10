import { defineMessages } from 'react-intl'

const scope = 'page.confirmation'

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Confirmation in progress'
  },
  subtitle: {
    id: `${scope}.subtitle`,
    defaultMessage: 'Please waiting ...'
  },
  'toastr.title': {
    id: `${scope}.toastr.title`,
    defaultMessage: 'Email'
  },
  'toastr.message': {
    id: `${scope}.toastr.message`,
    defaultMessage: 'Your have confirmed your email address.'
  }
})
