import React, { FC } from 'react'
import { Rating } from '@material-ui/lab'
import { WrappedFieldProps } from 'redux-form'
import { TextFieldProps } from 'material-ui'
import { FormHelperText } from '@material-ui/core'

const RatingField: FC<WrappedFieldProps & TextFieldProps> = ({
  input: { onChange, ...input },
  meta: { touched, error }
  // onChange
}) => {
  const errorMessage = touched && error
  return (
    <>
      <Rating
        {...input}
        emptyLabelText={errorMessage}
        onChange={(event, newValue) => {
          onChange(newValue)
        }}
      />
      {errorMessage && (
        <FormHelperText error style={{ textAlign: 'center' }}>
          {errorMessage}
        </FormHelperText>
      )}
    </>
  )
}
export default RatingField
