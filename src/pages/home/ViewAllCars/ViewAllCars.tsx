import React, { FC } from 'react'
import { Grid, Box } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'

import { Text, Link, Flexbox } from '~/components/shared'

import useStyle from './ViewAllCarsStyle'

import mg from '../home.messages'

import { ReactComponent as ArrowRight } from '~/assets/icons/rightArraw.svg'
import { ReactComponent as ViewAll } from '~/assets/icons/viewAll.svg'

const ViewAllCars: FC = (): JSX.Element => {
  const classes = useStyle()

  return (
    <Grid item xs={12} sm={4} lg={2} className={classes.hov}>
      <Link to="/all-cars">
        <Flexbox
          flexDirection="column"
          justifyContent="space-between"
          className={classes.root}
        >
          <Box className={classes.titleContainer}>
            <Text variant="h5" className={classes.title}>
              <FormattedMessage {...mg['viewAllcars']} />
            </Text>
            <ArrowRight />
          </Box>
          <ViewAll />
        </Flexbox>
      </Link>
    </Grid>
  )
}

export default ViewAllCars
