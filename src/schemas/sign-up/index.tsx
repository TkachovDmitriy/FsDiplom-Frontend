import React from 'react'
import { FormattedMessage } from 'react-intl'
import { boolean, object } from 'yup'

import mg from '~/i18n/messages/validation'

import { fullName, email, password } from '../fields'

const SignupSchema = object().shape({
  full_name: fullName,
  email,
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
    ),
  privacy: boolean()
    .required('The terms and conditions must be accepted.')
    .oneOf([true], 'The terms and conditions must be accepted.')
})

export default SignupSchema
