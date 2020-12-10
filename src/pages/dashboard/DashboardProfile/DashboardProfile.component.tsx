import React, { FC } from 'react'
import { Box, Grid, useTheme, useMediaQuery } from '@material-ui/core'
import { withRouter, RouteComponentProps } from 'react-router'
import { compose } from 'redux'
import {
  reduxForm,
  SubmissionError,
  Form,
  InjectedFormProps,
  Field,
  FieldArray
} from 'redux-form'
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl'
import { connect } from 'react-redux'

import {
  TextField,
  GeosuggestField,
  PhoneField,
  TimeRangeField,
  DaysOfWeekRangeField
} from '~/components/fields'
import { asyncValidate } from '~/utils/asyncValidate'
import BlockHeader from '~/components/BlockHeader'
import Frame from '~/components/frame'

import DealerProfileSchema from '~/schemas/dealer-profile'
import { DealerProfileInput } from '~/interfaces/inputs'
import ChangePassword from '~/components/forms/ChangePassword'
import { updateDealerAccountDetails } from '~/state/modules/user'
import { RenderRules } from './DashboardProfile.rules'

import messages from './DashboardProfile.messages'
import fields from '~/i18n/messages/fields'
import { ExtendedButton } from '~/components/shared'
import { toastr } from 'react-redux-toastr'
import DeleteAccount from '~/components/deleteAcc'

const DashboardProfile: FC<
  WrappedComponentProps &
    InjectedFormProps<DealerProfileInput, RouteComponentProps>
> = ({ handleSubmit, submitting, intl: { formatMessage } }): JSX.Element => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Box
      component={Form}
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      data-cy="create-car-form"
    >
      <Box mb={4}>
        <BlockHeader translateMessageObj={'Main details'} />

        <Frame>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Field
                id="name"
                label={<FormattedMessage {...fields['company-name']} />}
                placeholder={formatMessage(fields['company-name'])}
                name="name"
                component={TextField}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                id="phone_number"
                label={formatMessage(fields['phone'])}
                placeholder={formatMessage(fields['phone'])}
                name="phone_number"
                component={PhoneField}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                id="location"
                label={<FormattedMessage {...fields['location']} />}
                placeholder={formatMessage(fields['location'])}
                name="address"
                component={GeosuggestField}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                id="email"
                label={<FormattedMessage {...fields['email']} />}
                placeholder={formatMessage(fields['email'])}
                name="email"
                component={TextField}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                id="date"
                label={<FormattedMessage {...fields['date']} />}
                placeholder={formatMessage(fields['date'])}
                name="date"
                component={DaysOfWeekRangeField}
                helperText={formatMessage(messages['hint.date'])}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                id="time"
                label={<FormattedMessage {...fields['time']} />}
                placeholder={formatMessage(fields['time'])}
                name="time"
                component={TimeRangeField}
                helperText={formatMessage(messages['hint.time'])}
                required
              />
            </Grid>
          </Grid>
        </Frame>
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <ExtendedButton
          onClick={handleSubmit}
          style={{ maxWidth: isMobile ? '100%' : 200, fontSize: 18 }}
          fullWidth
          variant="contained"
          color="secondary"
          size="large"
          loading={submitting}
        >
          <FormattedMessage {...messages['button.submit']} />
        </ExtendedButton>
      </Box>
      <BlockHeader translateMessageObj={'Changed password'} />
      <ChangePassword />

      <BlockHeader translateMessageObj={'Delete your account'} />
      <DeleteAccount />
    </Box>
  )
}

const makeMapStateToProps = (state) => {
  const {
    opening_hours,
    name,
    email,
    phone_number,
    address,
    rules
  } = state.user
  const { allowed, not_allowed } = rules || {}
  const { date = {}, time = {} } = opening_hours || {}

  return {
    initialValues: {
      date: {
        from: '',
        to: '',
        ...date
      },
      time: {
        from: '',
        to: '',
        ...time
      },
      allowed: allowed?.length ? allowed : [''],
      not_allowed: not_allowed?.length ? not_allowed : [''],
      name,
      email,
      phone_number,
      address
    }
  }
}

const withConnect = connect(makeMapStateToProps)

const withForm = reduxForm<
  DealerProfileInput,
  RouteComponentProps & WrappedComponentProps
>({
  form: 'DealerProfile_Form',
  destroyOnUnmount: true,
  shouldAsyncValidate: () => true,
  enableReinitialize: true,
  asyncValidate: asyncValidate(DealerProfileSchema),
  asyncBlurFields: ['allowed[]', 'not_allowed[]'],
  onSubmit: async (
    { date, time, allowed, not_allowed, ...values },
    dispatch,
    { intl: { formatMessage } }
  ) => {
    try {
      await dispatch<any>(
        updateDealerAccountDetails({
          ...values,
          opening_hours: { date, time },
          rules: {
            allowed: allowed.filter(Boolean),
            not_allowed: not_allowed.filter(Boolean)
          }
        })
      )
      toastr.success(
        formatMessage(messages['toastr.title']),
        formatMessage(messages['toastr.message'])
      )
    } catch (error) {
      throw new SubmissionError(error?.errors || error)
    }
  }
})

export default compose<React.FC>(
  withRouter,
  injectIntl,
  withConnect,
  withForm
)(DashboardProfile)
