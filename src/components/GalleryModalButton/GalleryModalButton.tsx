import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { useModal } from 'react-modal-hook'
import { Button, useMediaQuery, useTheme } from '@material-ui/core'

import ModalGallery from '~/components/dialogs/GalleryModal'
import useStyle from './GalleryModalButtonstyle'

import sharedMg from '~/i18n/messages/shared'

type Props = {
  photos: any[]
}

const ModalGalleryBtn: FC<Props> = ({ photos }) => {
  const theme = useTheme()
  const classes = useStyle()
  const [showModal, hideModal] = useModal(
    ({ in: open, onExited }) => {
      return (
        <ModalGallery
          photos={photos}
          open={open}
          onExited={onExited}
          onClose={hideModal}
        />
      )
    },
    [photos]
  )

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.positionBtn}
      onClick={showModal}
      size={isDesktop ? 'large' : 'small'}
    >
      <FormattedMessage {...sharedMg.showGallery} />
    </Button>
  )
}

export default ModalGalleryBtn
