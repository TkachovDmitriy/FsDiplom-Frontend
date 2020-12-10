import React, { FC } from 'react'
import { useModal } from 'react-modal-hook'
import { FormattedMessage, useIntl } from 'react-intl'
import {
  CardMedia,
  Grid,
  Button,
  Box,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import cx from 'classnames'

import OrderModal from '~/components/dialogs/OrderModal'
import { Text, Flexbox, PriceBadge, Link } from '~/components/shared'
import { formatCurrency } from '~/utils/functions'
import { Car } from '~/model/Car'

import useStyle from './BookCarCardStyle'

import mg from './BookCarCard.messages'

export interface BookCarCardProps {
  id: number | string
  title: string
  description: string
  author: string
  timeStampTitle: string
  askComments: string
  timeStampSteps?: string[]
  loading?: boolean
  photo: string
}

const BookCarCard: FC<BookCarCardProps> = ({
  id,
  loading,
  title,
  description,
  author,
  timeStampSteps,
  timeStampTitle,
  askComments,
  photo
}): JSX.Element => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const classes = useStyle()
  const { formatMessage } = useIntl()

  return (
    <Box className={classes.root} mb={2}>
      <Grid container>
        <Grid item xs={12} sm={6} lg={4}>
          <Flexbox flexDirection="column" className={classes.imageContainer}>
            {loading ? (
              <Skeleton
                animation="wave"
                variant="rect"
                className={classes.imageCar}
                width="100%"
              />
            ) : (
              <Link to={`/all-cars/${id}`}>
                <CardMedia
                  // @ts-ignore
                  image={photo}
                  component="img"
                  className={classes.imageCar}
                />
              </Link>
            )}
          </Flexbox>
        </Grid>

        <Grid item xs={12} sm={6} lg={8}>
          <Box
            height="100%"
            display="flex"
            flexDirection="column"
            p={{ xs: 1.875, md: 1.875 }}
          >
            <Link to={`/article/${id}`}>
              <Text variant="h4" mb={3}>
                {loading ? <Skeleton height={30} width="40%" /> : `${title}`}
              </Text>
            </Link>

            <Box className={classes.details}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Text
                    variant="body2"
                    className={cx(classes.detailItem, classes.lineClamp)}
                  >
                    {[title, description, author, timeStampTitle]
                      .filter(Boolean)
                      .join(', ')}
                  </Text>
                </Grid>
              </Grid>
            </Box>

            <Grid container spacing={1} className={classes.buttonContainer}>
              <Grid item xs={12} md={6}>
                {loading ? (
                  <Skeleton height={40} />
                ) : (
                  <Link to={`/article/${id}`}>
                    <Button
                      variant="outlined"
                      fullWidth
                      disableElevation
                      className={classes.detailsButton}
                    >
                      <Text component="span" lineHeight={1.5} fontSize={18}>
                        Read more
                      </Text>
                    </Button>
                  </Link>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BookCarCard
