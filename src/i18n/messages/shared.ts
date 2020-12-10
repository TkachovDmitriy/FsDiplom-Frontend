import { defineMessages } from 'react-intl'

const scope = 'shared'

export default defineMessages({
  vat: {
    id: `${scope}.priceBadge`,
    defaultMessage: '(incl. VAT)'
  },
  showGallery: {
    id: `${scope}.showGallery`,
    defaultMessage: 'Show gallery'
  },
  gallery: {
    id: `${scope}.gallery`,
    defaultMessage: 'Gallery'
  }
})
