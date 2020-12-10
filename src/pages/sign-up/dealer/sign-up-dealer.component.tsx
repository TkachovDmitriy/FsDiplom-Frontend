import React, { FC } from 'react'
import { Grid, Box, Container, Button, Divider } from '@material-ui/core'
import { FormattedMessage, useIntl } from 'react-intl'

import { SEO } from '~/components/shared'
import Text from '~/components/shared/Text'
import SignUpDealerForm from '~/components/forms/SignUpDealerForm'

import Link from '~/components/shared/Link'

import smg from '~/i18n/messages/pages'
import mg from './sign-up-dealer.messages'
import useStyle from '../../sign-in/sig-in.style'

const SignUp: FC = () => {
  const { formatMessage } = useIntl()
  const classes = useStyle()
  return (
    <>
      <SEO title={formatMessage(smg['title.sign-up.dealer'])} />

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
                    <FormattedMessage {...mg.title} />
                  </Text>
                  <Text variant="h5" color="textSecondary">
                    <FormattedMessage {...mg['title.description']} />
                  </Text>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <SignUpDealerForm />
              </Grid>
              <Grid item xs={12}>
                <Box width="100%" my={2.5}>
                  <Divider />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Text textAlign="center" color="textSecondary" mb={1}>
                    <FormattedMessage {...mg['account.text']} />
                  </Text>
                  <Link
                    to="/sign-in/dealer"
                    underline="none"
                    color="textPrimary"
                  >
                    <Button
                      className={classes.signButon}
                      disableElevation
                      variant="contained"
                      fullWidth
                      size="large"
                    >
                      <FormattedMessage {...mg['link.sign-in']} />
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

export default SignUp
