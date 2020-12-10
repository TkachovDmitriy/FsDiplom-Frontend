import { defineMessages } from 'react-intl'

const scope = 'pages.allCars.search'

export default defineMessages({
  location: {
    id: `${scope}.location`,
    defaultMessage: 'Location'
  },
  brand: {
    id: `${scope}.brand`,
    defaultMessage: 'Brand'
  },
  model: {
    id: `${scope}.model`,
    defaultMessage: 'Model'
  },
  fuelType: {
    id: `${scope}.fuelType`,
    defaultMessage: 'Fuel type'
  },
  dealer: {
    id: `${scope}.dealer`,
    defaultMessage: 'Dealer'
  },
  locationPlaceholder: {
    id: `${scope}.locationPlaceholder`,
    defaultMessage: 'Location / zip-code'
  },
  any: {
    id: `${scope}.any`,
    defaultMessage: 'Any'
  },
  'no-options.brand': {
    id: `${scope}.no-options.brand`,
    defaultMessage: 'First select the brand'
  },
  'no-options.model': {
    id: `${scope}.no-options.model`,
    defaultMessage: 'First select the model'
  },
  'no-options': {
    id: `${scope}.no-options`,
    defaultMessage: 'No options'
  }
})
