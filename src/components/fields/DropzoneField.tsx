import React from 'react'
import { WrappedFieldProps } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import { useDropzone } from 'react-dropzone'
import { StyleRules, Theme, Grid, Box, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import CloseIcon from '@material-ui/icons/Close'

import { ReactComponent as AttachFileIcon } from '~/assets/icons/cloud.svg'
import { FormControl } from '../shared'

const useStyles = makeStyles(
  (theme: Theme): StyleRules => ({
    dropzone: {
      padding: theme.spacing(2),
      borderRadius: '5px',
      border: `1px dashed ${theme.palette.primary.main}`,
      cursor: 'pointer'
    },
    placeholder: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.primary.main
    },
    fileWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      margin: theme.spacing(1),
      wordBreak: 'break-all'
    },
    fileIconName: {
      display: 'flex',
      alignItems: 'center',

      '& svg': {
        marginRight: theme.spacing(1)
      }
    },
    deleteIcon: {
      position: 'absolute',
      right: 0,
      top: 0,
      background: theme.palette.common.white,
      borderRadius: '50%',
      boxShadow: theme.shadows[0],
      border: `1px solid ${theme.palette.primary.main}`,
      transform: 'translate(30%, -30%)'
    },
    imageWrapper: {
      borderRadius: '5px',
      border: `1px solid ${theme.palette.primary.main}`
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      objectPosition: 'center center'
    }
  })
)

type Props = {
  placeholder: string
  uploadFiles: (
    acceptedFiles: any
  ) => Array<{ signed_id: string; origin: object }>
  label: string
  helperText: string
  required?: boolean
}

const DropzoneField: React.FC<WrappedFieldProps & Props> = ({
  input: { value = [], onChange },
  meta: { touched, error },
  placeholder,
  label,
  helperText,
  required,
  uploadFiles
}) => {
  const errorMessage = touched && error

  const cx = useStyles()

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const resp = await uploadFiles(acceptedFiles)

      const values = [...value]

      resp.forEach(({ origin, signed_id }) => {
        values.push({
          signed_id,
          url: (URL as any).createObjectURL(origin)
        })
      })

      onChange(values)
    }
  })

  return (
    <FormControl
      error={!!errorMessage}
      fullWidth
      label={label}
      helperText={errorMessage || helperText}
      required={required}
    >
      <section>
        <div
          {...getRootProps({
            className: cx.dropzone
          })}
        >
          <input
            {...getInputProps({
              accept: 'image/jpeg, image/jpg, image/png'
            })}
          />
          <p className={cx.placeholder}>
            <AttachFileIcon />
            {placeholder || (
              <FormattedMessage
                id="components.fields.DropzoneField.placeholder"
                defaultMessage="Click to select a file"
              />
            )}
          </p>
        </div>

        {!!value.length && (
          <Box display="flex" my={2}>
            <Grid container spacing={2}>
              {value.map(({ url }, index) => (
                <Grid item xs={6} md={2} key={index}>
                  <Box
                    position="relative"
                    width="100%"
                    height={160}
                    className={cx.imageWrapper}
                  >
                    <img className={cx.image} src={url} alt="image" />
                    <Box className={cx.deleteIcon}>
                      <IconButton
                        onClick={(): void =>
                          onChange(value.filter((_v, i) => i !== index))
                        }
                        size="small"
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </section>
    </FormControl>
  )
}

export default DropzoneField
