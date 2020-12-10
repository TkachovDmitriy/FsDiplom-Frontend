import React, { FC } from 'react'
import { RouteChildrenProps } from 'react-router'
import {
  reduxForm,
  InjectedFormProps,
  Form,
  Field,
  SubmissionError
} from 'redux-form'
import { compose } from 'redux'
import {
  FormattedMessage,
  useIntl,
  injectIntl,
  WrappedComponentProps
} from 'react-intl'
import { Grid, Box, Container, Button } from '@material-ui/core'

import Text from '~/components/shared/Text'
import { TextField } from '~/components/fields'

import { sendResetLink, sendDealerResetLink } from '~/state/modules/user'
import { createLocalizedPath } from '~/utils/localizedPath'
import { asyncValidate } from '~/utils/asyncValidate'
import ForgotPasswordSchema from '~/schemas/forgot-password/email'
import { STORAGE } from '~/constants'
import { ForgotPasswordInput } from '~/interfaces/inputs'
import { RoleProps, hasRole } from '~/constants/roles'
import { SEO } from '~/components/shared'

import smg from '~/i18n/messages/pages'

const scope = 'pages.forgot-password'

const ForgotPassword: FC<InjectedFormProps<
  ForgotPasswordInput,
  RouteChildrenProps & RoleProps
>> = ({ handleSubmit }) => {
  const { formatMessage } = useIntl()

  return (
    <>
      <SEO title={formatMessage(smg['title.forgot-password'])} />
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
                      defaultMessage="Forgot password?"
                    />
                  </Text>
                  <Text variant="h5" color="textSecondary">
                    <FormattedMessage
                      id={`${scope}.subtitle`}
                      defaultMessage="Enter your email and we will send you the reset password link"
                    />
                  </Text>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Field
                  id="email"
                  name="email"
                  label={
                    <FormattedMessage
                      id={`${scope}.label.email`}
                      defaultMessage="Email"
                    />
                  }
                  placeholder={formatMessage({
                    id: `${scope}.label.email`,
                    defaultMessage: 'Email'
                  })}
                  component={TextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  type="submit"
                >
                  <FormattedMessage
                    id={`${scope}.button.send`}
                    defaultMessage="Send the reset password link"
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
  ForgotPasswordInput,
  RouteChildrenProps & RoleProps & WrappedComponentProps
>({
  form: 'Forgot_Password_Form',
  shouldAsyncValidate: () => true,
  asyncValidate: asyncValidate(ForgotPasswordSchema),
  onSubmit: async (values, _dispatch, { role }) => {
    const { isUser, isDealer } = hasRole(role)

    try {
      if (isUser) {
        await sendResetLink(values)
      }

      if (isDealer) {
        await sendDealerResetLink(values)
      }

      return values
    } catch (error) {
      const err = error?.errors || error
      if (err?.includes('There is no dealer with this email')) {
        throw new SubmissionError({ email: true as any })
      } else throw new SubmissionError(err)
    }
  },
  onSubmitSuccess: ({ email }, _dispatch, { history, intl: { locale } }) => {
    localStorage.setItem(STORAGE.userEmail, email)

    history.push(createLocalizedPath('/forgot-password/verify', locale))
  }
})

export default compose<React.FC>(injectIntl, withForm)(ForgotPassword)
