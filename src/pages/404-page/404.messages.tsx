import { defineMessages } from 'react-intl'

const scope = 'pages.404'

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Sorry, page not found'
  },
  subtitile: {
    id: `${scope}.subtitile`,
    defaultMessage: 'We couldn’t find the page you are looking for'
  }
})
