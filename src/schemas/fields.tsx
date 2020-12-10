import React from 'react'
import { string, number, mixed } from 'yup'
import { FormattedMessage } from 'react-intl'
import './methods'

import mg from '~/i18n/messages/validation'

export const fullName = string()
  .required((<FormattedMessage {...mg['fields.fullName.required']} />) as any)
  .max(255)
  .trim()
export const firstName = string().required(
  (<FormattedMessage {...mg['fields.firstName.required']} />) as any
)
export const lastName = string().required(
  (<FormattedMessage {...mg['fields.lastName.required']} />) as any
)

export const phone = string()
  .phoneNumberRequired()
  .nullable()
  .required(
    (<FormattedMessage {...mg['fields.phoneNumber.required']} />) as any
  )

export const email = string()
  .email((<FormattedMessage {...mg['fields.email.email']} />) as any)
  .required((<FormattedMessage {...mg['fields.email.required']} />) as any)

export const password = string()
  .min(8, (<FormattedMessage {...mg['fields.password.required']} />) as any)
  .max(50, (<FormattedMessage {...mg['fields.password.required']} />) as any)
  .required((<FormattedMessage {...mg['fields.password.required']} />) as any)

export const address = mixed()
  .nullable()
  .required((<FormattedMessage {...mg['fields.address.required']} />) as any)

export const country = string()
export const city = string()
export const street = string()
export const zipCode = number()
