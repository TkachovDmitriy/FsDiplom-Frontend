import { defineMessages } from 'react-intl'

const scope = 'pages.sign-in'

export default defineMessages({
  // Title
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Welcome back'
  },
  'title.description1': {
    id: `${scope}.title.description1`,
    defaultMessage: "Hello again, it's good to see you."
  },
  'title.description2': {
    id: `${scope}.title.description2`,
    defaultMessage: "Let's get you signed back in"
  },

  'button.google': {
    id: `${scope}.button.google`,
    defaultMessage: 'Sign in with Google'
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
