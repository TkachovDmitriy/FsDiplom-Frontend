import React from 'react'
import {
  Dialog,
  Grid,
  Card,
  Box,
  DialogContent,
  IconButton,
  DialogTitle
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { useStyle } from './Modal.style'

import sharedMg from '~/i18n/messages/shared'
import { FormattedMessage } from 'react-intl'

interface Modalprops {
  open: boolean
  onExited: () => void
  onClose: () => void
  photos: string[]
}

const ModalGallery: React.FC<Modalprops> = ({
  open,
  onExited,
  onClose,
  photos
}) => {
  const classes = useStyle()
  return (
    <Dialog
      className={classes.muiPaper}
      open={open}
      onExited={onExited}
      onClose={onClose}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <FormattedMessage {...sharedMg.gallery} />
          <Box position="absolute" right={5} top={0} onClick={onClose}>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {photos.map((photo, i) => {
            return (
              <Grid key={i} item xs={12} sm={photos.length === 3 ? 4 : 3}>
                <Box>
                  <Card>
                    <div className={classes.card}>
                      <img src={photo} alt="car" />
                    </div>
                  </Card>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default ModalGallery
