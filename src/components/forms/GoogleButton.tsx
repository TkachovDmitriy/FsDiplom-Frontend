// @ts-nocheck
import React, { FC, useCallback, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { makeStyles, createStyles } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useIntl } from 'react-intl'

import ExtendedButton from '../shared/ExtendedButton'

import { signinWithGoogle } from '~/state/modules/user/user.actions'
import { createLocalizedPath } from '~/utils/localizedPath'

import GoogleIcon from '~/assets/icons/google.svg'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      background: '#5383EC !important',
      color: '#fff !important'
    },
    disabled: {
      filter: 'grayscale(50%)',
      cursor: 'not-allowed !important',
      pointerEvents: 'auto !important'
    }
  })
)

const GoogleButton: FC<RouteComponentProps> = ({ children, history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { locale } = useIntl()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSuccess = useCallback(async (resp: any) => {
    try {
      setLoading(true)

      await dispatch<any>(signinWithGoogle(resp))
      history.push(createLocalizedPath('/', locale))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={handleSuccess}
      onFailure={console.error}
      scope="profile email https://www.googleapis.com/auth/user.phonenumbers.read"
      cookiePolicy="single_host_origin"
      render={(renderProps): JSX.Element => (
        <ExtendedButton
          variant="contained"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          loading={loading}
          classes={{ root: classes.root, disabled: classes.disabled }}
        >
          <img
            src={GoogleIcon}
            style={{ height: 24, width: 'auto', marginRight: 10 }}
          />
          {children}
        </ExtendedButton>
      )}
    />
  )
}

export default withRouter(GoogleButton)
