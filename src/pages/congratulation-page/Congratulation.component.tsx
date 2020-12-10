import React, { FC } from 'react'
import { Grid, Box, makeStyles, Theme, createStyles } from '@material-ui/core'
import { Text, SEO } from '~/components/shared'
import { FormattedMessage, useIntl } from 'react-intl'
import errorImg from '~/assets/images/Congratulation/Illustration.png'

import mg from './Congratulation.messages'
import smg from '~/i18n/messages/pages'

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    mobileViews: {
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    }
  })
)

const Congratulation: FC = (): JSX.Element => {
  const { formatMessage } = useIntl()
  const classes = useStyle()
  return (
    <>
      <SEO title={formatMessage(smg['title.congratulation'])} />

      <Grid container>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="column" textAlign="center" my={8}>
            <Text variant="h2" mb={2}>
              <FormattedMessage {...mg.title} />
            </Text>
          </Box>
          <Box textAlign="center" mt={2}>
            <img className={classes.mobileViews} src={errorImg} />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
export default Congratulation
