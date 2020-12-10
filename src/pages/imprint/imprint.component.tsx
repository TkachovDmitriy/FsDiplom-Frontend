import React, { FC } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Box, Grid } from '@material-ui/core'

import BreadCrumbs from '~/components/breadcrumbs'
import Banner from '~/components/layouts/Banner'
import { Text, SEO } from '~/components/shared'
import Frame from '~/components/frame'
import BlockHeader from '~/components/BlockHeader'

import baner from '~/assets/images/about-us/banner.png'

import useStyle from './imprint.style'
import smg from '~/i18n/messages/pages'
import mg from './imprint.messages'

const breadCrumbs = [
  {
    langLabel: mg['homepage'],
    route: '/'
  },
  {
    langLabel: mg['imprint'],
    route: '/imprint'
  }
]
const Imprint: FC = (): JSX.Element => {
  const classes = useStyle()
  const { formatMessage } = useIntl()

  return (
    <>
      <SEO title={formatMessage(smg['title.imprint'])} />

      <Box mb={4}>
        <Box className={classes.banner}>
          <Banner title="AboutUs" imgSrc={baner}>
            <BreadCrumbs breadcrumbs={breadCrumbs} />
            <Text variant="h1" align="center">
              <FormattedMessage
                {...mg['title']}
                values={{
                  // eslint-disable-next-line react/display-name
                  span: (chunks: React.ReactNode): JSX.Element => (
                    <span>{chunks}</span>
                  )
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
      </Box>
    </>
  )
}

export default Imprint
