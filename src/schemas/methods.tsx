import React from 'react'
import { addMethod, string, StringSchema, array, ArraySchema } from 'yup'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'

import mg from '~/i18n/messages/validation'

addMethod(string, 'passwordConfirmation', function (
  this: StringSchema,
  message: string
) {
  return this.test('passwordConfirmation', message, function (value) {
    const { password } = this?.parent

    return value === password
  })
})

addMethod(string, 'phoneNumberRequired', function (
  this: StringSchema,
  message: string
) {
  return this.test(
    'phoneNumberRequired',
    message ||
      ((<FormattedMessage {...mg['methods.phoneNumberRequired']} />) as any),
    (value: any) => {
      if (!value) return null

      if (!parsePhoneNumberFromString(value)?.isValid()) return null

      return !!value.toString().replace('+', '').trim()
    }
  )
})

addMethod(string, 'validateDate', function (
  this: StringSchema,
  message: string,
  format: string
) {
  return this.test(
    'validateDate',
    message || ((<FormattedMessage {...mg['methods.validateDate']} />) as any),
    (value: any) => {
      if (!value) return null

      return moment(value, format).isValid()
    }
  )
})

addMethod(array, 'validateRules', function (
  this: ArraySchema<string>,
  message: string
) {
  return this.test('validateRules', message, (value: any) => {
    if (!!value.filter(Boolean).length) return true

    return false
  })
})
