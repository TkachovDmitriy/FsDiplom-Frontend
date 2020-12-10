// @ts-nocheck
import React, { FC } from 'react'
import { WrappedFieldProps } from 'redux-form'

import { Geossugest } from '~/components/shared'

const TextInput: FC<WrappedFieldProps> = ({
  input: { value, ...input },
  meta: { touched, error },
  ...rest
}) => {
  const errorMessage = touched && error

  return (
    <Geossugest
      variant="outlined"
      fullWidth
      error={!!errorMessage}
      helperText={errorMessage}
      options={{
        types: [],
        country: 'de'
      }}
      value={value}
      {...rest}
      {...input}
    />
  )
}

export default TextInput
