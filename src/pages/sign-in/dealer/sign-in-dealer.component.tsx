import React, { FC } from 'react'
import { Grid, Box, Container, Divider, Button } from '@material-ui/core'
import { FormattedMessage, useIntl } from 'react-intl'
import { SEO } from '~/components/shared'

import Text from '~/components/shared/Text'
import SignInDealerForm from '~/components/forms/SignInDealerForm'

import Link from '~/components/shared/Link'

import smg from '~/i18n/messages/pages'
import messages from './sign-in-dealer.messages'

import useStyle from '../sig-in.style'

const SignIn: FC = () => {
  const { formatMessage } = useIntl()
  const classes = useStyle()
  return (
    <>
      <SEO title={formatMessage(smg['title.sign-in.dealer'])} />

      <Box my={8}>
        <Container maxWidth="sm" disableGutters>
          <Box mt={4} mb={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  flexDirection="column"
                  textAlign="center"
                  mb={2}
                >
                  <Text variant="h2" mb={2}>
                    <FormattedMessage {...messages.title} />
                  </Text>
                  <Text variant="h5" color="textSecondary">
                    <FormattedMessage {...messages['title.description1']} />
                  </Text>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <SignInDealerForm />
              </Grid>
              <Grid item xs={12}>
                <Box width="100%" my={2.5}>
                  <Divider />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Text textAlign="center" color="textSecondary" mb={1}>
                    <FormattedMessage {...messages['account.text']} />
                  </Text>
                  <Link
                    to="/sign-up/dealer"
                    underline="none"
                    color="textPrimary"
                  >
                    <Button
                      disableElevation
                      className={classes.signButon}
                      variant="contained"
                      fullWidth
                      size="large"
                    >
                      <FormattedMessage {...messages['link.sign-up']} />
                    </Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default SignIn
