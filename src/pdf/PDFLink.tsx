import React, { ReactElement, memo } from 'react'
import { Button } from '@material-ui/core'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import isEqual from 'lodash.isequal'

import { Text } from '~/components/shared'
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFMarkdown from './PDFMarkdown.component'

import useStyle from '../components/cards/TestDriveCard/TestDriveCardStyle'
import mg from '../components/cards/TestDriveCard/TestDriveCard.messages'
import Loader from '~/components/shared/Loader'

interface Props {
  brand: string
  model: string
  orderable_name: string
  price: number
  date: string
  time: string
  loading: boolean
}

const Link = ({
  brand,
  model,
  time,
  orderable_name,
  price,
  date,
  loading
}: Props): ReactElement => {
  const classes = useStyle()
  return (
    <PDFDownloadLink
      document={
        <PDFMarkdown
          brand={brand}
          model={model}
          orderable_name={orderable_name}
          price={price}
          date={date}
          time={time}
          loading={loading}
        />
      }
      fileName={`${brand}_${model}_${moment(date).format('L')}_${moment(
        time
      ).format('HH:mm')}.pdf`}
    >
      {() => (
        <Button
          className={classes.getCoupon}
          variant="contained"
          color="secondary"
          disableElevation
          disabled={loading}
        >
          <Text component="span" fontSize={18}>
            <FormattedMessage {...mg['getACoupon']} />
          </Text>
        </Button>
      )}
    </PDFDownloadLink>
  )
}

export const PDFLink = memo(Link, (prevProps, newProps) => {
  if (isEqual(prevProps, newProps)) return true

  return false
})
