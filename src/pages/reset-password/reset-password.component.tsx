import React, { FC } from 'react'
import { Dispatch, compose } from 'redux'
import { reduxForm, InjectedFormProps, Form, SubmissionError } from 'redux-form'
import { RouteChildrenProps, RouteComponentProps } from 'react-router'
import { toastr } from 'react-redux-toastr'
import {
  FormattedMessage,
  useIntl,
  injectIntl,
  WrappedComponentProps
} from 'react-intl'
import { Grid, Box, Container, Button } from '@material-ui/core'

import Text from '~/components/shared/Text'
import PasswordFragment from '~/components/forms/PasswordFragment'

import { resetPassword, resetDealerPassword } from '~/state/modules/user'
import { asyncValidate } from '~/utils/asyncValidate'
import ResetPasswordSchema from '~/schemas/forgot-password/reset-password'
import { createLocalizedPath } from '~/utils/localizedPath'
import { ResetPasswordInput } from '~/interfaces/inputs'
import { RolesUnion, hasRole } from '~/constants/roles'
import { SEO } from '~/components/shared'

import smg from '~/i18n/messages/pages'
import { STORAGE } from '~/constants'

const scope = 'pages.reset-password'

type RouterMatch = {
  role: RolesUnion
}

const ResetPassword: FC<InjectedFormProps<
  ResetPasswordInput,
  RouteChildrenProps & RouteComponentProps<RouterMatch>
>> = ({ handleSubmit }) => {
  const { formatMessage } = useIntl()

  return (
    <>
      <SEO title={formatMessage(smg['title.reset-password'])} />

      <Box my={8}>
        <Container maxWidth="sm" disableGutters>
          <Box component={Form} mt={4} mb={6} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  flexDirection="column"
                  textAlign="center"
                  mb={2}
                >
                  <Text variant="h2" mb={2}>
                    <FormattedMessage
                      id={`${scope}.title`}
                      defaultMessage="Reset password"
                    />
                  </Text>
                  <Text variant="h5" color="textSecondary">
                    <FormattedMessage
                      id={`${scope}.subtitle`}
                      defaultMessage="Create new password"
                    />
                  </Text>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <PasswordFragment />
              </Grid>
              <Grid item xs={12}>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  <FormattedMessage
                    id={`${scope}.button.reset`}
                    defaultMessage="Reset"
                  />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  )
}

const withForm = reduxForm<
  ResetPasswordInput,
  RouteChildrenProps & WrappedComponentProps & RouteComponentProps<RouterMatch>
>({
  form: 'Reset_Password_Form',
  shouldAsyncValidate: () => true,
  asyncValidate: asyncValidate(ResetPasswordSchema),
  onSubmit: async (values, dispatch: Dispatch, { match: { params } }) => {
    const { isUser, isDealer } = hasRole(params?.role)

    try {
      if (isUser) {
        await dispatch<any>(resetPassword(values))
      }

      if (isDealer) {
        await dispatch<any>(resetDealerPassword(values))
      }
    } catch (error) {
      throw new SubmissionError(error.errors)
    }
    return isUser
  },
  onSubmitSuccess: (_values, _dispatch, { history, intl: { locale } }) => {
    toastr.success('Success', 'Password was reseted successfully')
    const path = localStorage.getItem(STORAGE.redirect)
    if (_values && !!path) {
      history.push(path)
    } else history.push(createLocalizedPath('/', locale))
  }
})

export default compose<React.FC>(injectIntl, withForm)(ResetPassword)
