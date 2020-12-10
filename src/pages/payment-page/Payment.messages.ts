import { defineMessages } from 'react-intl'

const scope = 'pages.dashboard'

export default defineMessages({
  title: {
    id: `${scope}.tabs.title`,
    defaultMessage: 'Payment'
  },
  titleTooltip: {
    id: `${scope}.tabs.titleTooltip`,
    defaultMessage:
      'The "€ 0" price means that "€ 0.01" is debit from your account to confirm the booking'
  },
  orderSummary: {
    id: `${scope}.title.orderSummary`,
    defaultMessage: 'Booking summary of test drive'
  },
  date: {
    id: `${scope}.item.date`,
    defaultMessage: 'Date'
  },
  car: {
    id: `${scope}.item.car`,
    defaultMessage: 'Car'
  },
  price: {
    id: `${scope}.item.price`,
    defaultMessage: 'Price'
  },
  dealer: {
    id: `${scope}.item.dealer`,
    defaultMessage: 'Dealer'
  },
  vat: {
    id: `${scope}.vat`,
    defaultMessage: '(incl. VAT)'
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Back'
  }
})
