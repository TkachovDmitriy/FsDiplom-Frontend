import React, { FC, useCallback } from 'react'
import { Field, WrappedFieldArrayProps } from 'redux-form'
import { Box, InputAdornment, IconButton, Button } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import AddAlarmIcon from '@material-ui/icons/AddAlarm'

import { Textarea } from '~/components/fields'
import { ReactComponent as CheckSVG } from '~/assets/icons/check.svg'
import { ReactComponent as CrossSVG } from '~/assets/icons/cross.svg'
import { FormattedMessage } from 'react-intl'

type Props = {
  label?: string
  allowed?: boolean
}

export const RenderRules: FC<WrappedFieldArrayProps & Props> = ({
  fields,
  label,
  allowed,
  meta
}) => {
  const handleRemove = useCallback((index) => {
    fields.remove(index)
  }, [])

  return (
    <>
      <Box>
        {fields.map((name, index) => {
          return (
            <Box mb={1} display="flex" width="100%" key={index}>
              <Field
                id={name}
                name={name}
                component={Textarea}
                label={!index && label}
                placeholder={label}
                // error={error && submitFailed && index === 0 ? error : null}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {allowed ? <AddAlarmIcon /> : <CrossSVG />}
                    </InputAdornment>
                  ),
                  endAdornment: fields.length > 1 && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={(): void => handleRemove(index)}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                // onKeyPress={(e) => handlePressEnter(e, index)}
              />
            </Box>
          )
        })}
        <Box width="100%" display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={(): void => fields.push('')}
          >
            + Add next Time
          </Button>
        </Box>
      </Box>
    </>
  )
}
