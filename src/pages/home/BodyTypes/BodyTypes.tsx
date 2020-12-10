import React, { FC } from 'react'
import { Grid, Box } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'

import { Text, Link, Flexbox } from '~/components/shared'

import { ReactComponent as Sedan } from '~/assets/icons/bodyTypes/sedan.svg'
import { ReactComponent as HatchBack } from '~/assets/icons/bodyTypes/hatchback.svg'
import { ReactComponent as AllDriveWheels } from '~/assets/icons/bodyTypes/allWheelsDrive.svg'
import { ReactComponent as StationWagon } from '~/assets/icons/bodyTypes/stationWagons.svg'
import { ReactComponent as BusesAndVans } from '~/assets/icons/bodyTypes/busesAndVans.svg'
import { ReactComponent as ElectricCar } from '~/assets/icons/bodyTypes/electricCar.svg'

import mg from '../home.messages'

import useStyles from './BodyTypesStyle'

const bodyTypes = [
  { icon: <Sedan />, translateKey: 'sedan' },
  {
    icon: <HatchBack />,
    translateKey: 'hatchback'
  },
  {
    icon: <AllDriveWheels />,
    translateKey: 'allWheelDrive'
  },
  {
    icon: <StationWagon />,
    translateKey: 'stationWagon'
  },
  {
    icon: <BusesAndVans />,
    translateKey: 'busesVans'
  },
  {
    icon: <ElectricCar />,
    translateKey: 'electricCar'
  }
]

const BodyTypes: FC = (): JSX.Element => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Text variant="h3" mb={4}>
        <FormattedMessage {...mg['bodyTypeTitle']} />
      </Text>
      <Grid container>
        {bodyTypes.map((bodyType) => (
          <Grid item xs={12} sm={4} lg={2} key={bodyType.translateKey}>
            <Link to="/">
              <Flexbox
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
              >
                <Box>{bodyType.icon}</Box>
                <Text>
                  <FormattedMessage {...mg[bodyType.translateKey]} />
                </Text>
              </Flexbox>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default BodyTypes
