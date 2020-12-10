import React from 'react'
import { defineMessages } from 'react-intl'
import { Grid, Box } from '@material-ui/core'
import moment from 'moment'

import { ReactComponent as TestDrive } from '~/assets/icons/testDrive.svg'

import { Flexbox, Text, ListItem } from '~/components/shared'

import useStyles from './PromotionTariffCard.style'
import { formatCurrency } from '~/utils/functions'
import { FormattedMessage, useIntl } from 'react-intl'

const scope = 'components.cards.PromotionTariffCard'

const mg = defineMessages({
  price: {
    id: `${scope}.price`,
    defaultMessage: 'Price'
  },
  days: {
    id: `${scope}.days`,
    defaultMessage: 'Days'
  }
})

const PromotionTariffCard = ({ price, days_promotion }) => {
  const classes = useStyles()
  const { formatMessage } = useIntl()

  return (
    <Grid container className={classes.root}>
      <Grid xs={12} md={6} item>
        <Flexbox className={classes.driveDateContainer}>
          <Box className={classes.driveDateIcon}>
            <TestDrive />
          </Box>
          <Box className={classes.driveDateInfo} width="100%">
            <Text textTransform="none">
              <FormattedMessage
                id={`${scope}.expireDate`}
                defaultMessage="Expire date:"
              />
            </Text>
            <Text textTransform="none">
              {`${moment().add(days_promotion, 'days').format('DD MMMM YYYY')}`}
            </Text>
          </Box>
        </Flexbox>
      </Grid>
      <Grid item xs={12} md={6} className={classes.grid}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ListItem textTransform="none" label={formatMessage(mg.price)}>
              {formatCurrency(price)}
            </ListItem>
          </Grid>
          <Grid item xs={12} md={6}>
            <ListItem textTransform="none" label={formatMessage(mg.days)}>
              {days_promotion}
            </ListItem>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PromotionTariffCard
