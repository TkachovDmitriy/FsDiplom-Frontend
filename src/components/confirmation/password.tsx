import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'

import Confirmation from './Confirmation'

import { Redirect, RouteComponentProps } from 'react-router-dom'
import { STORAGE } from '~/constants'
import { RolesUnion } from '~/constants/roles'
import { createLocalizedPath } from '~/utils/localizedPath'

type RouterMatch = {
  token: string
  role: RolesUnion
}

const ConfirmationPassword: React.FC<RouteComponentProps<RouterMatch>> = ({
  match: { params }
}) => {
  const [redirect, setRedirect] = useState<string>('')
  const { locale } = useIntl()

  useEffect(() => {
    if (params?.token) {
      localStorage.setItem(STORAGE.resetToken, params.token)

      setRedirect(`/reset-password/${params?.role}`)
    } else setRedirect('/')
  }, [params.token])

  if (!redirect) return <Confirmation />

  return <Redirect to={createLocalizedPath(redirect, locale)} />
}

export default ConfirmationPassword
