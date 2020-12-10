import React from 'react'
import { Field } from 'redux-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { Grid } from '@material-ui/core'

import PasswordField from '~/components/fields/PasswordField'

import messages from './PasswordFragment.messages'

const PasswordFragment: React.FC<{
  confirm?: boolean
  row?: boolean
  newPassword?: boolean
}> = ({ confirm, row, newPassword }) => {
  const { formatMessage } = useIntl()

  return (
    <Grid container spacing={2}>
      <Grid item xs={row ? 6 : 12}>
        <Field
          name="password"
          label={
            <FormattedMessage
              {...messages[`label.password${newPassword ? '.new' : ''}`]}
            />
          }
          placeholder={formatMessage({
            ...messages[`label.password${newPassword ? '.new' : ''}`]
          })}
          id="password"
          autoComplete="current-password"
          component={PasswordField}
        />
      </Grid>

      {confirm && (
        <Grid item xs={row ? 6 : 12}>
          <Field
            name="password_confirmation"
            label={
              <FormattedMessage
                {...messages[
                  `label.password_confirmation${newPassword ? '.new' : ''}`
                ]}
              />
            }
            placeholder={formatMessage({
              ...messages[
                `label.password_confirmation${newPassword ? '.new' : ''}`
              ]
            })}
            id="password_confirmation"
            autoComplete="current-password"
            component={PasswordField}
            hideHelper
          />
        </Grid>
      )}
    </Grid>
  )
}

export default PasswordFragment
