import React from 'react'
import {
  Box,
  Dialog,
  createStyles,
  makeStyles,
  DialogContent,
  IconButton,
  Theme,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import OrderForm from '~/components/forms/OrderForm'

import { Text } from '../shared'
import { FormattedMessage } from 'react-intl'

export const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        zIndex: `${1302} !important` as any,
        '& .MuiDialog-paper': {
          margin: '0'
        },
        '& .MuiDialogContent-root': {
          [theme.breakpoints.down('sm')]: {
            padding: 8
          }
        },
        '& .MuiDialog-paperScrollPaper': {
          maxHeight: '100%',
          overflowX: 'hidden',
          borderRadius: 0
        },
        '& .MuiPickersStaticWrapper-root': {
          minWidth: '300px'
        },
        '& .MuiPickersBasePicker-pickerView': {
          width: '100%',
          minWidth: '300px'
        }
      }
    }),
  {
    name: 'ModalBtn'
  }
)

interface OrderModalprops {
  open: boolean
  onExited: () => void
  onClose: () => void
  listingId: string | number
}

const OrderModal: React.FC<OrderModalprops> = ({
  open,
  onExited,
  onClose,
  listingId
}) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const classes = useStyle()
  return (
    <Dialog
      className={classes.root}
      open={open}
      onExited={onExited}
      onClose={onClose}
      maxWidth="lg"
    >
      <DialogContent>
        <Box position="relative">
          <Box position="absolute" right={10} top={10}>
            <IconButton size={isDesktop ? 'medium' : 'small'} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Text pt={7} fontSize={isDesktop ? 24 : 20} p={2} textAlign="center">
            <FormattedMessage
              id="components.dialogs.OrderModal.info"
              defaultMessage="Choose the date and time of your test drive"
            />
          </Text>
        </Box>
        <OrderForm
          listingId={listingId}
          orientation={isDesktop ? 'horizontal' : 'vertical'}
        />
      </DialogContent>
    </Dialog>
  )
}

export default OrderModal
