// @ts-nocheck
import React, { FC } from 'react'
import { WrappedFieldProps } from 'redux-form'
import { Select } from '~/components/shared'

type SelectFieldProps = {
  displayError?: boolean
  required?: boolean
  helperText?: string
}

const SelectField: FC<WrappedFieldProps & SelectFieldProps> = ({
  input: { onBlur: _onBlur, ...input },
  meta: { touched, error },
  displayError,
  helperText,
  ...rest
}) => {
  const errorMessage = (touched && error) || displayError

  return (
    <Select
      controlled={false}
      error={!!errorMessage}
      helperText={errorMessage || helperText}
      {...input}
      {...rest}
    />
  )
}

export default SelectField
