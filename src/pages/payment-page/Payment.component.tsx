import React, { FC, useEffect, useMemo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Box, Grid, Tooltip, Button } from '@material-ui/core'

import { RouteComponentProps, useHistory } from 'react-router'
import moment from 'moment'

import { SEO, Text, Flexbox, ListItem } from '~/components/shared'
import BreadCrumbs from '~/components/breadcrumbs'
import Frame from '~/components/frame'

import links from '~/i18n/messages/links'

import useListing from '~/hooks/useListing'
import smg from '~/i18n/messages/pages'
import { formatCurrency } from '~/utils/functions'
import { createLocalizedPath } from '~/utils/localizedPath'

import useStyle from './Payment.style'
import mg from './Payment.messages'
import PaymentButton from './PaymentButton'

type RouterMatch = {
  carId: string
}

const Payment: FC<RouteComponentProps<RouterMatch>> = ({
  match: { params }
}) => {
  const { formatMessage } = useIntl()
  const classes = useStyle()
  const history = useHistory()
  const { locale } = useIntl()
  const { listing: data, loading } = useListing(params.carId, () =>
    history.replace(createLocalizedPath('/404', locale))
  )

  const { date, time } = useMemo(() => history.location.state || {}, [history])

  useEffect(() => {
    if (!date || !time)
      history.push(createLocalizedPath(`/all-cars/${params.carId}`, locale))
  }, [])

  const breadcrumbs = [
    { langLabel: links.homePage, route: '/' },
    { langLabel: links.allCars, route: '/all-cars' },
    {
      langLabel: data.brand ? `${data.brand}, ${data.model}` : links.allCars,
      route: `/all-cars/${params.carId}`
    },
    {
      langLabel: links.payment,
      route: `/all-cars/${params.carId}/payment`,
      locale
    }
  ]

  return (
    <>
      <SEO title={formatMessage(smg['title.payment'])} />

      <Box mb="10px">
        <BreadCrumbs breadcrumbs={breadcrumbs} />
        <Text variant="h2" mb={2} mt={4}>
          <FormattedMessage {...mg.title} />
        </Text>
      </Box>
      <Frame p={0}>
        <Text className={classes.title}>
          <FormattedMessage {...mg.orderSummary} />
        </Text>
        <Flexbox
          justifyContent="center"
          flexGrow={8}
          className={classes.carDetails}
        >
          <ListItem translateObj={mg['date']}>
            {`${moment(date).format('DD MMMM YYYY')}, ${time}`}
          </ListItem>

          <ListItem
            link
            to={`/all-cars/${params.carId}`}
            translateObj={mg['car']}
          >
            {`${data.brand}, ${data.model}`}
          </ListItem>

          <ListItem translateObj={mg['price']}>
            {`${formatCurrency(+data.test_price)} ${formatMessage(mg.vat)}`}
          </ListItem>

          <ListItem
            link
            to={`/dealer/${data.dealer_id}`}
            translateObj={mg['dealer']}
          >
            {data.dealer?.name}
          </ListItem>
        </Flexbox>
      </Frame>
      <Grid container justify="center">
        <Grid sm={12} md={4} item>
          <Box my={4} display="flex" justifyContent="center">
            <Frame mobileTight={true} width={{ xs: 280, md: 800 }}>
              {!loading &&
              !!Object.keys(data).length &&
              +data.test_price === 0 ? (
                <Tooltip
                  className={classes.tooltip}
                  title={formatMessage(mg.titleTooltip)}
                  classes={{
                    tooltip: classes.tooltip
                  }}
                  placement="top"
                >
                  <div>
                    <PaymentButton
                      locale={locale}
                      time={time}
                      date={date}
                      carId={params.carId}
                      test_price={+data.test_price}
                    />
                  </div>
                </Tooltip>
              ) : (
                <PaymentButton
                  locale={locale}
                  time={time}
                  date={date}
                  carId={params.carId}
                  test_price={+data.test_price}
                />
              )}
            </Frame>
          </Box>
        </Grid>
        <Grid sm={12} item>
          <Box mt={4}>
            <Button
              variant="contained"
              // @ts-ignore
              onClick={() => history?.goBack()}
            >
              <FormattedMessage {...mg.back} />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Payment
