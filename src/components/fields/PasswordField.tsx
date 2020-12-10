import React, { FC, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { WrappedFieldProps } from 'redux-form'
import {
  InputAdornment,
  IconButton,
  TextField,
  FormHelperText
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

type Props = {
  required?: boolean
  hideHelper?: boolean
}

const PasswordField: FC<WrappedFieldProps & Props> = ({
  input,
  meta: { touched, error },
  required,
  hideHelper = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <TextField
        {...input}
        {...rest}
        variant="outlined"
        fullWidth
        type={showPassword ? 'text' : 'password'}
        error={!!(touched && error)}
        helperText={touched && error}
        InputLabelProps={{ required, shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label="toggle password visibility"
                onClick={(): void => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
          notched: false
        }}
      />
      {!hideHelper && (
        <FormHelperText variant="filled">
          <FormattedMessage
            id="field.password.hint"
            defaultMessage="Password must be between 8 and 50 characters."
          />
        </FormHelperText>
      )}
    </>
  )
}

export default PasswordField
