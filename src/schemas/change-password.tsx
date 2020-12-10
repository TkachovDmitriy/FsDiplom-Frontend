import React from 'react'
import { FormattedMessage } from 'react-intl'
import { object } from 'yup'

import mg from '~/i18n/messages/validation'

import { password } from './fields'

const ChangePasswordSchema = object().shape({
  password,
  password_confirmation: password
    .passwordConfirmation(
      (
        <FormattedMessage
          {...mg['password.confirmation.passwordConfirmation']}
        />
      ) as any
    )
    .required(
      (<FormattedMessage {...mg['password.confirmation.required']} />) as any
    )
})

export default ChangePasswordSchema
