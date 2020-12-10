import { defineMessages } from 'react-intl'

const scope = 'components.forms.CarForm'

export default defineMessages({
  'placeholder.review': {
    id: `${scope}.placeholder.review`,
    defaultMessage: 'Write a review'
  },

  send: {
    id: `${scope}.send`,
    defaultMessage: 'Send'
  },
  stars: {
    id: `${scope}.stars`,
    defaultMessage: 'Tap a star to rate:'
  },
  review: {
    id: `${scope}.review`,
    defaultMessage: 'Review'
  }
})
