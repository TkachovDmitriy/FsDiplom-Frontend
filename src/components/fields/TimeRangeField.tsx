// @ts-nocheck
import React, { FC, useRef } from 'react'
import moment from 'moment'
import { useIntl } from 'react-intl'
import { WrappedFieldProps } from 'redux-form'
import { TimePicker, TimePickerProps } from '@material-ui/pickers'
import { TextField, Grid } from '@material-ui/core'

import { FormControl } from '../shared'
import fields from '~/i18n/messages/fields'

interface TimeRangeProps extends TimePickerProps {
  displayError?: boolean
  required?: boolean
  helperText?: string
  disabled?: boolean
}

const TimeRangeField: FC<WrappedFieldProps & TimeRangeProps> = ({
  input: { value, name, onBlur, onChange },
  meta: { touched, error },
  displayError,
  helperText,
  required,
  disabled,
  label,
  ...rest
}) => {
  const errorMessage = (touched && error) || displayError
  const { formatMessage } = useIntl()
  const fromRef = useRef(null)
  const toRef = useRef(null)

  const handleChange = ({ date, key }): void => {
    onChange({
      ...value,
      [key]: moment(date).isValid() ? moment(date).format('HH:mm') : ''
    })
  }

  return (
    <FormControl
      fullWidth
      label={label}
      error={!!displayError}
      helperText={displayError || helperText}
      required={required}
      {...rest}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TimePicker
            disabled={disabled}
            value={moment(value.from, 'HH:mm')}
            onChange={(date): void => handleChange({ date, key: 'from' })}
            // PopperProps={{ placement: 'bottom', anchorEl: fromRef.current }}
            renderInput={(props): JSX.Element => (
              <TextField
                {...props}
                style={{ padding: 0 }}
                fullWidth
                name={`${name}-from`}
                variant="outlined"
                ref={(ref): void => (fromRef.current = ref)}
                placeholder={formatMessage(fields.from)}
                error={!!errorMessage?.from}
                helperText={errorMessage?.from}
                InputProps={{
                  ...props.InputProps,
                  notched: false
                }}
                InputLabelProps={{
                  ...props.InputLabelProps,
                  shrink: true
                }}
                onBlur={(): void => onBlur(value)}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TimePicker
            disabled={disabled}
            value={moment(value.to, 'HH:mm')}
            onChange={(date): void => handleChange({ date, key: 'to' })}
            // PopperProps={{ placement: 'bottom', anchorEl: toRef.current }}
            renderInput={(props): JSX.Element => (
              <TextField
                {...props}
                style={{ padding: 0 }}
                fullWidth
                name={`${name}-to`}
                variant="outlined"
                ref={(ref): void => (toRef.current = ref)}
                placeholder={formatMessage(fields.to)}
                error={!!errorMessage?.to}
                helperText={errorMessage?.to}
                InputProps={{
                  ...props.InputProps,
                  notched: false
                }}
                InputLabelProps={{
                  ...props.InputLabelProps,
                  shrink: true
                }}
                onBlur={(): void => onBlur(value)}
              />
            )}
          />
        </Grid>
      </Grid>
    </FormControl>
  )
}

export default TimeRangeField
