import React, { FC } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core'

import Text from '~/components/shared/Text'
import { Flexbox, SEO } from '~/components/shared'

import { STORAGE } from '~/constants'

import { ReactComponent as VerifyImage } from '~/assets/images/verify.svg'

import smg from '~/i18n/messages/pages'
import classes from '*.module.css'

const scope = 'pages.verify'

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    mobileViews: {
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    }
  })
)

const Verify: FC = () => {
  const { formatMessage } = useIntl()
  const classes = useStyle()
  return (
    <>
      <SEO title={formatMessage(smg['title.verify'])} />

      <Flexbox alignItems="center" flex={1} my={{ xs: '50px', md: '100px' }}>
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid item xs={12}>
            <Text variant="h2" textAlign="center">
              <FormattedMessage id={`${scope}.title`} defaultMessage="Verify" />
            </Text>
          </Grid>
          <Grid item xs={12}>
            <Text textAlign="center" color="textSecondary">
              <FormattedMessage
                id={`${scope}.subtitle1`}
                defaultMessage="We have sent an email to"
              />{' '}
              <b>{localStorage.getItem(STORAGE.userEmail)}</b>.<br />
              <FormattedMessage
                id={`${scope}.subtitle2`}
                defaultMessage="Have a look for it, click the link and you are off!"
              />
            </Text>
          </Grid>
          <Grid item xs={12}>
            <VerifyImage className={classes.mobileViews} />
          </Grid>
        </Grid>
      </Flexbox>
    </>
  )
}

export default Verify
