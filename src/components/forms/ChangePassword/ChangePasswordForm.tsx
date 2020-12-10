import React, { FC } from 'react'
import { compose, Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import { reduxForm, SubmissionError, InjectedFormProps, Form } from 'redux-form'
import { Grid, useMediaQuery } from '@material-ui/core'
import { FormattedMessage, WrappedComponentProps, injectIntl } from 'react-intl'
import { RouteComponentProps, withRouter } from 'react-router'
import { Box } from '@material-ui/core'

import { asyncValidate } from '~/utils/asyncValidate'
import { AccountDetailsInput } from '~/interfaces/inputs'
import {
  updateAccountDetails,
  isRole,
  updateDealerAccountDetails
} from '~/state/modules/user'
import Frame from '~/components/frame'

import ChangePasswordSchema from '~/schemas/change-password'
import { AppState } from '~/interfaces/redux'

import mg from './ChangePasswordForm.messages'
import PasswordFragment from '../PasswordFragment'

import tmg from '~/i18n/messages/toastrMessages'
import { toastr } from 'react-redux-toastr'
import RightSideBtn from '~/components/RightSideBtn'
import { hasRole } from '~/constants/roles'
import theme from '~/theme'

const connector = connect((state: AppState) => {
  return {
    initialValues: state.user
  }
}, null)

type PropsFromRedux = ConnectedProps<typeof connector>

const AccountDetails: FC<InjectedFormProps<PropsFromRedux>> = ({
  handleSubmit
}): JSX.Element => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Frame>
      <Box
        component={Form}
        onSubmit={handleSubmit}
        data-cy="account-detail-form"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PasswordFragment confirm row={!isMobile} newPassword />
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
  form: 'ChangePassword_Form',
  shouldAsyncValidate: () => true,
  enableReinitialize: true,
  asyncValidate: asyncValidate(ChangePasswordSchema),
  onSubmit: async (
    values,
    dispatch: Dispatch,
    { intl: { formatMessage }, reset }
  ) => {
    try {
      const role = hasRole(values.role)

      await dispatch<any>(
        role.isDealer
          ? updateDealerAccountDetails(values)
          : updateAccountDetails(values)
      )

      toastr.success(
        formatMessage(tmg['title.success']),
        formatMessage(tmg['message.password-changed'])
      )
      reset()
    } catch (error) {
      throw new SubmissionError(error?.errors || error)
    }
  }
})

export default compose<React.FC>(
  injectIntl,
  withRouter,
  connector,
  withForm
)(AccountDetails)
