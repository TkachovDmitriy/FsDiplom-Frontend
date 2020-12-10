import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button
} from '@material-ui/core'

import mg from '~/i18n/messages/confirmation'
import { FormattedMessage, useIntl } from 'react-intl'

interface Modalprops {
  title?: string
  message?: string
  translateKey?: string
  open?: boolean
  onExited?: () => void
  onClose?: () => void
  onConfirm?: () => void
  onCancel?: () => void
}

const ConfirmationModal: React.FC<Modalprops> = ({
  title,
  message,
  translateKey,
  open,
  onExited,
  onClose,
  onConfirm,
  onCancel,
  children
}) => {
  const { formatMessage } = useIntl()
  const elements = React.Children.toArray(children)
  const trigger = React.Children.count(elements) === 1

  const [isOpen, setOpen] = useState(open || false)

  const handleCloseModal = (): void => {
    setOpen(false)
    onClose && onClose()
  }

  const handleCancel = (): void => {
    onCancel && onCancel()
    handleCloseModal()
  }

  const handleConfirm = (): void => {
    onConfirm && onConfirm()
    handleCloseModal()
  }

  return (
    <>
      {trigger &&
        // @ts-ignore
        React.cloneElement(elements[0], { onClick: (): void => setOpen(true) })}
      <Dialog
        open={trigger ? isOpen : open}
        onExited={onExited || handleCloseModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>
          {translateKey ? formatMessage(mg[`title.${translateKey}`]) : title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {translateKey
              ? formatMessage(mg[`message.${translateKey}`])
              : message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel} color="primary">
            <FormattedMessage {...mg['button.cancel']} />
          </Button>
          <Button onClick={handleConfirm} color="primary">
            <FormattedMessage {...mg['button.confirm']} />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmationModal
