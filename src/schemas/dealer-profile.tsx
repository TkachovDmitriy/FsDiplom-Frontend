import React from 'react'
import { object, string, array } from 'yup'
import { FormattedMessage } from 'react-intl'

import { email, phone, address } from './fields'

import mg from '~/i18n/messages/validation'

const DealerProfileSchema = object().shape({
  name: string()
    .required(
      (<FormattedMessage {...mg['dealer-profile.name.required']} />) as any
    )
    .max(100),
  email,
  phone_number: phone,
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
    }),
  allowed: array()
    .nullable()
    .compact()
    .required(
      (<FormattedMessage {...mg['dealer-profile.rules.required']} />) as any
    ),
  not_allowed: array()
    .nullable()
    .compact()
    .required(
      (<FormattedMessage {...mg['dealer-profile.rules.required']} />) as any
    )
})

export default DealerProfileSchema
