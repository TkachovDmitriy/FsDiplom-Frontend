import React, { FC, useState } from 'react'
import {
  Select as MuiSelect,
  SelectProps,
  MenuItem,
  FormControlProps
} from '@material-ui/core'
import cx from 'classnames'

import FormControl from '../FormControl'

import { ReactComponent as Arrow } from '~/assets/icons/arrow.svg'

import useStyle from './SelectStyle'

interface Props extends SelectProps {
  options: any[]
  label?: string
  helperText?: string
  controlled?: boolean
  labelColor?: string
  onChange?: (value: any) => void
  onBlur?: (value: any) => void
  transparent?: boolean
}

interface EventValue {
  value: { value: string; label: string } | string
}

const Select: FC<Props & FormControlProps> = ({
  label,
  size,
  options,
  helperText,
  error,
  value,
  controlled = true,
  fullWidth,
  labelColor,
  placeholder,
  transparent,
  onChange,
  onBlur,
  ...rest
}): JSX.Element => {
  const classes = useStyle({ label: !!label })
  const [selectValue, setSelectValue] = useState<string>(
    options[0].value || options[0]
  )

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    const value = event.target.value as EventValue
    const currentValue = (value.value || value) as string
    if (controlled) {
      setSelectValue(currentValue)
    } else if (!!onChange) {
      onChange(currentValue)
    }
  }

  const handleBlur = (event: React.ChangeEvent<{ value: unknown }>): void => {
    const value = event.target.value as EventValue
    const currentValue = (value.value || value) as string
    if (!!onBlur) onBlur(currentValue)
  }

  return (
    <FormControl
      width={200}
      fullWidth={fullWidth}
      label={label}
      helperText={helperText}
      error={error}
      size={size}
      labelColor={labelColor}
      placeholder={placeholder}
    >
      <MuiSelect
        displayEmpty
        IconComponent={Arrow}
        className={cx(classes.selectEmpty, {
          [classes.transparent]: transparent
        })}
        fullWidth={fullWidth}
        value={controlled ? selectValue : value || ''}
        error={error}
        onChange={handleChange}
        onBlur={handleBlur}
        {...rest}
      >
        {placeholder && (
          <MenuItem disabled value="">
            {placeholder}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value || option} value={option.value || option}>
            {option.label || option}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}

export default Select
