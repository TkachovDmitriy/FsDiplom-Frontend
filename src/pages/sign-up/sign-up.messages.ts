import { defineMessages } from 'react-intl'

const scope = 'pages.sign-up'

export default defineMessages({
  // Title
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Glad to meet you!'
  },
  'title.description': {
    id: `${scope}.title.description`,
    defaultMessage: 'Sing up to Testmee'
  },
  'button.google': {
    id: `${scope}.button.google`,
    defaultMessage: 'Sign up with Google'
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
