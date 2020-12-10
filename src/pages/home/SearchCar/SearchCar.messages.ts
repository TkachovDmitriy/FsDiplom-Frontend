import { defineMessages } from 'react-intl'

const scope = 'pages.home.search'

export default defineMessages({
  brand: {
    id: `${scope}.brand`,
    defaultMessage: 'Brand'
  },
  model: {
    id: `${scope}.model`,
    defaultMessage: 'Model'
  },
  location: {
    id: `${scope}.location`,
    defaultMessage: 'Location'
  },
  locationPlaceholder: {
    id: `${scope}.locationPlaceholder`,
    defaultMessage: 'Location / zip-code'
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search'
  },
  any: {
    id: `${scope}.any`,
    defaultMessage: 'Any'
  }
})
