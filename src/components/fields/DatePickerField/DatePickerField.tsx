import React, { FC } from 'react'
import { WrappedFieldProps } from 'redux-form'
import { StaticDatePicker, StaticDatePickerProps } from '@material-ui/pickers'
import { TextField } from '@material-ui/core'
import moment, { Moment } from 'moment'

import useStyle from './DatePicker.style'

const maxDate = moment().add(0.5, 'year')

const DatePickerField: FC<WrappedFieldProps & StaticDatePickerProps> = ({
  input: { onChange, ...input },
  disabled,
  shouldDisableDate,
  ...rest
}) => {
  const classes = useStyle(shouldDisableDate)
  const handleChange = (date: Moment): void => {
    onChange(date.format())
  }

  return (
    <>
      <StaticDatePicker
        views={['date']}
        disablePast
        className={classes.disableBtn}
        disableFuture={disabled}
        displayStaticWrapperAs="desktop"
        shouldDisableDate={shouldDisableDate}
        maxDate={maxDate}
        renderInput={(props) => <TextField {...props} />}
        onChange={handleChange}
        {...input}
        {...rest}
      />
    </>
  )
}
export default DatePickerField
