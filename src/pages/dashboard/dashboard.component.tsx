import React, { FC, useState, useEffect, useCallback } from 'react'
import {
  Grid,
  Container,
  useMediaQuery,
  useTheme,
  Box
} from '@material-ui/core'
import { FormattedMessage, useIntl } from 'react-intl'
import { RouteComponentProps, useHistory } from 'react-router'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'

import { Text, SEO } from '~/components/shared'
import BreadCrumbs from '~/components/breadcrumbs'
import links from '~/i18n/messages/links'
import { createLocalizedPath } from '~/utils/localizedPath'

import DashboardListing from './DashboardListing'
import DashboardTestDrives from './DashboardTestDrives'
import DashboardCreateCar from './DashboardCreateCar'
import DashboardProfile from './DashboardProfile'
import DashboardEditCar from './DashboardEditCar'

import messages from './dashboard.messages'
import useStyle from './dashboard.style'

import smg from '~/i18n/messages/pages'

const tabIDs = ['listing', 'new-article', 'profile'] as const

type TabsUnion = typeof tabIDs[number]

const TAB_COMPONENTS: Record<TabsUnion & { edit }, FC> = {
  listing: DashboardListing,
  'new-article': DashboardCreateCar,
  profile: DashboardProfile,
  edit: DashboardEditCar
} as const

type RouterMatch = {
  tab: TabsUnion
  carEditId: string
}

const breadcrumbs = [
  { langLabel: links.homePage, route: '/' },
  { langLabel: links.dashboard, route: '/dashboard' }
]

const Dashboard: FC<RouteComponentProps<RouterMatch>> = ({
  match: { params }
}): JSX.Element => {
  const { formatMessage, locale } = useIntl()
  const theme = useTheme()
  const history = useHistory()
  const [tab, setTab] = useState<string>()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyle()

  useEffect(() => {
    if (params.tab) {
      setTab(params.tab)
    } else if (params.carEditId) {
      setTab('edit')
    }
  }, [params.tab])

  const handleAlignment = useCallback(
    (_event, newTab) => {
      if (newTab && newTab !== tab) {
        history.push(createLocalizedPath(`/dashboard/${newTab}`, locale), {
          newTab
        })
      }
    },
    [tab]
  )
  return (
    <>
      <SEO title={formatMessage(smg['title.dashboard'])} />
      <Box mb="90px">
        <Container maxWidth="xl" disableGutters>
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Text variant="h2" mb={2} mt={4}>
                <FormattedMessage {...messages.title} />
              </Text>
            </Grid>
            <Grid item xs={12}>
              <ToggleButtonGroup
                size="large"
                className={classes.toggleButtonGroup}
                value={tab}
                exclusive
                onChange={handleAlignment}
                orientation={'horizontal'}
              >
                {tabIDs.map((tabId) => (
                  <ToggleButton
                    key={tabId}
                    classes={{
                      root: classes.toggleButtonRoot,
                      selected: classes.toggleButtonSelected
                    }}
                    size="large"
                    value={tabId}
                    tabIndex={tabId}
                  >
                    <FormattedMessage {...messages[tabId]} />
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
              {TAB_COMPONENTS[tab] && React.createElement(TAB_COMPONENTS[tab])}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Dashboard
