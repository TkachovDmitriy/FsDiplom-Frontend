import React, { FC } from 'react'
import {
  FormControl as MuiFormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  makeStyles,
  createStyles,
  Theme,
  Box,
  BoxProps
} from '@material-ui/core'
import palette from '~/theme/palette'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      formControl: {
        paddingTop: (props: { label: boolean }): number =>
          props.label ? 24 : 0
      }
    }),
  {
    name: 'FormControl'
  }
)

interface Props extends FormControlProps {
  label?: string
  helperText?: string
  labelColor?: string
}

const FormControl: FC<Props & BoxProps> = ({
  label,
  labelColor,
  helperText,
  error,
  children,
  ...rest
}): JSX.Element => {
  const classes = useStyle({ label: !!label })

  return (
    <MuiFormControl
      component={Box}
      className={classes.formControl}
      variant="outlined"
      {...rest}
    >
      {label && (
        <InputLabel
          error={error}
          style={{ color: (labelColor || palette.primary) as string }}
          focused={false}
        >
          {label}
        </InputLabel>
      )}
      {children}
      {!!helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </MuiFormControl>
  )
}

export default FormControl
