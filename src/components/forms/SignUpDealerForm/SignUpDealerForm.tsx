import React, { FC, useState } from 'react'
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

import {
  TextField,
  PhoneField,
  GeosuggestField,
  DaysOfWeekRangeField,
  TimeRangeField
} from '~/components/fields'
import PasswordFragment from '../PasswordFragment/PasswordFragment'
import PrivacyField from '~/components/fields/PrivacyField'

import { SignUpInput } from '~/interfaces/inputs'
import { signupDealer } from '~/state/modules/user'
import { asyncValidate } from '~/utils/asyncValidate'
import { createLocalizedPath } from '~/utils/localizedPath'
import SignupDealerSchema from '~/schemas/sign-up/dealer'

import messages from './SignUpDealerForm.messages'

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
            id="name"
            name="name"
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
          <Field
            id="phone_number"
            name="phone_number"
            label={formatMessage({ ...messages['label.phone'] })}
            component={PhoneField}
          />
        </Grid>

        <Grid item xs={12}>
          <Field
            id="address"
            label={<FormattedMessage {...messages['label.address']} />}
            placeholder={formatMessage({ ...messages['label.address'] })}
            name="address"
            component={GeosuggestField}
          />
        </Grid>
        {/* <Grid sm={12} spacing={direction="column"> */}
        <Grid item xs={12}>
          <Field
            id="date"
            label={<FormattedMessage {...messages['label.date']} />}
            placeholder={formatMessage({ ...messages['label.date'] })}
            name="date"
            component={DaysOfWeekRangeField}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            id="time"
            label={<FormattedMessage {...messages['label.time']} />}
            placeholder={formatMessage({ ...messages['label.time'] })}
            name="time"
            component={TimeRangeField}
          />
        </Grid>
        {/* </Grid> */}

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
  form: 'Signup_Dealer_Form',
  shouldAsyncValidate: () => true,
  asyncValidate: asyncValidate(SignupDealerSchema),
  onSubmit: async (values, dispatch: Dispatch) => {
    try {
      await dispatch<any>(
        signupDealer({
          ...values,
          // @ts-ignore
          opening_hours: { date: values.date, time: values.time }
        })
      )
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
