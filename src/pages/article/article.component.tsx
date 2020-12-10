import React, { FC, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { Grid, Box, useMediaQuery, useTheme } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { RouteComponentProps, useHistory } from 'react-router'

import BreadCrumbs from '~/components/breadcrumbs'
import { Text, SEO } from '~/components/shared'
import DriveRules from '~/components/DriveRules'
import DealerInformaition from '~/components/DealerInformaition'

import { createLocalizedPath } from '~/utils/localizedPath'
import links from '~/i18n/messages/links'

import OfferTechInfo from './OfferInfo'
import OfferDescription from './OfferDescription'
import useStyle from './offer.style'

import useListing from '~/hooks/useListing'
import allNews from '../../data/mocks/allNews'
import Reviews from '../dealer/Reviews'
import reviews from '../../data/mocks/reviews'

type RouterMatch = {
  newsId: string
}

const OfferPage: FC<RouteComponentProps<RouterMatch>> = ({
  match: { params }
}) => {
  const theme = useTheme()
  const history = useHistory()
  const { locale } = useIntl()
  const classes = useStyle()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  const data = allNews.find((item) => +item.id === +params.newsId)

  const isMobileView = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <SEO title={data?.title && `${data?.title}`} />

      <Box mb={2}>
        <Grid container spacing={3}>
          <Grid item md={12} lg={9}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <OfferDescription
                  loading={loading}
                  title={data?.title}
                  special_equipment={data?.description}
                  description_info={data?.descriptionInfo}
                  description_link={data?.descriptionLink}
                  equipment={data?.askComments}
                />
              </Grid>
              <Grid item xs={12}>
                <DriveRules
                  loading={loading}
                  rules={data?.timeStampSteps}
                  title={data?.timeStampTitle}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <DealerInformaition
                  displayName
                  displayReviews
                  displayButtonDetails
                  name={dealer?.name}
                  loading={loading}
                  dealer_id={data.dealer_id as number}
                  stars={generalRating || 0}
                  // @ts-ignore
                  reviewsNumber={dealer?.reviews?.data.length || 0}
                  {...dealer}
                /> */}
                <Reviews reviews={reviews} loading={loading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default OfferPage
