// @ts-nocheck
import React, { FC, useMemo, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { WrappedFieldProps } from 'redux-form'
import { Grid, FormControlProps } from '@material-ui/core'

import { Select } from '~/components/shared'
import FormControl from '../shared/FormControl'

import fields from '~/i18n/messages/fields'
import daysOfWeek from '~/i18n/messages/daysOfWeek'

interface Props extends FormControlProps {
  displayError?: boolean
  helperText?: string
  label?: string
}

const DaysOfWeekRangeField: FC<WrappedFieldProps & Props> = ({
  input: { onChange, onBlur, name, value },
  meta: { touched, error },
  displayError,
  helperText,
  label,
  ...rest
}) => {
  const errorMessage = touched && error
  const { formatMessage } = useIntl()

  const options = useMemo(
    () => [
      { label: formatMessage(daysOfWeek.sunday), value: 'sunday' },
      { label: formatMessage(daysOfWeek.monday), value: 'monday' },
      { label: formatMessage(daysOfWeek.tuesday), value: 'tuesday' },
      { label: formatMessage(daysOfWeek.wednesday), value: 'wednesday' },
      { label: formatMessage(daysOfWeek.thursday), value: 'thursday' },
      { label: formatMessage(daysOfWeek.friday), value: 'friday' },
      { label: formatMessage(daysOfWeek.saturday), value: 'saturday' }
    ],
    []
  )

  const handleChange = useCallback(
    ({ value: v, key }) => {
      onChange({ ...value, [key]: v })
    },
    [onChange, value]
  )

  const handleBlur = useCallback(
    ({ value: v, key }) => {
      onBlur({ ...value, [key]: v })
    },
    [onChange, value]
  )

  return (
    <FormControl
      fullWidth
      label={label}
      error={!!displayError}
      helperText={displayError || helperText}
      {...rest}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Select
            fullWidth
            name={`${name}-from`}
            value={value.from}
            controlled={false}
            error={!!errorMessage?.from}
            helperText={errorMessage?.from}
            options={options}
            placeholder={formatMessage(fields.from)}
            onChange={(v): void => handleChange({ value: v, key: 'from' })}
            onBlur={(v): void => handleBlur({ value: v, key: 'from' })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            fullWidth
            name={`${name}-to`}
            value={value.to}
            controlled={false}
            error={!!errorMessage?.to}
            helperText={errorMessage?.to}
            options={options}
            placeholder={formatMessage(fields.to)}
            onChange={(v): void => handleChange({ value: v, key: 'to' })}
            onBlur={(v): void => handleBlur({ value: v, key: 'to' })}
          />
        </Grid>
      </Grid>
    </FormControl>
  )
}

export default DaysOfWeekRangeField
