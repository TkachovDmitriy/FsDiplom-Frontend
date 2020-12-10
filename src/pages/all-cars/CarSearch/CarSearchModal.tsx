import React from 'react'
import { Box, Dialog, DialogContent, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { FormattedMessage } from 'react-intl'

import { SearchCarInputs } from '~/interfaces/inputs'

import CarSearch from './CarSearch'
import mg from '../CarsFilter/CarsFilter.messages'
import { Text } from '~/components/shared'

interface CarSearchModalprops {
  open: boolean
  onExited?: () => void
  onClose: () => void
  values: SearchCarInputs
  dealerNames: { value: string; label: string }[]
  dealersLoading: boolean
}

const CarSearchModal: React.FC<CarSearchModalprops> = ({
  open,
  onExited,
  onClose,
  ...rest
}) => {
  return (
    <Dialog fullScreen open={open} onExited={onExited} onClose={onClose}>
      <DialogContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Text variant="h3">
            <FormattedMessage {...mg['filters']} />
          </Text>
          <Box position="absolute" display="flex" right="0">
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <CarSearch {...rest} />
      </DialogContent>
    </Dialog>
  )
}

export default CarSearchModal
