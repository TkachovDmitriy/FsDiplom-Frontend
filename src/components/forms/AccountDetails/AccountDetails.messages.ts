import { defineMessages } from 'react-intl'

const scope = 'components.forms.AccountDetailsForm'

export default defineMessages({
  saveChanges: {
    id: `${scope}.button.saveChanges`,
    defaultMessage: 'Save changes'
  },
  // toastr
  'toastr.title': {
    id: `${scope}.toastr.title`,
    defaultMessage: 'Success'
  },
  'toastr.message': {
    id: `${scope}.toastr.message`,
    defaultMessage: 'Updated!'
  }
})
