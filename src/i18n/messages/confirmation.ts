import { defineMessages } from 'react-intl'

const scope = 'dialog.confirmation'

export default defineMessages({
  'title.deletionAccount': {
    id: `${scope}.title.deletionAccount`,
    defaultMessage: 'Confirm deletion'
  },
  'message.deletionAccount': {
    id: `${scope}.message.deletionAccount`,
    defaultMessage: 'Are you sure that you want to permanently delete Account?'
  },
  'title.bookingCancellation': {
    id: `${scope}.title.bookingCancellation`,
    defaultMessage: 'Confirm cancellation'
  },
  'message.bookingCancellation': {
    id: `${scope}.message.bookingCancellation`,
    defaultMessage: 'Are you sure you want to cancel the booking of the car?'
  },
  'title.deletionCar': {
    id: `${scope}.title.deletionCar`,
    defaultMessage: 'Confirm deletion'
  },
  'message.deletionCar': {
    id: `${scope}.message.deletionCar`,
    defaultMessage: 'Are you sure that you want to delete this car?'
  },
  'button.cancel': {
    id: `${scope}.button.cancel`,
    defaultMessage: 'Cancel'
  },
  'button.confirm': {
    id: `${scope}.button.confirm`,
    defaultMessage: 'Confirm'
  },
})
