import React from 'react'
import { useHistory } from 'react-router'
import { PayPalButton } from 'react-paypal-button-v2'

import { createLocalizedPath } from '~/utils/localizedPath'

import TestMee from '~/services/TestMee'
import ErrorHandler from '~/utils/errorHandler'

interface PaymentButtonProps {
  test_price: number
  date: string
  time: string
  carId: string
  locale: string
}

const PaymentButton = ({
  test_price,
  date,
  time,
  carId,
  locale
}: PaymentButtonProps) => {
  const history = useHistory()
  return (
    <PayPalButton
      style={{ width: '100%' }}
      amount={test_price || 0.01}
      onError={(error) => console.log('error', error)}
      onSuccess={async (details, paymentData) => {
        try {
          await TestMee.createOrder({
            date,
            time,
            orderable: paymentData.orderID,
            price: test_price,
            listing_id: carId
          })

          history.push(createLocalizedPath('/congratulation', locale))
        } catch (error) {
          throw new ErrorHandler(error)
        }
      }}
      options={{
        clientId: process.env.REACT_APP_PAYPAL_API_KEY,
        currency: 'EUR'
      }}
    />
  )
}
export default PaymentButton
