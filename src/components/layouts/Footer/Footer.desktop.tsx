import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage, useIntl } from 'react-intl'
import { Box, Container } from '@material-ui/core'

import { Text, NavLink, Flexbox } from '~/components/shared'

import links from '~/i18n/messages/links'

import logo from '~/assets/images/logo.svg'
import { ReactComponent as Youtube } from '~/assets/icons/youtube.svg'
import { ReactComponent as Instagram } from '~/assets/icons/instagram.svg'
import { ReactComponent as Facebook } from '~/assets/icons/facebook.svg'

import { createLocalizedPath } from '~/utils/localizedPath'

import { useStyle } from './Footer.style'

const navs = [
  {
    to: '/about-us',
    children: <FormattedMessage {...links.aboutUs} />
  },
  {
    to: '/imprint',
    children: <FormattedMessage {...links.imprint} />
  },
  {
    to: '/privacy-policy',
    children: <FormattedMessage {...links.privacyPolicy} />
  },
  {
    to: '/terms-of-service',
    children: <FormattedMessage {...links.termsOfService} />
  },
  {
    to: '/faq',
    children: <FormattedMessage {...links.faq} />
  },
  {
    to: '/contact-info',
    children: <FormattedMessage {...links.contactInfo} />
  }
]

const Footer: FC = () => {
  const intl = useIntl()
  const classes = useStyle()

  return (
    <footer className={classes.root}>
      <Container maxWidth="xl">
        <Flexbox justifyContent="center">
          <Text className={classes.copyright} fontSize={18}>
            The website of the Ukrainian Scientific IT Society | Веб-сайт
            Українського науково-освітнього IT товариства | 2020
          </Text>
        </Flexbox>
      </Container>
    </footer>
  )
}

export default Footer
