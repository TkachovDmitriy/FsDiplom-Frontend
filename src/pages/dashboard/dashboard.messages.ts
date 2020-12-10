import { defineMessages } from 'react-intl'

const scope = 'pages.dashboard'

export default defineMessages({
  // toggle buttons
  listing: {
    id: `${scope}.tabs.listing`,
    defaultMessage: 'Listing'
  },
  'test-drives': {
    id: `${scope}.tabs.test-drives`,
    defaultMessage: 'Test drives'
  },
  'new-article': {
    id: `${scope}.tabs.new-article`,
    defaultMessage: 'Add a article'
  },
  profile: {
    id: `${scope}.tabs.profile`,
    defaultMessage: 'Profile'
  },

  title: {
    id: `${scope}.title`,
    defaultMessage: 'Dashboard'
  },
  passedCar: {
    id: `${scope}.tabs.passedCar`,
    defaultMessage:
      'When the test drive has been passed please press confirm button'
  }
})
