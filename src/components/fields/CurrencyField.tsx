// @ts-nocheck
import React, { FC } from 'react'
import { WrappedFieldProps } from 'redux-form'
import NumberFormat from 'react-number-format'
import { TextField as TextInput, InputAdornment } from '@material-ui/core'

type TextFieldProps = {
  displayError?: boolean
  required?: boolean
  helperText?: string
}

const NumberFormatCustom: FC = (props) => {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values): void => {
        onChange(values.value)
      }}
      thousandSeparator
      allowNegative={false}
      allowEmptyFormatting
      isNumericString={false}
    />
  )
}

const TextField: FC<WrappedFieldProps & TextFieldProps> = ({
  input: { onBlur, ...input },
  meta: { touched, error },
  displayError,
  helperText,
  required,
  ...rest
}) => {
  const errorMessage = (touched && error) || displayError

  return (
    <TextInput
      data-cy="currency-field"
      fullWidth
      variant="outlined"
      error={!!errorMessage}
      helperText={errorMessage || helperText}
      InputProps={{
        notched: false,
        inputComponent: NumberFormatCustom,
        startAdornment: <InputAdornment position="start">€</InputAdornment>
      }}
      InputLabelProps={{
        required,
        shrink: true
      }}
      inputProps={{
        'data-required': required
      }}
      onBlur={(): void => onBlur(input.value)}
      {...input}
      {...rest}
    />
  )
}

export default TextField
