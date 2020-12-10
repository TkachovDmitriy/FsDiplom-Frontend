import React, { FC } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { SubmissionError, reduxForm } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import { defineMessages } from 'react-intl'

import CarForm from '~/components/forms/CarForm'
import { AppState } from '~/interfaces/redux'
import { createLocalizedPath } from '~/utils/localizedPath'

import TestMee from '~/services/TestMee'
import { asyncValidate } from '~/utils/asyncValidate'
import DealerCreateCarSchema from '~/schemas/create-car'
import { Car } from '~/model/Car'

const scope = 'pages.dashboard.create-car'

const messages = defineMessages({
  'toastr.title': {
    id: `${scope}.toastr.title`,
    defaultMessage: 'Success'
  },
  'toastr.message': {
    id: `${scope}.toastr.message`,
    defaultMessage: 'Сar was created'
  }
})

const DashboardCreateCar: FC = (): JSX.Element => {
  return <Form />
}

type Props = {
  dealer_id: number
}

const makeMapStateToProps = (state: AppState): Props => {
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
    // @ts-ignore
    initialValues: {
      allowed: allowed?.length ? allowed : ['']
    },
    dealer_id: state.user.dealer_id
  }
}

const withConnect = connect(makeMapStateToProps)

const withForm = reduxForm<
  Car,
  RouteComponentProps & WrappedComponentProps & Props
>({
  form: 'DealerCreateCar_Form',
  shouldAsyncValidate: () => true,
  destroyOnUnmount: true,
  asyncValidate: asyncValidate(DealerCreateCarSchema),
  onSubmit: async (
    values,
    _dispatch,
    { intl: { formatMessage, locale }, dealer_id, history }
  ) => {
    try {
      await TestMee.dealerCreateCar({
        ...values,
        photos: values.photos.map(({ signed_id }) => signed_id),
        dealer_id
      })
      toastr.success(
        formatMessage(messages['toastr.title']),
        formatMessage(messages['toastr.message'])
      )
      window.scrollTo({ top: 0 })
      history.push(createLocalizedPath('/dashboard/listing', locale))
    } catch (error) {
      throw new SubmissionError(error?.errors || error)
    }
  }
})

const Form = compose<React.FC>(
  withRouter,
  injectIntl,
  withConnect,
  withForm
)(CarForm)

export default DashboardCreateCar
