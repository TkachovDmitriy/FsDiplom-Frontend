import React, { FC, useCallback } from 'react'
import { WrappedFieldProps } from 'redux-form'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import cx from 'classnames'

import { useStyleDesktop } from './OrderForm.style'

type Props = {
  disabled?: boolean
  times: [string]
  date: string
  shouldDisableTime(time: string): boolean
  large?: boolean
  shouldDisableBookedTime(time: string): boolean
}

const OrderTimeField: FC<WrappedFieldProps & Props> = ({
  input: { onChange, value },
  meta: _meta,
  disabled,
  times,
  large,
  date,
  shouldDisableTime,
  shouldDisableBookedTime,
  ...rest
}) => {
  const classes = useStyleDesktop({ large })

  const handleChange = (_e, v: string): void => onChange(v)

  const handleDisableTime = useCallback(
    (time: string): boolean => {
      if (disabled) return disabled

      return shouldDisableTime ? shouldDisableTime(time) : false
    },
    [disabled, shouldDisableTime]
  )

  return (
    <ToggleButtonGroup
      className={classes.toogleBtn}
      size="small"
      exclusive
      {...rest}
      value={value}
      onChange={handleChange}
    >
      {times.map(
        (time, index): JSX.Element => (
          <ToggleButton
            disabled={handleDisableTime(time)}
            className={cx(classes.togBtn, {
              bookedTime: date ? shouldDisableBookedTime(time) : false
            })}
            value={time}
            key={index}
          >
            {time}
          </ToggleButton>
        )
      )}
    </ToggleButtonGroup>
  )
}

export default OrderTimeField
