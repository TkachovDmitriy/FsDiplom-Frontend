import React, { FC } from 'react'
import {
  Box,
  Button,
  Divider,
  Grid,
  BoxProps,
  useMediaQuery
} from '@material-ui/core'
import moment from 'moment'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { FormattedMessage, useIntl } from 'react-intl'
import { Skeleton } from '@material-ui/lab'
import { useDispatch } from 'react-redux'
import cx from 'classnames'

import { Text, Flexbox, ListItem } from '~/components/shared'
import BlockHeader from '~/components/BlockHeader'
import NoData from '~/components/shared/NoData'
import ConfirmationModal from '~/components/dialogs/ConfirmationModal'

import { ReactComponent as TestDrive } from '~/assets/icons/testDrive.svg'
import { ReactComponent as TestDriveCancelled } from '~/assets/icons/testDriveCancelled.svg'
import { ReactComponent as TestDrivePassed } from '~/assets/icons/testDrivePassed.svg'
import { Order } from '~/model/Order'
import { updateOrder } from '~/state/modules/orders'
import { formatCurrency } from '~/utils/functions'

import useStyle from './TestDriveCardStyle'
import mg from './TestDriveCard.messages'
import sharedMg from '~/i18n/messages/shared'
import cardType from './enums'
import PDFMarkdown from '~/pdf'

import theme from '~/theme'

interface TestDriveCardProps extends BoxProps {
  testDriveData: Order[]
  type: cardType.cancelled | cardType.passed | cardType.upcoming
  role?: 'dealer' | 'client'
  confirmation?: boolean
  loading?: boolean
}

const titleKeys = {
  [cardType.upcoming]: 'upcoming',
  [cardType.passed]: 'passed',
  [cardType.cancelled]: 'cancelled'
}

const opacityClass = {
  [cardType.upcoming]: 'iconUpcomin',
  [cardType.passed]: 'iconPassed',
  [cardType.cancelled]: 'iconCancelled'
}

const placeholder = new Array(1).fill({})

const TestDrivaCard: FC<TestDriveCardProps> = ({
  testDriveData,
  type,
  role = 'dealer',
  confirmation,
  loading,
  ...rest
}): JSX.Element => {
  const dispatch = useDispatch()
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isClient = role === 'client'

  const data: Order[] = loading ? placeholder : testDriveData

  const disableConfirmBtn = (time, date) => {
    const dateNow = moment().format('YYYY-MM-DD')
    const timeNow = moment().format('HH')

    const bookedTime = moment(time).utc().format('HH')

    if (moment(dateNow).isBefore(date)) return true
    if (moment(dateNow).isSame(date) && +timeNow < +bookedTime) return true

    return false
  }

  const handleUpdateStatus = (id, status): void => {
    dispatch(updateOrder({ id, status }))
  }

  return (
    <Box mt={1.5} {...rest}>
      <BlockHeader translateMessageObj={mg[titleKeys[type]]} mt={0} />
      {!!isClient && type === cardType.upcoming && (
        <Box mb={isMobile ? 1 : 2} mt={isMobile ? 1 : -6}>
          <Text textAlign="right" style={{ color: '#BBC0C4' }}>
            <FormattedMessage {...mg.passedCar} />
          </Text>
        </Box>
      )}
      {data.length ? (
        data.map(
          (
            {
              id,
              brand,
              model,
              price,
              date,
              time,
              listing_id,
              orderable_id,
              orderable_name,
              dealer_id,
              dealer_name
            },
            index
          ) => (
            <Grid container key={index} className={classes.root}>
              <Grid xs={12} md={3} item>
                <Flexbox
                  className={cx(
                    classes.driveDateContainer,
                    classes[opacityClass[type]]
                  )}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    className={classes.driveDateIcon}
                  >
                    {cardType.upcoming === type ? (
                      <TestDrive />
                    ) : cardType.passed === type ? (
                      <TestDrivePassed />
                    ) : (
                      <TestDriveCancelled />
                    )}
                  </Box>
                  <Box className={classes.driveDateInfo} width="100%">
                    <Text>
                      <FormattedMessage {...mg['testDriveData']} />
                    </Text>
                    <Text fontSize={20}>
                      {loading ? (
                        <Skeleton
                          style={{ background: 'white' }}
                          width="100%"
                        />
                      ) : (
                        `${moment(date).format('DD MMMM YYYY')} ${moment
                          .utc(time)
                          .format('HH:mm')}`
                      )}
                    </Text>
                  </Box>
                </Flexbox>
              </Grid>
              <Grid item xs={12} md={7} className={classes.grid}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <ListItem
                      className={classes.lineClamp}
                      translateObj={mg.car}
                      link
                      to={`/all-cars/${listing_id}`}
                    >
                      {loading ? (
                        <Skeleton width="100px" />
                      ) : (
                        `${brand} ${model}`
                      )}
                    </ListItem>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <ListItem
                      translateObj={mg.price}
                      className={classes.lineClamp}
                    >
                      {loading ? (
                        <Skeleton width="100px" />
                      ) : price !== 0 ? (
                        `${formatCurrency(price)} ${formatMessage(
                          sharedMg.vat
                        )}`
                      ) : (
                        `${formatMessage(mg.free)}`
                      )}
                    </ListItem>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <ListItem
                      className={classes.lineClamp}
                      translateObj={isClient ? mg.client : mg.dealer}
                      link={!isClient}
                      to={`/dealer/${isClient ? orderable_id : dealer_id}`}
                    >
                      {loading ? (
                        <Skeleton width="100px" />
                      ) : (
                        <Text>{isClient ? orderable_name : dealer_name}</Text>
                      )}
                    </ListItem>
                  </Grid>
                </Grid>
              </Grid>
              {!(type === cardType.cancelled) && (
                <Grid item xs={12} md={2} className={classes.grid}>
                  <Box
                    display="flex"
                    pb={0}
                    width="100%"
                    justifyContent="flex-end"
                  >
                    {type === cardType.upcoming && role === 'dealer' && (
                      <ConfirmationModal
                        onConfirm={(): void =>
                          handleUpdateStatus(id, 'canceled')
                        }
                        translateKey="bookingCancellation"
                      >
                        <Button disabled={loading}>
                          <FormattedMessage {...mg['cancel']} />
                        </Button>
                      </ConfirmationModal>
                    )}
                    {type === cardType.upcoming && isClient && confirmation && (
                      <Button
                        className={classes.confirmBtn}
                        variant="contained"
                        color="secondary"
                        disableElevation
                        disabled={loading || disableConfirmBtn(time, date)}
                        onClick={(): void => handleUpdateStatus(id, 'paid')}
                      >
                        <FormattedMessage {...mg['confirm']} />
                      </Button>
                    )}
                    {type === cardType.passed && role === 'dealer' && (
                      <PDFDownloadLink
                        className={classes.getCoupon}
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
                        fileName={`${brand}_${model}_${moment(date).format(
                          'L'
                        )}_${moment(time).format('HH:mm')}.pdf`}
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
                    )}
                  </Box>
                </Grid>
              )}
            </Grid>
          )
        )
      ) : (
        <NoData height="80" />
      )}
      <Divider className={classes.divider} />
    </Box>
  )
}

export default TestDrivaCard
