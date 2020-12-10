import React, { FC, useState, useMemo, useCallback } from 'react'
import { useIntl, FormattedMessage } from 'react-intl'
import CloseIcon from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'
import { Box, SwipeableDrawer, Button, IconButton } from '@material-ui/core'
import { List } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { LanguageSelect, NavLink } from '~/components/shared'

import { isRole, isLogged, logout } from '~/state/modules/user'
import { createLocalizedPath } from '~/utils/localizedPath'
import logo from '~/assets/images/logo.png'
import links from '~/i18n/messages/links'
import { useMobileStyles } from './Header.style'

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

const HeaderMobile: FC = () => {
  const dispatch = useDispatch()
  const classes = useMobileStyles()
  const intl = useIntl()
  const logged = useSelector(isLogged)
  const roles = useSelector(isRole)
  const [drawer, setDrawer] = useState(false)

  const navs = useMemo(() => {
    return navsGuest
  }, [logged, roles])

  const onLogout = useCallback(() => {
    dispatch(logout())
  }, [])

  const toggleDrawer = (): void => {
    setDrawer(!drawer)
  }

  return (
    <header className={classes.header}>
      <Box display="flex" alignItems="center">
        <Box
          flexGrow={2}
          textAlign="center"
          position="relative"
          className={classes.logo}
        >
          <Link to={createLocalizedPath('/', intl.locale)}>
            <img src={logo} alt="TestMee" />
          </Link>
        </Box>
        <IconButton onClick={toggleDrawer} className={classes.closeBtn}>
          {!drawer ? <MenuIcon /> : <CloseIcon />}
        </IconButton>
      </Box>
      <SwipeableDrawer
        className={classes.root}
        anchor="right"
        open={drawer}
        onClose={(): void => setDrawer(false)}
        onOpen={(): void => setDrawer(true)}
      >
        <div
          className={classes.list}
          role="presentation"
          onKeyDown={toggleDrawer}
        >
          <List className={classes.listBox}>
            <Box className={classes.navbar}>
              {navs.map((props) => (
                // <>
                <NavLink
                  exact={props.exact}
                  activeClassName="active"
                  className={classes.navItem}
                  key={props.to}
                  color="textPrimary"
                  {...props}
                />
                // </>
              ))}
            </Box>
            <Box
              className={classes.btnWrapper}
              display="flex"
              justifyContent="flex-start"
              flexDirection="column"
            >
              {logged ? (
                <Button
                  style={{ width: 128 }}
                  variant="outlined"
                  color="secondary"
                  className={classes.logInBtn}
                  onClick={onLogout}
                >
                  <FormattedMessage {...mg['logout']} />
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="secondary"
                  component={Link}
                  to={createLocalizedPath('/sign-in', intl.locale)}
                >
                  Login as Admin
                </Button>
              )}
            </Box>
          </List>
        </div>
      </SwipeableDrawer>
    </header>
  )
}

export default HeaderMobile
