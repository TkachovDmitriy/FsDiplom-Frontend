import React, { FC } from 'react'
import { toastr } from 'react-redux-toastr'
import { FormattedMessage, useIntl } from 'react-intl'
import { Card, CardContent, Box, Button, Grid } from '@material-ui/core'
import { useHistory } from 'react-router'
import { useModal } from 'react-modal-hook'

import { PriceBadge, Text } from '~/components/shared'
import PromoteModal from '~/components/dialogs/PromotionModal'
import ConfirmationModal from '~/components/dialogs/ConfirmationModal'

import { createLocalizedPath } from '~/utils/localizedPath'
import { Car } from '~/model/Car'
import { deleteCar } from '~/state/modules/cars'
import useThunkDispatch from '~/hooks/useThunkDispatch'

import toastrMessages from '~/i18n/messages/toastrMessages'
import useStyles from './DealerCarCard.style'
import { BookCarCardProps } from '../BookCarCard/BookCarCard'

const scope = 'components.cards.dealer-car-card'

const DealerCarCard: FC<BookCarCardProps> = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const { formatMessage, locale } = useIntl()
  const dispatch = useThunkDispatch()

  const onDeleteCar = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await dispatch(deleteCar(props.id))

      toastr.success(
        formatMessage(toastrMessages['title.success']),
        formatMessage(toastrMessages['message.car-deleted'])
      )
    } catch (error) {}
  }

  const [showModal, hideModal] = useModal(
    ({ in: open, onExited }) => (
      <PromoteModal
        open={open}
        onExited={onExited}
        onClose={hideModal}
        listingId={props.id}
      />
    ),
    [props.id]
  )

  return (
    <Card>
      <CardContent className={classes.content}>
        <Box className={classes.mobileView} display="flex">
          <Box
            display="flex"
            alignItems="center"
            minWidth={0}
            flex={1}
            mb={{ xs: 3, md: 0 }}
          >
            <Text
              flex={1}
              noWrap
              variant="h4"
              fontSize={18}
            >{`${props.title} || ${props.author}`}</Text>
          </Box>
          <Box display="flex">
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  color="primary"
                  className={classes.button}
                  onClick={(): void =>
                    history.push(
                      createLocalizedPath(`/dashboard/edit/${props.id}`, locale)
                    )
                  }
                >
                  <FormattedMessage
                    id={`${scope}.edit`}
                    defaultMessage="Edit"
                  />
                </Button>
              </Grid>

              <Grid item xs={6} sm={6}>
                <ConfirmationModal
                  onConfirm={onDeleteCar}
                  translateKey="deletionCar"
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    color="primary"
                    className={classes.button}
                  >
                    <FormattedMessage
                      id={`${scope}.delete`}
                      defaultMessage="Delete"
                    />
                  </Button>
                </ConfirmationModal>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default DealerCarCard
