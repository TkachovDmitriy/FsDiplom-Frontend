import React, { FC, useState, useMemo } from 'react'
import { FormattedMessage, useIntl, FormattedPlural } from 'react-intl'
import { Box, Button, Collapse } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

import BlockHeader from '~/components/BlockHeader'
import Frame from '~/components/frame'
import RightSideBtn from '~/components/RightSideBtn'
import { Text, Flexbox } from '~/components/shared'
import FullOnMobile from '~/components/layouts/FullOnMobile'
import { createLocalizedPath } from '~/utils/localizedPath'

import useStyle from './Reviews.style'

import mg from './Reviews.messages'
import { useHistory } from 'react-router'
import { useSelector, RootStateOrAny } from 'react-redux'
import { isLogged } from '~/state/modules/user'
import { useRoles } from '~/constants/roles'
import { STORAGE } from '~/constants'

interface ReviewsProps {
  reviews: any[]
  dealerId?: string
  loading: boolean
  showModal?: () => void
}

const Reviews: FC<ReviewsProps> = ({
  reviews,
  showModal,
  loading
}): JSX.Element => {
  const classes = useStyle()
  const history = useHistory()
  const { locale } = useIntl()

  const logged = useSelector(isLogged)
  const role = useSelector((state: RootStateOrAny) => state?.user?.role)
  const { isUser } = useRoles(role)
  const isWriteReviews = (): void => {
    if (logged && isUser) {
      return showModal()
    }
    localStorage.setItem(STORAGE.redirect, history.location.pathname)

    history.push(createLocalizedPath('/sign-in', locale))
  }

  const placeholder = new Array(2).fill([])

  const [seeAll, setSeeAll] = useState(false)

  const handleToggle = (): void => setSeeAll(!seeAll)

  const reviewsAll = useMemo(() => {
    if (reviews) {
      const _reviews = [...reviews]
      return {
        preview: _reviews.splice(0, 2),
        other: _reviews
      }
    }

    return {}
  }, [reviews])

  console.log('reviewsAll', reviewsAll)
  // const placeholder = new Array(2).fill([])

  return (
    <Box mb={3}>
      <Flexbox
        justifyContent="space-between"
        alignItems="baseline"
        className={classes.reviewTop}
        mb={2.5}
      >
        <BlockHeader translateMessageObj={'Reviews'} marginBottom={1.25} />
        <Button
          size="large"
          variant="contained"
          color="secondary"
          disableElevation
          className={classes.reviewBtn}
          onClick={(e) => {
            e.stopPropagation()
            isWriteReviews()
          }}
        >
          <FormattedMessage {...mg['writeReview']} />
        </Button>
      </Flexbox>

      <FullOnMobile>
        <Frame>
          <Box>
            {loading
              ? placeholder
              : reviewsAll?.preview?.map((review) => {
                  return (
                    <Box key={review.id} mb={2}>
                      <Text variant="subtitle1">{review.user_name}</Text>
                      <Flexbox mt={1} mb={1}>
                        <Box mr={1}>
                          <Rating
                            name="customized-color"
                            defaultValue={review.mark}
                            precision={0.5}
                            readOnly
                          />
                        </Box>
                        <Text className={classes.star}>
                          {review.mark}{' '}
                          <FormattedPlural
                            value={review.mark}
                            one={<FormattedMessage {...mg['star']} />}
                            other={<FormattedMessage {...mg['stars']} />}
                          />
                        </Text>
                      </Flexbox>
                      <Text className={classes.reviewText}>
                        {review.description}
                      </Text>
                    </Box>
                  )
                })}
            <Collapse in={seeAll}>
              {loading
                ? placeholder
                : reviewsAll?.other?.map((review) => (
                    <Box key={review.id} mb={2}>
                      <Text variant="subtitle1">{review.user_name}</Text>
                      <Flexbox mt={1} mb={1}>
                        <Box mr={1}>
                          <Rating
                            name="customized-color"
                            defaultValue={review.mark}
                            precision={0.5}
                            readOnly
                          />
                        </Box>
                        <Text className={classes.star}>
                          {review.mark}{' '}
                          <FormattedPlural
                            value={review.mark}
                            one={<FormattedMessage {...mg['star']} />}
                            other={<FormattedMessage {...mg['stars']} />}
                          />
                        </Text>
                      </Flexbox>
                      <Text className={classes.reviewText}>
                        {review.description}
                      </Text>
                    </Box>
                  ))}
            </Collapse>
          </Box>
          {!reviews?.length && !loading && <Text>No reviews</Text>}
          {!loading && !!reviewsAll?.other?.length && (
            <RightSideBtn
              onClick={handleToggle}
              translateObj={seeAll ? mg['showLess'] : mg['seeAll']}
            />
          )}
        </Frame>
      </FullOnMobile>
    </Box>
  )
}

export default Reviews
