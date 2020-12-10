import React, { FC, useState, useCallback } from 'react'
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
  IntlConfig,
  WrappedComponentProps
} from 'react-intl'
import { Grid, Button, Box } from '@material-ui/core'
import ReCAPTCHA from 'react-google-recaptcha'
import jwtDecode from 'jwt-decode'

import { Text } from '~/components/shared'
import { TextField } from '~/components/fields'
import Link from '~/components/shared/Link'
import PasswordFragment from '../PasswordFragment/PasswordFragment'

import { loginDealer } from '~/state/modules/user'
import { asyncValidate } from '~/utils/asyncValidate'
import SignInSchema from '~/schemas/sign-in'
import messages from './SignInDealerForm.messages'
import { SignInInput } from '~/interfaces/inputs'
import { STORAGE } from '~/constants'
import { createLocalizedPath } from '~/utils/localizedPath'

const SignInForm: FC<InjectedFormProps> = ({ handleSubmit }) => {
  const { formatMessage } = useIntl()
  const [isVerify, setVerify] = useState<boolean>(false)

  const verifyCallback = useCallback(() => {
    setVerify(true)
  }, [])

  return (
    <Box
      component={Form}
      display="flex"
      flexDirection="column"
      onSubmit={handleSubmit}
      data-cy="sign-in-form"
    >
      <Grid container spacing={2}>
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
          <PasswordFragment />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Link
              to="/forgot-password/dealer"
              underline="always"
              color="textPrimary"
              style={{ marginBottom: 0 }}
            >
              <FormattedMessage {...messages['link.forgot-password']} />
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Text color="textSecondary" fontSize={14}>
            <FormattedMessage
              id="field.recaptcha.hint"
              defaultMessage="Please check the box below to proceed."
            />
          </Text>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={verifyCallback}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            fullWidth
            type="submit"
            disabled={!isVerify}
          >
            <FormattedMessage {...messages['button.sign-in']} />
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

const withForm = reduxForm<
  SignInInput,
  RouteComponentProps & WrappedComponentProps
>({
  form: 'SignIn_Dealer_Form',
  shouldAsyncValidate: () => true,
  asyncValidate: asyncValidate(SignInSchema),
  onSubmit: async (values, dispatch: Dispatch) => {
    try {
      await dispatch<any>(loginDealer(values))
    } catch (error) {
      throw new SubmissionError({ email: true as any, password: true as any })
    }
  },
  onSubmitSuccess: (_values, _dispatch, { history, intl: { locale } }) => {
    const token = localStorage.getItem(STORAGE.authToken)
    if (token) {
      const { confirmed, email } = jwtDecode(token)

      if (confirmed) {
        history.push(createLocalizedPath('/', locale))
      } else {
        localStorage.setItem(STORAGE.userEmail, email)
        history.push(createLocalizedPath('/sign-up/verify', locale))
      }
    }
  }
})

export default compose<React.FC>(withRouter, injectIntl, withForm)(SignInForm)
