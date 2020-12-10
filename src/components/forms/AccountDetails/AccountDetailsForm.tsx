import React, { FC } from 'react'
import { compose, Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import {
  Field,
  reduxForm,
  SubmissionError,
  InjectedFormProps,
  Form
} from 'redux-form'
import { Grid } from '@material-ui/core'
import {
  FormattedMessage,
  useIntl,
  injectIntl,
  WrappedComponentProps
} from 'react-intl'
import { RouteComponentProps, withRouter } from 'react-router'
import { Box } from '@material-ui/core'

import { asyncValidate } from '~/utils/asyncValidate'
import { TextField, PhoneField, GeosuggestField } from '~/components/fields'
import { AccountDetailsInput } from '~/interfaces/inputs'
import AccountDetailsSchema from '~/schemas/account-details'
import { updateAccountDetails } from '~/state/modules/user'
import Frame from '~/components/frame'

import { AppState } from '~/interfaces/redux'

import mg from './AccountDetails.messages'
import fmg from '~/i18n/messages/fields'
import RightSideBtn from '~/components/RightSideBtn'
import { toastr } from 'react-redux-toastr'

const connector = connect((state: AppState) => {
  return {
    initialValues: state.user
  }
}, null)

type PropsFromRedux = ConnectedProps<typeof connector>

const AccountDetails: FC<InjectedFormProps<PropsFromRedux>> = ({
  handleSubmit
}): JSX.Element => {
  const { formatMessage } = useIntl()

  return (
    <Frame>
      <Box
        component={Form}
        onSubmit={handleSubmit}
        data-cy="account-detail-form"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Field
              id="full_name"
              label={<FormattedMessage {...fmg['full-name']} />}
              placeholder={formatMessage({ ...fmg['full-name'] })}
              name="full_name"
              component={TextField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              id="phone_number"
              label={formatMessage({ ...fmg['phone'] })}
              placeholder={formatMessage({ ...fmg['phone'] })}
              name="phone_number"
              component={PhoneField}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field
              id="address"
              label={<FormattedMessage {...fmg['location']} />}
              placeholder={formatMessage({ ...fmg['locationPlaceholder'] })}
              name="address"
              component={GeosuggestField}
            />
          </Grid>

          <Grid item xs={12}>
            <RightSideBtn type="submit">
              <FormattedMessage {...mg['saveChanges']} />
            </RightSideBtn>
          </Grid>
        </Grid>
      </Box>
    </Frame>
  )
}

const withForm = reduxForm<
  AccountDetailsInput,
  RouteComponentProps & WrappedComponentProps
>({
  form: 'AccountDetails_Form',
  shouldAsyncValidate: () => true,
  enableReinitialize: true,
  asyncValidate: asyncValidate(AccountDetailsSchema),
  onSubmit: async (values, dispatch: Dispatch, { intl: { formatMessage } }) => {
    try {
      await dispatch<any>(updateAccountDetails(values))

      toastr.success(
        formatMessage(mg['toastr.title']),
        formatMessage(mg['toastr.message'])
      )
    } catch (error) {
      throw new SubmissionError(error?.errors || error)
    }
  }
})

export default compose<React.FC>(
  withRouter,
  injectIntl,
  connector,
  withForm
)(AccountDetails)
