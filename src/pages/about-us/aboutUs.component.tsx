import React, { FC } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Box, Grid, Button } from '@material-ui/core'

import { Text, SEO, Link } from '~/components/shared'
import BreadCrumbs from '~/components/breadcrumbs'
import Banner from '~/components/layouts/Banner'
import baner from '~/assets/images/about-us/banner.png'
import Frame from '~/components/frame'
import BlockHeader from '~/components/BlockHeader'

import useStyle from './aboutUs.style'

import mg from './aboutUs.messages'

import smg from '~/i18n/messages/pages'

const breadCrumbs = [
  {
    langLabel: mg['homepage'],
    route: '/'
  },
  {
    langLabel: mg['aboutUs'],
    route: '/about-us'
  }
]
const AboutUs: FC = () => {
  const classes = useStyle()
  const { formatMessage } = useIntl()

  return (
    <>
      <SEO title={formatMessage(smg['title.about-us'])} />
      <Box>
        <Box className={classes.banner}>
          <Banner title="AboutUs" imgSrc={baner}>
            <Box>
              <BreadCrumbs breadcrumbs={breadCrumbs} />
            </Box>
            <Text variant="h1" align="center">
              <FormattedMessage
                {...mg['title']}
                values={{
                  // eslint-disable-next-line react/display-name
                  span: (chunks: React.ReactNode) => <span>{chunks}</span>
                }}
              />
            </Text>
          </Banner>
        </Box>
        <BlockHeader translateMessageObj={mg.companyBg} />
        <Frame>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box className={classes.title}>
                <Text pb={1}>
                  <FormattedMessage {...mg['testMe']} />
                </Text>
                <Text className={classes.description} pb={1}>
                  Props
                </Text>
              </Box>
              <Box className={classes.title}>
                <Text pb={1}>
                  <FormattedMessage {...mg['aboutCars']} />
                </Text>
                <Text className={classes.description} pb={1}>
                  props
                </Text>
              </Box>
            </Grid>
          </Grid>
        </Frame>
        <BlockHeader translateMessageObj={mg.takeLook} />
        <Frame>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              Slider
            </Grid>
          </Grid>
        </Frame>
        <Box className={classes.center} m={4}>
          <a
            href="https://www.instagram.com/testmee.de"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="contained" color="secondary">
              <FormattedMessage {...mg['instagramBtn']} />
            </Button>
          </a>
        </Box>
      </Box>
    </>
  )
}

export default AboutUs
