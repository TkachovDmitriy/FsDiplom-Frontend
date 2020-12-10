import { defineMessages } from 'react-intl'

const scope = 'pages.profile'

export default defineMessages({
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
