import React, { FC } from 'react'
import { useModal } from 'react-modal-hook'
import { Button } from '@material-ui/core'
import EventIcon from '@material-ui/icons/Event'

import OrderModal from '~/components/dialogs/OrderModal'
import useStyle from './OrderModalButton.style'

type OrderFormProps = {
  listingId: string | number
}

const ModalBtn: FC<OrderFormProps> = ({ listingId }) => {
  const classes = useStyle()
  const [showModal, hideModal] = useModal(
    ({ in: open, onExited }) => (
      <OrderModal
        open={open}
        onExited={onExited}
        onClose={hideModal}
        listingId={listingId}
      />
    ),
    [listingId]
  )

  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.positionBtn}
      onClick={showModal}
    >
      <EventIcon />
    </Button>
  )
}

export default ModalBtn
