import React, { FC } from 'react'
import { Grid, Box, Container, Divider, Button } from '@material-ui/core'
import { FormattedMessage, useIntl } from 'react-intl'

import Text from '~/components/shared/Text'
import SignInForm from '~/components/forms/SignInForm/SignInForm'
import GoogleButton from '~/components/forms/GoogleButton'

import Link from '~/components/shared/Link'

import smg from '~/i18n/messages/pages'
import messages from './sign-in.messages'
import { SEO } from '~/components/shared'

import useStyle from './sig-in.style'

const SignIn: FC = () => {
  const { formatMessage } = useIntl()
  const classes = useStyle()

  return (
    <>
      <SEO title={formatMessage(smg['title.sign-in'])} />
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
                <SignInForm />
              </Grid>
              <Grid item xs={12}>
                <GoogleButton>
                  <FormattedMessage {...messages['button.google']} />
                </GoogleButton>
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
                  <Link to="/sign-up" underline="none" color="textPrimary">
                    <Button
                      className={classes.signButon}
                      disableElevation
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
