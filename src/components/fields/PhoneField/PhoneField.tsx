import React, { FC, memo, useCallback } from 'react'
import { WrappedFieldProps } from 'redux-form'
import PhoneInput from 'react-phone-input-2'
import { FormHelperText } from '@material-ui/core'
import cx from 'classnames'

import { useStyles } from './PhoneField.styles'

type Props = {
  errorMessage: boolean
  required?: boolean
  label: any
}

const PhoneField: FC<WrappedFieldProps & Props> = ({
  input: { onChange, onBlur, value, ...input },
  meta: { touched, error },
  required,
  label,
  errorMessage,
  ...props
}) => {
  const errorMessageField = (touched && error) || errorMessage

  const classes = useStyles({
    label: label,
    asterisk: required ? ' *' : ''
  })

  const handleChange = useCallback((v) => {
    onChange(`+${v.replace(/[(,)]|\s/g, '')}`)
  }, [])

  return (
    <>
      <PhoneInput
        country="de"
        enableSearch
        onChange={handleChange}
        value={value}
        containerClass={cx(
          'react-tel-input',
          {
            [classes.error]: errorMessageField
          },
          classes.label,
          classes.container
        )}
        inputClass={classes.input}
        inputProps={{
          onBlur: (e: React.ChangeEvent<HTMLInputElement>): void => {
            onBlur(value)
            handleChange((e.target as HTMLInputElement).value.replace('+', ''))
          }
        }}
        {...props}
        {...input}
      />
      {errorMessageField && (
        <FormHelperText error className={classes.errorLabel}>
          {errorMessageField}
        </FormHelperText>
      )}
    </>
  )
}

export default memo(PhoneField)
