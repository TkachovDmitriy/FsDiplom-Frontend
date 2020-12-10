import React, { FC, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Grid, Box, useMediaQuery, useTheme } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { RouteComponentProps, useHistory } from 'react-router'
// import {
//   StickyContainer,
//   Sticky
// } from '~/pages/article/node_modules/react-sticky'

import BreadCrumbs from '~/components/breadcrumbs'
import { Text, SEO } from '~/components/shared'
import DriveRules from '~/components/DriveRules'
import DealerInformaition from '~/components/DealerInformaition'
import SlickSlider from '~/components/SlickSlider/SlickSlider'
import OrderModalButton from '~/components/OrderModalButton'
import GalleryModalButton from '~/components/GalleryModalButton'
import OrderForm from '~/components/forms/OrderForm'

import { createLocalizedPath } from '~/utils/localizedPath'
import links from '~/i18n/messages/links'

import OfferTechInfo from './OfferInfo'
import OfferDescription from './OfferDescription'
import useStyle from './offer.style'
import { Offer } from '~/model/Offer'

import useListing from '~/hooks/useListing'

type RouterMatch = {
  carId: string
}

const OfferPage: FC<RouteComponentProps<RouterMatch>> = ({
  match: { params }
}) => {
  const theme = useTheme()
  const history = useHistory()
  const { locale } = useIntl()
  const classes = useStyle()

  const isMobileView = useMediaQuery(theme.breakpoints.down('md'))
  const { listing, loading } = useListing(params.carId, () =>
    history.replace(createLocalizedPath('/404', locale))
  )

  const { dealer, ...data } = (listing || {}) as Offer

  const breadCrumbs = [
    { langLabel: links.homePage, route: '/' },
    { langLabel: links.allCars, route: '/all-cars' },
    {
      langLabel: data.brand ? `${data?.brand}, ${data?.model}` : '',
      route: `/all-cars/${params.carId}`
    }
  ]

  const photos: any[] = useMemo(
    () => data?.photos?.map(({ url }) => url) || [],
    [data?.photos]
  )

  const generalRating = useMemo(() => {
    return (
      // @ts-ignore
      dealer?.reviews?.data.reduce((acc, curVal) => {
        acc += +curVal?.attributes?.mark

        return acc
        // @ts-ignore
      }, 0) / +dealer?.reviews?.data.length
    )
  }, [dealer?.reviews])

  return (
    <>
      <SEO title={data.brand && `${data?.brand}, ${data?.model}`} />

      <Box mb={2}>
        <Box className={classes.slider}>
          <SlickSlider
            photos={photos}
            loading={loading}
            className={classes.slider}
          />
          <Box position="relative" className={classes.modalBox}>
            <GalleryModalButton photos={photos} />
          </Box>
        </Box>
        <BreadCrumbs breadcrumbs={breadCrumbs} />
        <Text variant="h2" mt={{ xs: 3, md: 6 }} className={classes.offerName}>
          {loading ? (
            <Skeleton height={44} width={200} />
          ) : (
            `${data?.brand}, ${data?.model}`
          )}
        </Text>
        <Grid container md={12} spacing={3}>
          <Grid item lg={9}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <OfferTechInfo loading={loading} {...data} />
              </Grid>

              <Grid item xs={12}>
                <OfferDescription
                  loading={loading}
                  special_equipment={data?.special_equipment}
                  equipment={data?.equipment}
                />
              </Grid>
              <Grid item xs={12}>
                <DriveRules loading={loading} rules={dealer?.rules} />
              </Grid>
              <Grid item xs={12}>
                <DealerInformaition
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
                />
              </Grid>
            </Grid>
          </Grid>
          {/* {isMobileView ? (
            <OrderModalButton listingId={params.carId} />
          ) : (
            <Grid item md={3} style={{ marginTop: 57 }}>
              <StickyContainer style={{ height: '100%' }}>
                <Sticky topOffset={-20}>
                  {({ style }) => (
                    <Box style={style} marginTop="20px">
                      <OrderForm listingId={params.carId} />
                    </Box>
                  )}
                </Sticky>
              </StickyContainer>
            </Grid>
          )} */}
        </Grid>
      </Box>
    </>
  )
}

export default OfferPage
