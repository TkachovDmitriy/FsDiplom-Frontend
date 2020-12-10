import React, { FC } from 'react'
import { Box, Button, Grid } from '@material-ui/core'
import { FormattedMessage, useIntl, FormattedPlural } from 'react-intl'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { GoogleMap, Marker } from '@react-google-maps/api'

import { Text, Flexbox } from '~/components/shared'
import Frame from '~/components/frame'
import BlockHeader from '~/components/BlockHeader'
import { createLocalizedPath } from '~/utils/localizedPath'

import MarkerSvg from '~/assets/icons/marker.svg'

import useStyle from '~/pages/offer/offer.style'
import { Rating, Skeleton } from '@material-ui/lab'
import { useHistory } from 'react-router'
import { Dealer } from '~/model/Dealer'

import mg from '~/pages/offer/offer.measeges'
import daysOfWeek from '~/i18n/messages/daysOfWeek'
import { numRound } from '~/utils/functions'

interface DealerInformaitionProps extends Omit<Dealer, 'reviews'> {
  stars?: number
  dealer_id?: string | number
  loading?: boolean
  displayButtonDetails?: boolean
  displayName?: boolean
  displayReviews?: boolean
  reviewsNumber?: number
}

const DealerInformaition: FC<DealerInformaitionProps> = ({
  phone_number,
  email,
  opening_hours = {},
  address,
  stars,
  dealer_id,
  name,
  reviewsNumber,
  loading,
  displayButtonDetails,
  displayReviews,
  displayName
}): JSX.Element => {
  const classes = useStyle()
  const history = useHistory()
  const { formatMessage, locale } = useIntl()

  const { date, time } = opening_hours

  const phoneNumber = parsePhoneNumberFromString(phone_number || '')

  return (
    <>
      <Box>
        <Flexbox
          justifyContent="space-between"
          alignItems="baseline"
          className={classes.reviewTop}
          mb={2.5}
        >
          <BlockHeader
            translateMessageObj={mg['reviewTitle']}
            marginBottom={1.25}
          />
          {displayButtonDetails && (
            <Button
              size="large"
              variant="contained"
              color="secondary"
              disableElevation
              className={classes.reviewBtn}
              disabled={loading}
              onClick={(): void =>
                history.push(
                  createLocalizedPath(`/dealer/${dealer_id}`, locale)
                )
              }
            >
              <FormattedMessage {...mg['visitDealer']} />
            </Button>
          )}
        </Flexbox>

        <Frame>
          {displayName && (
            <Text variant="h4" mb={2}>
              {loading ? <Skeleton width="160px" /> : name}
            </Text>
          )}
          <Grid className={classes.dealerInfoGrid} container spacing={2}>
            <Grid item lg={4}>
              <Box pb={2}>
                <Text pb={1} variant="body1">
                  <FormattedMessage {...mg['location']} />
                </Text>
                {loading ? (
                  <Skeleton width="160px" />
                ) : (
                  <Text className={classes.infoText}>
                    {address?.label || 'N/A'}
                  </Text>
                )}
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box pb={2}>
                <Text variant="body1" pb={1}>
                  <FormattedMessage {...mg['openingHours']} />
                </Text>
                {loading ? (
                  <Skeleton width="160px" />
                ) : (
                  <Text className={classes.infoText}>
                    {date && time
                      ? `${formatMessage(daysOfWeek[date.from])} 
                          - ${formatMessage(daysOfWeek[date.to])}
                           ${opening_hours?.time?.from} 
                          - ${opening_hours?.time?.to}`
                      : 'N/A'}
                  </Text>
                )}
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box pb={2}>
                <Text variant="body1" pb={1}>
                  <FormattedMessage {...mg['contact']} />
                </Text>
                {loading ? (
                  <Skeleton width="160px" />
                ) : (
                  <>
                    <Text datatype="phone" className={classes.infoText}>
                      <FormattedMessage {...mg['phone']} />:{' '}
                      <a
                        className={classes.infoText}
                        href={`tel:${
                          phoneNumber?.formatInternational() || 'N/A'
                        }`}
                      >
                        {phoneNumber?.formatInternational() || 'N/A'}
                      </a>
                    </Text>
                    <Text datatype="email" className={classes.infoText}>
                      <FormattedMessage {...mg['email']} />:{' '}
                      <a
                        className={classes.infoText}
                        href={`mailto:${email || 'N/A'}`}
                      >
                        {email || 'N/A'}
                      </a>
                    </Text>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>

          {displayReviews && (
            <>
              <Text variant="body1" mb={1}>
                <FormattedMessage {...mg['dealerRating']} />
              </Text>
              <Box mb={2}>
                <Flexbox justifyContent="start">
                  <Rating
                    name="customized-color"
                    defaultValue={loading ? 0 : stars}
                    precision={0.5}
                    value={stars}
                    readOnly
                  />
                  <Text className={classes.star} ml={1}>
                    {numRound(stars)}&nbsp;
                    <FormattedPlural
                      value={stars}
                      one={<FormattedMessage {...mg.starsEmpty} />}
                      other={<FormattedMessage {...mg.stars} />}
                    />
                  </Text>
                </Flexbox>
                {loading ? (
                  <Skeleton width="100px" />
                ) : (
                  <Text
                    className={classes.star}
                    textTransform="lowercase"
                    mt={1}
                  >
                    ({reviewsNumber}&nbsp;
                    <FormattedPlural
                      value={+reviewsNumber}
                      one={<FormattedMessage {...mg.allReviewsEmpty} />}
                      other={<FormattedMessage {...mg.allReviews} />}
                    />
                    )
                  </Text>
                )}
              </Box>
            </>
          )}

          <Frame mobileTight p={'0'} borderRadius={4}>
            <Box height={200}>
              {loading ? (
                <Skeleton variant="rect" width="100%" height={200} />
              ) : (
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: 200 }}
                  center={address?.location}
                  zoom={10}
                >
                  <Marker position={address?.location} icon={MarkerSvg} />
                </GoogleMap>
              )}
            </Box>
          </Frame>
        </Frame>
      </Box>
    </>
  )
}

export default DealerInformaition
