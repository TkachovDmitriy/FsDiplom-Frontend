import React, { FC } from 'react'
import { Grid, Box } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core'
import ListAltIcon from '@material-ui/icons/ListAlt'

import BlockHeader from '~/components/BlockHeader'
import Frame from '~/components/frame'
import { Text } from '~/components/shared'
import FullOnMobile from '~/components/layouts/FullOnMobile'

import mg from '../offer.measeges'
import { Skeleton } from '@material-ui/lab'
import { FormattedMessage } from 'react-intl'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      title: {
        padding: '5px 15px 0 0'
      },
      description: {
        fontSize: 16,
        color: theme.palette.text.primary
      }
    }),
  {
    name: 'OfferDescription'
  }
)

interface OfferDescriptionProps {
  special_equipment: string
  equipment: string
  loading?: boolean
  title: string
  description_info: string
  description_link: string
}

const OfferDescription: FC<OfferDescriptionProps> = ({
  loading,
  equipment,
  special_equipment,
  title,
  description_info,
  description_link
}) => {
  const classes = useStyle()

  return (
    <>
      <BlockHeader translateMessageObj={title} />
      <FullOnMobile>
        <Frame>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box className={classes.title}>
                <Text className={classes.description} pb={1}>
                  {loading ? (
                    <>
                      <Skeleton width="100%" />
                      <Skeleton width="100%" />
                      <Skeleton width="70%" />
                    </>
                  ) : (
                    special_equipment || 'N/A'
                  )}
                </Text>
              </Box>
              <Box className={classes.title}>
                <Text pb={1}>Iнформацiя:</Text>
                <Text className={classes.description} pb={1}>
                  {loading ? (
                    <>
                      <Skeleton width="100%" />
                      <Skeleton width="100%" />
                      <Skeleton width="70%" />
                    </>
                  ) : (
                    description_info || 'N/A'
                  )}
                </Text>
                <Box textAlign="center" mb={2}>
                  <a href={description_link}>
                    <ListAltIcon
                      style={{
                        width: 20,
                        verticalAlign: 'middle',
                        color: 'black'
                      }}
                    />{' '}
                    {description_link}
                  </a>
                </Box>
                <Text className={classes.description} pb={1}>
                  {loading ? (
                    <>
                      <Skeleton width="100%" />
                      <Skeleton width="100%" />
                      <Skeleton width="70%" />
                    </>
                  ) : (
                    equipment || 'N/A'
                  )}
                </Text>
              </Box>
            </Grid>
          </Grid>
        </Frame>
      </FullOnMobile>
    </>
  )
}

export default OfferDescription
