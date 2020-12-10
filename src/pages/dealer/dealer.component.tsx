import React, { FC, useState, useEffect, useMemo, useCallback } from 'react'
import { Grid, Box, useMediaQuery, useTheme } from '@material-ui/core'
import { useIntl } from 'react-intl'
import { RouteComponentProps, useHistory } from 'react-router'
import { useAsync } from 'react-async'
import { Deserializer } from 'jsonapi-serializer'
import { useModal } from 'react-modal-hook'
// import {
//   StickyContainer,
//   Sticky
// } from '~/pages/article/node_modules/react-sticky'

import { Text, SEO } from '~/components/shared'
import BreadCrumbs from '~/components/breadcrumbs'

import DriveRules from '~/components/DriveRules'
import DealerInfo from '~/components/DealerInformaition'
import ReviewModal from '~/components/dialogs/ReviewModal'
import DealerRating from './DealerRating'

import { createLocalizedPath } from '~/utils/localizedPath'
import { numRound } from '~/utils/functions'

import { Dealer } from '~/model/Dealer'
import TestMee from '~/services/TestMee'

import LastAddedCars from './LastAddedCars'
import Reviews from './Reviews'

import useStyle from './dealer.style'
import smg from '~/i18n/messages/pages'
import mg from './dealer.messages'

type RouterMatch = {
  dealerId: string
}

const DealerPage: FC<RouteComponentProps<RouterMatch>> = ({
  match: { params }
}): JSX.Element => {
  const classes = useStyle()
  const intl = useIntl()
  const history = useHistory()
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'))

  const [{ listings, reviews, ...data }, setData] = useState<Dealer>(
    {} as Dealer
  )

  const breadCrumbs = [
    {
      langLabel: mg['homepage'],
      route: '/'
    },
    {
      langLabel: mg['dealer'],
      route: `/dealer/${params.dealerId}`
    }
  ]

  const { isLoading, run } = useAsync({
    deferFn: () => TestMee.getDealerInfo(params.dealerId),
    onResolve: async (res) => {
      const payload = await new Deserializer({
        keyForAttribute: 'snake_case'
      }).deserialize(res)

      setData(payload)
    },
    onReject: () => {
      history.replace(createLocalizedPath('/404', intl.locale))
    }
  })

  useEffect(() => {
    run()
  }, [])

  const addReview = useCallback(
    (review: any) => {
      setData({ ...data, listings, reviews: [...reviews, review] })
    },
    [data, listings, reviews]
  )

  const [showModal, hideModal] = useModal(
    ({ in: open, onExited }) => (
      <ReviewModal
        dealer_id={params.dealerId}
        open={open}
        onExited={onExited}
        onClose={hideModal}
        addReview={addReview}
      />
    ),
    [addReview]
  )

  const generalRating = useMemo(() => {
    return (
      reviews?.reduce((acc, curVal) => {
        acc += +curVal?.mark

        return acc
      }, 0) / reviews?.length
    )
  }, [reviews])

  return (
    <>
      <SEO
        title={`${data.name || ''} ${intl.formatMessage(smg['title.dealer'])}`}
      />

      <Box mb={{ xs: 3, md: 10 }}>
        <BreadCrumbs breadcrumbs={breadCrumbs} />
        <Text variant="h2" mt={6} className={classes.dealerName}>
          {data.name}
        </Text>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DealerInfo loading={isLoading} {...data} />
              </Grid>

              <Grid item xs={12}>
                <LastAddedCars
                  loading={isLoading}
                  dealer_id={params.dealerId}
                  cars={listings}
                />
              </Grid>

              <Grid item xs={12}>
                <DriveRules rules={data?.rules} />
              </Grid>

              <Grid id="reviews" item xs={12}>
                <Reviews
                  loading={isLoading}
                  dealerId={params.dealerId}
                  reviews={reviews}
                  showModal={showModal}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default DealerPage
