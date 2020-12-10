import { defineMessages } from 'react-intl'

const scope = 'pages.profile'

export default defineMessages({
  title: {
    id: `${scope}.title.myProfile`,
    defaultMessage: 'My profile'
  },
  testDriveData: {
    id: `${scope}.card.testDriveData`,
    defaultMessage: 'Test drive date'
  },
  price: {
    id: `${scope}.card.price`,
    defaultMessage: 'Price'
  },
  car: {
    id: `${scope}.card.car`,
    defaultMessage: 'Car'
  },
  dealer: {
    id: `${scope}.card.dealer`,
    defaultMessage: 'Dealer'
  },
  cancel: {
    id: `${scope}.card.cancel`,
    defaultMessage: 'Cancel'
  },
  getACoupon: {
    id: `${scope}.getACoupon`,
    defaultMessage: 'Get a coupon'
  },
  upcoming: {
    id: `${scope}.card.upcoming`,
    defaultMessage: 'Upcoming'
  },
  passed: {
    id: `${scope}.card.passed`,
    defaultMessage: 'Passed'
  },
  cancelled: {
    id: `${scope}.card.cancelled`,
    defaultMessage: 'Cancelled'
  },
  accountDetails: {
    id: `${scope}.accountDetails`,
    defaultMessage: 'My account details'
  },
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: 'Change password'
  },
  testDrives: {
    id: `${scope}.testDrives`,
    defaultMessage: 'Test Drives'
  },
  deleteYourAccount: {
    id: `${scope}.deleteYourAccount`,
    defaultMessage: 'Delete your account'
  },
  deleteAccountRules: {
    id: `${scope}.deleteAccountRules`,
    defaultMessage:
      'When you delete your account, you lose access to TestMee account, and we permanently delete your personal data.'
  },
  deleteAccountProtected: {
    id: `${scope}.deleteAccountRulesProtected`,
    defaultMessage:
      'This page is protected by reCAPTCHA and the Google <pp>Privacy Policy</pp> and <tos>Terms of Service</tos> apply.'
  },
  deleteAccButton: {
    id: `${scope}.deleteAccButton`,
    defaultMessage: 'Delete my account'
  }
})
