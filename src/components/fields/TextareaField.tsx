import React, { FC } from 'react'
import { WrappedFieldProps } from 'redux-form'
import TextField from '@material-ui/core/TextField'

interface TextareaFieldProps {
  displayError?: boolean
  required?: boolean
  helperText?: string
  InputProps?: {}
}

const Textarea: FC<WrappedFieldProps & TextareaFieldProps> = ({
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
    <TextField
      multiline={true}
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
export default Textarea
