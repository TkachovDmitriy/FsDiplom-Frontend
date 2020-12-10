import React, { FC } from 'react'
import { compose, Dispatch } from 'redux'
import {
  InjectedFormProps,
  Form,
  Field,
  reduxForm,
  SubmissionError
} from 'redux-form'
import { RouteComponentProps, withRouter } from 'react-router'
import {
  FormattedMessage,
  useIntl,
  injectIntl,
  WrappedComponentProps
} from 'react-intl'
import { Grid, Button, Box } from '@material-ui/core'

import { PrivacyField, TextField } from '~/components/fields'
import PasswordFragment from '../PasswordFragment/PasswordFragment'

import { SignUpInput } from '~/interfaces/inputs'
import { signup } from '~/state/modules/user'
import { asyncValidate } from '~/utils/asyncValidate'
import { createLocalizedPath } from '~/utils/localizedPath'
import SignupSchema from '~/schemas/sign-up'
import messages from './SignUpForm.messages'

const SignUpForm: FC<InjectedFormProps> = ({ handleSubmit }) => {
  const { formatMessage } = useIntl()

  return (
    <Box
      component={Form}
      display="flex"
      flexDirection="column"
      onSubmit={handleSubmit}
      data-cy="sign-up-form"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            id="full_name"
            name="full_name"
            label={<FormattedMessage {...messages['label.name']} />}
            placeholder={formatMessage({ ...messages['label.name'] })}
            component={TextField}
          />
        </Grid>

        <Grid item xs={12}>
          <Field
            id="email"
            label={<FormattedMessage {...messages['label.email']} />}
            placeholder={formatMessage({ ...messages['label.email'] })}
            name="email"
            autoComplete="email"
            component={TextField}
          />
        </Grid>

        <Grid item xs={12}>
          <PasswordFragment confirm />
        </Grid>
        <Grid item xs={12}>
          <Field
            id="privacy"
            label={<FormattedMessage {...messages['label.time']} />}
            description={''}
            name="privacy"
            component={PrivacyField}
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
            <FormattedMessage {...messages['button.sign-up']} />
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

const withForm = reduxForm<
  SignUpInput,
  RouteComponentProps & WrappedComponentProps
>({
  form: 'Signup_Form',
  shouldAsyncValidate: () => true,
  asyncValidate: asyncValidate(SignupSchema),
  onSubmit: async (values, dispatch: Dispatch) => {
    try {
      await dispatch<any>(signup(values))
    } catch (error) {
      const err = error?.errors || error

      if (err.includes('Email has already been taken')) {
        throw new SubmissionError({ email: true as any })
      } else throw new SubmissionError(err)
    }
  },
  onSubmitSuccess: (_values, _dispatch, { history, intl: { locale } }) => {
    history.push(createLocalizedPath('/sign-up/verify', locale))
  }
})

export default compose<React.FC>(withRouter, injectIntl, withForm)(SignUpForm)
