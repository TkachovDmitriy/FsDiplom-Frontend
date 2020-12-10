import React from 'react'
import { object, string, boolean } from 'yup'
import { FormattedMessage } from 'react-intl'

import mg from '~/i18n/messages/validation'

import { fullName, email, password, phone, address } from '../fields'

const SignupSchema = object().shape({
  name: fullName,
  phone_number: phone,
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
  address,
  date: object()
    .nullable()
    .shape({
      from: string().required(
        (<FormattedMessage {...mg['dealer.date.from']} />) as any
      ),
      to: string().required(
        (<FormattedMessage {...mg['dealer.date.to']} />) as any
      )
    }),
  privacy: boolean()
    .required('The terms and conditions must be accepted.')
    .oneOf([true], 'The terms and conditions must be accepted.'),
  time: object()
    .nullable()
    .shape({
      from: string()
        .required((<FormattedMessage {...mg['dealer.time.from']} />) as any)
        .validateDate(
          (<FormattedMessage {...mg['dealer.time.validateDate']} />) as any,
          'HH:mm'
        ),
      to: string()
        .required((<FormattedMessage {...mg['dealer.time.to']} />) as any)
        .validateDate(
          (<FormattedMessage {...mg['dealer.time.validateDate']} />) as any,
          'HH:mm'
        )
    })
})

export default SignupSchema
