import { defineMessages } from 'react-intl'

const scope = 'pages.dashboard.profile'

export default defineMessages({
  // title
  'title.main-details': {
    id: `${scope}.title.main-details`,
    defaultMessage: 'Main details'
  },
  'secure.changedPassword': {
    id: `${scope}.secure.changedPassword`,
    defaultMessage: 'Changed password '
  },
  'secure.deleteYourAccount': {
    id: `${scope}.secure.deleteYourAccount`,
    defaultMessage: 'Delete your account '
  },
  'title.rules': {
    id: `${scope}.title.rules`,
    defaultMessage: 'Rules of test drive'
  },
  // label
  'label.allowed': {
    id: `${scope}.label.allowed`,
    defaultMessage: 'Allowed'
  },
  'label.not-allowed': {
    id: `${scope}.label.not-allowed`,
    defaultMessage: 'Not allowed'
  },
  // hint
  'hint.date': {
    id: `${scope}.hint.date`,
    defaultMessage: 'Write the date you are open: Monday-Friday'
  },
  'hint.time': {
    id: `${scope}.label.time`,
    defaultMessage: 'Write the time you are open: 10:00-18:00'
  },
  // button
  'button.submit': {
    id: `${scope}.button.submit`,
    defaultMessage: 'Save'
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
