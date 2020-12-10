import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import { FormattedMessage, useIntl, FormattedPlural } from 'react-intl'
import { Box, Button, useTheme, useMediaQuery } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

import { Text, Flexbox } from '~/components/shared'

import { createLocalizedPath } from '~/utils/localizedPath'

import { useStyleDesktop, useStyleMobile } from './DealerRatingStyle'

import mg from '../dealer.messages'
import { useHistory } from 'react-router'
import { useSelector, RootStateOrAny } from 'react-redux'
import { useRoles } from '~/constants/roles'
import { isLogged } from '~/state/modules/user'
import { STORAGE } from '~/constants'

interface DealerRatingProps {
  reviewsNumber: number
  rating: number
  showModal: any
}

const DealerRating: FC<DealerRatingProps> = ({
  reviewsNumber,
  rating,
  showModal
}): JSX.Element => {
  const classes = useStyleDesktop()
  const classesMobile = useStyleMobile()
  const history = useHistory()
  const { locale } = useIntl()

  const logged = useSelector(isLogged)
  const role = useSelector((state: RootStateOrAny) => state?.user?.role)
  const { isUser } = useRoles(role)
  const isWriteReviews = () => {
    if (logged && isUser) {
      return showModal()
    }
    localStorage.setItem(STORAGE.redirect, history.location.pathname)

    history.push(createLocalizedPath('/sign-in', locale))
  }

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  return isDesktop ? (
    <Box className={classes.root}>
      <Flexbox
        className={classes.header}
        justifyContent="center"
        flexWrap="wrap"
      >
        <Text mr={1} variant="subtitle1">
          <FormattedMessage {...mg['dealerRating']} />
        </Text>
        {locale === 'de' && <br />}
        <Text variant="subtitle1">
          <a color="white" href="#reviews">
            ({reviewsNumber}{' '}
            <FormattedPlural
              value={reviewsNumber}
              one={<FormattedMessage {...mg.ratingReview} />}
              other={<FormattedMessage {...mg.ratingReviews} />}
            />
            ){' '}
          </a>
        </Text>
      </Flexbox>
      <Box p={2}>
        <Text align="center" variant="h2" mt={1} mb={1}>
          {!!rating ? +rating : 0}
        </Text>
        <Box className={classes.ratingContainer}>
          <Rating
            name="customized-color"
            defaultValue={0}
            value={rating}
            precision={0.5}
            size="large"
            readOnly
          />
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          disableElevation
          onClick={(e) => {
            e.stopPropagation()
            isWriteReviews()
          }}
        >
          <FormattedMessage {...mg['writeReview']} />
        </Button>
      </Box>
    </Box>
  ) : (
    ReactDOM.createPortal(
      <Flexbox
        justifyContent="space-between"
        p={2.5}
        className={classesMobile.root}
      >
        <Box>
          <Text mr={1} variant="subtitle1">
            <FormattedMessage {...mg['dealerRating']} />
          </Text>
          <Flexbox alignItems="flex-end">
            <Text lineHeight={1}>{rating || 0}</Text>
            <Flexbox
              display="flex"
              alignItems="center"
              className={classesMobile.ratingContainer}
            >
              <Rating
                name="customized-color"
                defaultValue={0}
                value={isNaN(rating) ? 0 : rating}
                precision={0.5}
                size="small"
                readOnly
              />
            </Flexbox>
          </Flexbox>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => {
            e.stopPropagation()
            isWriteReviews()
          }}
          disableElevation
        >
          <FormattedMessage {...mg['writeReview']} />
        </Button>
      </Flexbox>,
      document.querySelector('#dealer-rating')
    )
  )
}

export default DealerRating
