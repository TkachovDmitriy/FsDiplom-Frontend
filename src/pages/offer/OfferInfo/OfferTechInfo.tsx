import React, { FC } from 'react'
import { Box } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import { Skeleton } from '@material-ui/lab'

import Frame from '~/components/frame'
import { Text } from '~/components/shared'
import FullOnMobile from '~/components/layouts/FullOnMobile'
import BlockHeader from '~/components/BlockHeader'

import { Car } from '~/model/Car'
import { formatCurrency } from '~/utils/functions'

import useStyle from './OfferTechInfo.style'
import mg from '../offer.measeges'

interface OfferTechInfo extends Car {
  loading?: boolean
}

const OfferTechInfo: FC<OfferTechInfo> = ({
  car_price,
  engine,
  brand,
  model,
  generation,
  power,
  fueltype,
  location,
  color,
  transmission,
  loading
}) => {
  const classes = useStyle()
  return (
    <>
      <BlockHeader
        translateMessageObj={mg.techSpecifications}
        mt={{ xs: 3, md: 3.75 }}
      />
      <FullOnMobile>
        <Frame>
          <Box className={classes.column}>
            <Text pb={1}>
              <FormattedMessage {...mg.price} />
            </Text>
            <Text pb={1} className={classes.infoText}>
              {loading ? (
                <Skeleton width="100px" />
              ) : car_price ? (
                formatCurrency(+car_price)
              ) : (
                'N/A'
              )}
            </Text>
            <Text pb={1}>
              <FormattedMessage {...mg.brand} />
            </Text>
            <Text pb={1} className={classes.infoText}>
              {loading ? <Skeleton width="100px" /> : brand || 'N/A'}
            </Text>
            <Text pb={1}>
              <FormattedMessage {...mg.model} />
            </Text>
            <Text pb={1} className={classes.infoText}>
              {loading ? <Skeleton width="100px" /> : model || 'N/A'}
            </Text>
            <Text pb={1}>
              <FormattedMessage {...mg.generation} />
            </Text>
            <Text pb={1} className={classes.infoText}>
              {loading ? <Skeleton width="100px" /> : generation || 'N/A'}
            </Text>
            <Text pb={1}>
              <FormattedMessage {...mg.engine} />
            </Text>
            <Text pb={1} className={classes.infoText}>
              {loading ? <Skeleton width="100px" /> : engine || 'N/A'}
            </Text>
            <Text pb={1}>
              <FormattedMessage {...mg.power} />
            </Text>
            <Text pb={1} className={classes.infoText}>
              {loading ? <Skeleton width="100px" /> : power || 'N/A'}
            </Text>
            <Text pb={1}>
              <FormattedMessage {...mg.color} />
            </Text>
            <Text pb={1} className={classes.infoText}>
              {loading ? <Skeleton width="100px" /> : color || 'N/A'}
            </Text>
            <Text pb={1}>
              <FormattedMessage {...mg.transmission} />
            </Text>
            <Text pb={1} className={classes.infoText}>
              {loading ? <Skeleton width="100px" /> : transmission || 'N/A'}
            </Text>
            <Text pb={1}>
              <FormattedMessage {...mg.fuel} />
            </Text>
            <Text pb={1} className={classes.infoText}>
              {loading ? <Skeleton width="100px" /> : fueltype || 'N/A'}
            </Text>
            <Text pb={1}>
              <FormattedMessage {...mg.location} />
            </Text>
            <Text pb={1} className={classes.infoText}>
              {loading ? <Skeleton width="100px" /> : location || 'N/A'}
            </Text>
          </Box>
        </Frame>
      </FullOnMobile>
    </>
  )
}
export default OfferTechInfo
