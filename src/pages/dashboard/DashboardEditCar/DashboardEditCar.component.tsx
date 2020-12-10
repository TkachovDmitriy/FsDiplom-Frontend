import React, { FC, useEffect, useState } from 'react'
import { compose } from 'redux'
import { connect, useSelector } from 'react-redux'
import { defineMessages, useIntl } from 'react-intl'
import { useAsync } from 'react-async'
import { RouteComponentProps, withRouter, useParams } from 'react-router'
import { SubmissionError, reduxForm } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import { Deserializer } from 'jsonapi-serializer'

import CarForm from '~/components/forms/CarForm'

import { AppState } from '~/interfaces/redux'

import TestMee from '~/services/TestMee'
import { asyncValidate } from '~/utils/asyncValidate'
import DealerCreateCarSchema from '~/schemas/create-car'
import Loader from '~/components/shared/Loader'

import smg from '~/i18n/messages/pages'
import { SEO } from '~/components/shared'
import { Car } from '~/model/Car'
import { createLocalizedPath } from '~/utils/localizedPath'

const scope = 'pages.dashboard.edit-car'

const messages = defineMessages({
  'toastr.title': {
    id: `${scope}.toastr.title`,
    defaultMessage: 'Success'
  },
  'toastr.message': {
    id: `${scope}.toastr.message`,
    defaultMessage: 'Сar was updated'
  }
})

const DashboardEditCar: FC = (): JSX.Element => {
  const { formatMessage } = useIntl()
  const { carEditId: id } = useParams()
  const [initialValues, setInitialValues] = useState<{}>({})

  const data = useSelector((state: AppState) =>
    state.cars.data.find((car) => car.id === id)
  )

  const { isLoading, run } = useAsync({
    deferFn: () => TestMee.getDealerCar(id),
    onResolve: async (res) => {
      const payload = await new Deserializer({
        keyForAttribute: 'snake_case'
      }).deserialize(res)

      setInitialValues(payload)
    }
  })

  useEffect(() => {
    if (!data) run()
  }, [data])

  if (isLoading) return <Loader />

  return (
    <>
      <SEO title={formatMessage(smg['title.dashboard.edit-car'])} />

      <Form edit {...{ initialValues: data || initialValues }} />
    </>
  )
}

type Props = {
  dealer_id: number
}

type RouterMatch = {
  carEditId?: any
}

const makeMapStateToProps = (state: AppState): Props => {
  return {
    dealer_id: state.user.dealer_id
  }
}

const withConnect = connect(makeMapStateToProps)

const withForm = reduxForm<
  Car,
  RouteComponentProps<RouterMatch> & WrappedComponentProps & Props
>({
  form: 'DealerEditCar_Form',
  shouldAsyncValidate: () => true,
  destroyOnUnmount: true,
  enableReinitialize: true,
  asyncValidate: asyncValidate(DealerCreateCarSchema),
  onSubmit: async (
    values,
    _dispatch,
    {
      reset,
      intl: { formatMessage, locale },
      dealer_id,
      history,
      match: { params }
    }
  ) => {
    try {
      await TestMee.dealerUpdateCar(params.carEditId, {
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
      reset()
    } catch (error) {
      throw new SubmissionError(error?.errors || error)
    }
  }
})

const Form = compose<React.FC<{ edit: boolean }>>(
  withRouter,
  injectIntl,
  withConnect,
  withForm
)(CarForm)

export default DashboardEditCar
