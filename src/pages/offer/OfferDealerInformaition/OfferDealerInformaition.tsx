import React, { FC } from 'react'
import { Box, Button } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'

import { Text, Flexbox } from '~/components/shared'
import Frame from '~/components/frame'
import FullOnMobile from '~/components/layouts/FullOnMobile'
import BlockHeader from '~/components/BlockHeader'
import mg from '../offer.measeges'

import useStyle from '../offer.style'
import { Rating } from '@material-ui/lab'

interface OfferDealerInformaitionProps {
  phone: string
  email: string
  openingHourse: string[]
  location: string
  stars: number
  reviews: number
}

const OfferDealerInformaition: FC<OfferDealerInformaitionProps> = ({
  phone,
  email,
  openingHourse,
  location,
  stars,
  reviews
}): JSX.Element => {
  const classes = useStyle()

  return (
    <>
      <Box mb={2}>
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
          <Button
            size="large"
            variant="contained"
            color="secondary"
            disableElevation
            className={classes.reviewBtn}
          >
            <FormattedMessage {...mg['visitDealer']} />
          </Button>
        </Flexbox>
        <FullOnMobile>
          <Frame>
            <Flexbox className={classes.column} justifyContent="space-between">
              <Box pb={2}>
                <Text pb={1} variant="body1">
                  <FormattedMessage {...mg['location']} />
                </Text>
                <Text className={classes.infoText}>{location}</Text>
              </Box>

              <Box pb={2}>
                <Text variant="body1" pb={1}>
                  <FormattedMessage {...mg['openingHours']} />
                </Text>
                {openingHourse.map((openHourse) => (
                  <Text className={classes.infoText} key={openHourse}>
                    {openHourse}
                  </Text>
                ))}
              </Box>

              <Box pb={2}>
                <Text variant="body1" pb={1}>
                  <FormattedMessage {...mg['contact']} />
                </Text>
                <Text className={classes.infoText}>
                  <FormattedMessage {...mg['phone']} />: {phone}
                </Text>
                <Text className={classes.infoText}>
                  <FormattedMessage {...mg['email']} />: {email}
                </Text>
              </Box>
            </Flexbox>
            <Box>
              <Flexbox justifyContent="start">
                <Rating
                  name="customized-color"
                  defaultValue={stars}
                  precision={0.5}
                  readOnly
                />
                <Text className={classes.star} ml={3}>
                  {stars} <FormattedMessage {...mg.stars} />
                </Text>
              </Flexbox>
              <Text className={classes.star} mt={1}>
                ( {reviews} <FormattedMessage {...mg.allReviews} /> )
              </Text>
            </Box>
          </Frame>
        </FullOnMobile>
      </Box>
    </>
  )
}

export default OfferDealerInformaition
