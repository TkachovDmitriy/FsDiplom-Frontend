import React, { useState, useCallback } from 'react'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { PayPalButton } from 'react-paypal-button-v2'
import { FormattedMessage, defineMessages, useIntl } from 'react-intl'
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  createStyles,
  makeStyles,
  useMediaQuery,
  useTheme,
  Theme
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import TestMee from '~/services/TestMee'

import PromotionTariffCard from '../cards/PromotionTariffCard/PromotionTariffCard'
import { useHistory } from 'react-router'
import { toastr } from 'react-redux-toastr'
import { createLocalizedPath } from '~/utils/localizedPath'

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      [theme.breakpoints.down('sm')]: {
        '& .MuiDialog-container': {
          height: '100%'
        }
      }
    },
    stepContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    toggleBtn: {
      width: 600,
      minWidth: 200,
      borderRadius: '4px !important',
      padding: 0,
      '&:not(:last-child)': {
        marginBottom: 20
      },
      '&.Mui-selected': {
        boxShadow: `0px 0px 0px 6px ${theme.palette.secondary.main}`
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: 600,
        width: '100%'
      }
    },
    stepper: {
      [theme.breakpoints.down('sm')]: {
        padding: 0
      }
    },
    payment: {
      width: 300,
      minWidth: 200,
      minHeight: 200,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      [theme.breakpoints.down(425)]: {
        width: 250
      }
    }
  })
)

type Promotion = {
  price: number
  days_promotion: number
}

const promotions = [
  {
    price: 59,
    days_promotion: 10
  },
  {
    price: 99,
    days_promotion: 20
  }
]

const scope = 'pages.dashboard.promoted-car'

const messages = defineMessages({
  'toastr.title': {
    id: `${scope}.toastr.title`,
    defaultMessage: 'Success'
  },
  'toastr.message': {
    id: `${scope}.toastr.message`,
    defaultMessage: 'Car promotion has been paid'
  },
  title: {
    id: `${scope}.promotion`,
    defaultMessage: 'Promotion'
  },
  tariff: {
    id: `${scope}.tariff`,
    defaultMessage: 'Choose a tariff plan'
  },
  payment: {
    id: `${scope}.payment`,
    defaultMessage: 'Payment'
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Back'
  },
  next: {
    id: `${scope}.next`,
    defaultMessage: 'Next'
  }
})

interface PromoteModalprops {
  open: boolean
  onExited: () => void
  onClose: () => void
  listingId: number | string
}

const PromoteModal: React.FC<PromoteModalprops> = ({
  open,
  onExited,
  onClose,
  listingId
}) => {
  const theme = useTheme()
  const { formatMessage, locale } = useIntl()
  const classes = useStyle()
  const [tariff, setTariff] = useState<Promotion>(promotions[0])
  const [step, setStep] = useState(0)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const history = useHistory()

  const handleTariff = useCallback((_event, currentTariff) => {
    if (currentTariff) {
      setTariff(currentTariff)
    }
  }, [])

  const handleNext = (): void => {
    setStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = (): void => {
    setStep((prevActiveStep) => prevActiveStep - 1)
  }

  const actionButtons = (
    <Box display="flex" mt={2.5}>
      <Button disabled={step === 0} onClick={handleBack}>
        <FormattedMessage {...messages.back} />
      </Button>
      <Button
        disabled={step === 1}
        variant="contained"
        color="primary"
        onClick={handleNext}
      >
        <FormattedMessage {...messages.next} />
      </Button>
    </Box>
  )

  return (
    <Dialog
      className={classes.dialog}
      open={open}
      onExited={onExited}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <FormattedMessage {...messages.title} />
          <Box position="absolute" right={10} top={10} onClick={onClose}>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Stepper
            activeStep={step}
            orientation="vertical"
            className={classes.stepper}
          >
            <Step key={0}>
              <StepLabel>
                <FormattedMessage {...messages.tariff} />
              </StepLabel>
              <StepContent className={classes.stepContent}>
                <ToggleButtonGroup
                  exclusive
                  value={tariff}
                  onChange={handleTariff}
                  orientation="vertical"
                >
                  {promotions.map(
                    (promotion): JSX.Element => (
                      <ToggleButton
                        value={promotion}
                        key={promotion.days_promotion}
                        className={classes.toggleBtn}
                      >
                        <PromotionTariffCard {...promotion} />
                      </ToggleButton>
                    )
                  )}
                </ToggleButtonGroup>
              </StepContent>
            </Step>
            <Step key={1}>
              <StepLabel>
                <FormattedMessage {...messages.payment} />
              </StepLabel>
              <StepContent className={classes.stepContent}>
                <Box className={classes.payment}>
                  <PayPalButton
                    amount={tariff?.price}
                    onSuccess={async (details, paymentData) => {
                      await TestMee.orderPromotion({
                        ...tariff,
                        listing_id: listingId
                      })

                      toastr.success(
                        formatMessage(messages['toastr.title']),
                        formatMessage(messages['toastr.message'])
                      )
                      history.push(createLocalizedPath('/dashboard/', locale))
                    }}
                    options={{
                      clientId: process.env.REACT_APP_PAYPAL_API_KEY,
                      currency: 'EUR'
                    }}
                  />
                </Box>
              </StepContent>
            </Step>
          </Stepper>
        </Box>
      </DialogContent>
      <DialogActions>{actionButtons}</DialogActions>
    </Dialog>
  )
}

export default PromoteModal
