import React, { FC, useCallback, useMemo } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FormattedMessage, useIntl } from 'react-intl'
import { Box, Container, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import { NavLink, LanguageSelect } from '~/components/shared'

import { logout } from '~/state/modules/user'
import { isLogged, isRole } from '~/state/modules/user/user.selectors'
import { createLocalizedPath } from '~/utils/localizedPath'
import links from '~/i18n/messages/links'

import logo from '~/assets/images/logo.png'

import { useDesktopStyles } from './Header.style'

import mg from './Header.messages'

const navsGuest = [
  {
    to: '/',
    exact: true,
    children: 'Головна'
  },
  {
    to: '/governing-bodies',
    children: 'Керівні органи'
  },
  {
    to: '/membership-procedure',
    children: 'Процедура набуття членства'
  },
  {
    to: '/regulations',
    children: 'Статут'
  },
  {
    to: '/news',
    children: 'Новини'
  }
]

const Header: FC = (): JSX.Element => {
  const dispatch = useDispatch()
  const classes = useDesktopStyles()
  const intl = useIntl()
  const logged = useSelector(isLogged)
  const roles = useSelector(isRole)
  const history = useHistory()

  const onLogout = useCallback(() => {
    dispatch(logout())
  }, [])

  const navs = useMemo(() => {
    return navsGuest
  }, [logged, roles])

  return (
    <header className={classes.header}>
      <Container maxWidth="xl">
        <Box display="flex">
          <Box flexGrow={2}>
            <Link to={createLocalizedPath('/', intl.locale)}>
              <img className={classes.logo} src={logo} alt="TestMee" />
            </Link>
          </Box>
          <Box
            flexGrow={4}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <nav className={classes.navbar}>
              {navs.map((props) => (
                <NavLink
                  exact={props.exact}
                  activeClassName="active"
                  key={props.to}
                  color="textPrimary"
                  {...props}
                />
              ))}
            </nav>
            <Box
              className={classes.btnWrapper}
              display="flex"
              justifyContent="flex-end"
            >
              {logged ? (
                <Button
                  style={{ width: 128 }}
                  variant="outlined"
                  color="secondary"
                  onClick={onLogout}
                >
                  <FormattedMessage {...mg['logout']} />
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to={createLocalizedPath('/sign-in', intl.locale)}
                >
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </header>
  )
}

export default Header
