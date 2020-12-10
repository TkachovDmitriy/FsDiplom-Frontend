import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toastr } from 'react-redux-toastr'

import Confirmation from './Confirmation'

import {
  signupConfirmEmail,
  signupDealerConfirmEmail
} from '~/state/modules/user'
import { STORAGE } from '~/constants'
import { hasRole, RolesUnion } from '~/constants/roles'
import { createLocalizedPath } from '~/utils/localizedPath'

import smg from '~/i18n/messages/pages'
import mg from './confirmation.messages'

import { SEO } from '../shared'

type RouterMatch = {
  token: string
  role: RolesUnion
}

const ConfirmationEmail: React.FC<RouteComponentProps<RouterMatch>> = ({
  match: { params }
}) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const [redirect, setRedirect] = useState<string | {}>('')

  useEffect(() => {
    async function confirmUser(): Promise<void> {
      const { isUser, isDealer } = hasRole(params.role)

      try {
        if (isUser) {
          await dispatch<any>(signupConfirmEmail(params.token))
        }

        if (isDealer) {
          await dispatch<any>(signupDealerConfirmEmail(params.token))
        }

        toastr.success(
          intl.formatMessage(mg['toastr.title']),
          intl.formatMessage(mg['toastr.message'])
        )

        const path = localStorage.getItem(STORAGE.redirect)
        const payment = JSON.parse(localStorage.getItem(STORAGE.paymentData))

        if (isUser && !!path) {
          if (payment) {
            setRedirect({ to: path, state: payment })
          } else {
            setRedirect(path)
          }
        } else setRedirect('/')
      } catch (error) {
        toastr.warning(intl.formatMessage(mg['toastr.title']), error._message)
        setRedirect('/')
      } finally {
        localStorage.removeItem(STORAGE.userEmail)
        localStorage.removeItem(STORAGE.redirect)
        localStorage.removeItem(STORAGE.paymentData)
      }
    }

    confirmUser()
  }, [dispatch, params.token])

  if (!redirect)
    return (
      <>
        <SEO title={intl.formatMessage(smg['title.confirmation'])} />

        <Confirmation />
      </>
    )

  return <Redirect to={createLocalizedPath(redirect, intl.locale)} />
}

export default ConfirmationEmail
