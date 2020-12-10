// @ts-nocheck
import React, { FC } from 'react'
import { WrappedFieldProps } from 'redux-form'
import { TextField as TextInput } from '@material-ui/core'

type TextFieldProps = {
  displayError?: boolean
  required?: boolean
  helperText?: string
}

const TextField: FC<WrappedFieldProps & TextFieldProps> = ({
  input,
  meta: { touched, error },
  displayError,
  helperText,
  required,
  InputProps,
  ...rest
}) => {
  const errorMessage = (touched && error) || displayError

  return (
    <TextInput
      data-cy="text-field"
      fullWidth
      variant="outlined"
      error={!!errorMessage}
      helperText={errorMessage || helperText}
      InputProps={{
        notched: false,
        ...InputProps
      }}
      InputLabelProps={{
        required,
        shrink: true
      }}
      inputProps={{
        'data-required': required
      }}
      {...input}
      {...rest}
    />
  )
}

export default TextField
