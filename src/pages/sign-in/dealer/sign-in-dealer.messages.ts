import { defineMessages } from 'react-intl'

const scope = 'pages.sign-in.dealer'

export default defineMessages({
  // Title
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Welcome to TestMee dealer area'
  },
  'title.description1': {
    id: `${scope}.title.description1`,
    defaultMessage: 'Log in and create an advertisement.'
  },
  'title.description2': {
    id: `${scope}.title.description2`,
    defaultMessage: "Let's get you signed back in"
  },

  // Footer
  'account.text': {
    id: `${scope}.account.text`,
    defaultMessage: "Don't have an account?"
  },
  'link.sign-up': {
    id: `${scope}.link.sign-up`,
    defaultMessage: 'Sign up'
  }
})
