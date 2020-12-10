import React, { useCallback, useState } from 'react'
import {
  Dialog,
  DialogActions,
  Button,
  Box,
  Grid,
  useMediaQuery,
  IconButton,
  useTheme
} from '@material-ui/core'
import { Field, Form, reduxForm, InjectedFormProps } from 'redux-form'
import { compose } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { Deserializer } from 'jsonapi-serializer'
import { useIntl, FormattedMessage } from 'react-intl'
import ReCAPTCHA from 'react-google-recaptcha'
import CloseIcon from '@material-ui/icons/Close'

import { Text } from '~/components/shared'

import TestMee from '~/services/TestMee'
import { AppState } from '~/interfaces/redux'

import { Textarea } from '../fields'
import { useReviewStyle } from './Modal.style'
import RatingField from '../fields/RatingField'

import { asyncValidate } from '~/utils/asyncValidate'
import ReviewSchema from '~/schemas/review'

import ms from './Modals.messages'

interface Modalprops {
  open: boolean
  onExited: () => void
  onClose: () => void
  addReview: (data: {}) => void
  user_id?: string
  dealer_id?: string
}

const WriteReview: React.FC<Modalprops & InjectedFormProps> = ({
  open,
  onExited,
  onClose,
  handleSubmit
}) => {
  const classes = useReviewStyle()
  const { formatMessage } = useIntl()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const [isVerify, setVerify] = useState<boolean>(false)

  const verifyCallback = useCallback(() => {
    setVerify(true)
  }, [])

  return (
    <Dialog
      className={classes.viewModal}
      open={open}
      onExited={onExited}
      onClose={onClose}
    >
      <DialogActions className={classes.actionDialog}>
        <Box position="absolute" right={10} top={5}>
          <IconButton size={isDesktop ? 'medium' : 'small'} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Grid className={classes.container} container>
          <Form className={classes.root} onSubmit={handleSubmit}>
            <Grid item sm={12}>
              <Text mt={4} textAlign="center" variant="h3">
                <FormattedMessage {...ms['placeholder.review']} />
              </Text>
            </Grid>
            <Grid item sm={12}>
              <Box textAlign="center" my={2}>
                <Text mb={1} variant="h4">
                  <FormattedMessage {...ms['stars']} />
                </Text>
                <Field id="mark" name="mark" component={RatingField} />
              </Box>
            </Grid>
            <Box m={0} mb={2}>
              <Grid item sm={12}>
                <Text variant="body1">
                  <FormattedMessage {...ms['review']} />
                </Text>
                <Field
                  style={{ paddingTop: 0 }}
                  id="description"
                  name="description"
                  multiline
                  margin="normal"
                  rows={8}
                  placeholder={formatMessage({
                    ...ms['placeholder.review']
                  })}
                  component={Textarea}
                />
              </Grid>
            </Box>
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              onChange={verifyCallback}
            />

            <Box my={2} pb={1}>
              <Button
                disabled={!isVerify}
                color="secondary"
                type="submit"
                size="medium"
                fullWidth={true}
                variant="contained"
              >
                <Text fontSize={18}>
                  <FormattedMessage {...ms.send} />
                </Text>
              </Button>
            </Box>
          </Form>
        </Grid>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    user_id: state.user.user_id
  }
}

const withConnet = connect(mapStateToProps)

const withForm = reduxForm<
  { mark: number; description: string },
  Modalprops & RouteComponentProps<{ dealerId: string }>
>({
  form: 'WriteReviewForm',
  shouldAsyncValidate: () => true,
  asyncValidate: asyncValidate(ReviewSchema),
  onSubmit: (values, _dispatch, { user_id, dealer_id }) => {
    return TestMee.updateReviews({
      review: {
        ...values,
        user_id,
        dealer_id
      }
    })
  },

  onSubmitSuccess: async (result, _dispatch, { addReview, onClose }) => {
    const payload = await new Deserializer({
      keyForAttribute: 'snake_case'
    }).deserialize(result)

    addReview(payload)
    onClose()
  }
})

export default compose<React.FC<Modalprops>>(
  withRouter,
  withConnet,
  withForm
)(WriteReview)
