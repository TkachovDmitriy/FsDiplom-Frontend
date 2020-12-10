import { defineMessages } from 'react-intl'

const scope = 'pages.sign-up.dealer'

export default defineMessages({
  // Title
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Register as car dealer on TestMee!'
  },
  'title.description': {
    id: `${scope}.title.description`,
    defaultMessage:
      'Your account will be activated immediately after verification.'
  },
  'phone.title': {
    id: `${scope}.phone.title`,
    defaultMessage: 'Continue your registration'
  },
  'phone.subtitle': {
    id: `${scope}.phone.subtitle`,
    defaultMessage: 'Please complete your phone verification'
  },

  // Footer
  'account.text': {
    id: `${scope}.account.text`,
    defaultMessage: 'Already have an account?'
  },
  'link.sign-in': {
    id: `${scope}.link.sign-in`,
    defaultMessage: 'Sign in'
  }
})
