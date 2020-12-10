import { defineMessages } from 'react-intl'

const scope = 'toastr'

export default defineMessages({
  // title
  'title.success': {
    id: `${scope}.title.success`,
    defaultMessage: 'Success'
  },
  // message
  'message.car-created': {
    id: `${scope}.message.car-created`,
    defaultMessage: 'Car created'
  },
  'message.car-deleted': {
    id: `${scope}.message.car-deleted`,
    defaultMessage: 'Car deleted'
  },
  'message.password-changed': {
    id: `${scope}.message.password-changed`,
    defaultMessage: 'Password changed'
  }
})
