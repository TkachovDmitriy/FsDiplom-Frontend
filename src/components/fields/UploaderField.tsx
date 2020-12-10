import React, { useState } from 'react'
import { WrappedFieldProps } from 'redux-form'
import { useDropzone } from 'react-dropzone'
import {
  StyleRules,
  Theme,
  ButtonBase,
  FormHelperText,
  CircularProgress
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { toastr } from 'react-redux-toastr'

import { Text } from '~/components/shared'
import { ReactComponent as PhotoIcon } from '~/assets/images/upload.svg'
import TestMee from '~/services/TestMee'

const useStyles = makeStyles(
  (theme: Theme): StyleRules => ({
    logo: {
      width: 190,
      height: 135,
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.primary.main,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },

    control: {
      color: theme.palette.text.primary,

      '& > button:first-child': {
        borderRight: '1px solid #D4D8E0'
      }
    },

    button: {
      padding: '0 15px',
      color: theme.palette.primary.main
    }
  })
)

type Props = {
  disabled?: boolean
  helperText?: string
}

const UploaderField: React.FC<WrappedFieldProps & Props> = ({
  input: { value, onChange, ...input },
  meta: { touched, error },
  disabled,
  helperText
}) => {
  const cx = useStyles()
  const [loading, setLoading] = useState(false)

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: async (acceptedFiles) => {
      try {
        if (acceptedFiles[0].size > 1024 * 1024 * 3) {
          throw new Error('Logo size should be not more than 3Mb')
        }

        setLoading(true)

        const { origin, signed_id: file } = await TestMee.directUploadOne(
          acceptedFiles[0]
        )

        onChange({ url: (URL as any).createObjectURL(origin), file })
      } catch (err) {
        toastr.error('Error', err?.message)
      } finally {
        setLoading(false)
      }
    }
  })

  const errorMessage = touched && error

  return (
    <section>
      {(!disabled || value) && (
        <>
          <ButtonBase
            onClick={getRootProps().onClick}
            className={cx.logo}
            style={{
              backgroundImage: `url(${value?.url})`
            }}
            disabled={disabled}
          >
            {!loading && !value && <PhotoIcon />}
            {loading && <CircularProgress disableShrink />}
          </ButtonBase>

          <input {...input} {...getInputProps()} />
        </>
      )}

      {!disabled && value && (
        <div className={cx.control}>
          <ButtonBase
            className={cx.button}
            onClick={getRootProps().onClick}
            disabled={disabled}
          >
            <Text variant="body1">Add image</Text>
          </ButtonBase>

          <ButtonBase
            className={cx.button}
            onClick={() => onChange(null)}
            disabled={disabled}
          >
            <Text variant="body1">Remove</Text>
          </ButtonBase>
        </div>
      )}

      {!!errorMessage ||
        (!!helperText && (
          <FormHelperText error={!!errorMessage}>
            {errorMessage || helperText}
          </FormHelperText>
        ))}
    </section>
  )
}

export default UploaderField
