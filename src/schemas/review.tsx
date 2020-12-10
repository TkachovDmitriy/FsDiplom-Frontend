import React from 'react'
import { object, string, number } from 'yup'
import { FormattedMessage } from 'react-intl'

import mg from '~/i18n/messages/validation'

const ReviewSchema = object().shape({
  description: string()
    .max(700)
    .required(
      (<FormattedMessage {...mg['review.description.required']} />) as any
    ),
  mark: number()
    .min(1)
    .nullable()
    .required((<FormattedMessage {...mg['review.mark.required']} />) as any)
})

export default ReviewSchema
