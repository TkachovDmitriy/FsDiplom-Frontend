import React, { FC, useCallback, useMemo, useEffect } from 'react'
import { compose } from 'redux'
import {
  FormattedMessage,
  useIntl,
  injectIntl,
  WrappedComponentProps
} from 'react-intl'
import {
  reduxForm,
  Form,
  InjectedFormProps,
  Field,
  getFormValues
} from 'redux-form'
import { RouteComponentProps, withRouter } from 'react-router'
import { Box, Button } from '@material-ui/core'
import { useSelector, connect } from 'react-redux'
import moment from 'moment-timezone'

import { AppState } from '~/interfaces/redux'
import { Text, Flexbox, PriceBadge } from '~/components/shared'
import DatePickerField from '~/components/fields/DatePickerField'

import { createLocalizedPath } from '~/utils/localizedPath'
import { DAYS_OF_WEEK, STORAGE } from '~/constants'
import { buildTimeRange } from '~/utils/functions'
import { hasRole } from '~/constants/roles'
import useListing from '~/hooks/useListing'

import { useStyleDesktop } from './OrderForm.style'
import OrderTimeField from './OrderTimeField'

import ms from '~/i18n/messages/fields'

interface OrderFormInput {
  date: string
  time: string
}

type OrderFormProps = {
  disabled?: boolean
  listingId: string | number
  orientation?: 'horizontal' | 'vertical'
}

const OrderForm: FC<OrderFormProps & InjectedFormProps<OrderFormProps>> = ({
  change,
  handleSubmit,
  form,
  disabled,
  listingId,
  orientation = 'vertical'
}) => {
  const isHorizontal = orientation === 'horizontal'
  const classes = useStyleDesktop({ large: isHorizontal })
  const { locale } = useIntl()

  const {
    listing: { dealer, reserved_dates, test_price } = {},
    loading
  } = useListing(listingId)
  const { time, date } = dealer?.opening_hours || {}
  const isDisabled = disabled || loading

  const values = useSelector(
    (state: AppState) => getFormValues(form)(state) as OrderFormInput
  )
  const timeRange = useMemo(() => buildTimeRange(time), [time])

  useEffect(() => {
    change('time', null)
  }, [values?.date])

  const shouldDisableDate = useCallback(
    (d) => {
      if (!date) return true
      const WEEKDAYS = DAYS_OF_WEEK
      const currentDate = moment(d)
      const from = WEEKDAYS[date.from.toLowerCase()]
      const to = WEEKDAYS[date.to.toLowerCase()]
      const weekday = currentDate.day()
      const condition =
        from < to
          ? weekday < from || weekday > to
          : weekday < from && weekday > to

      if (condition) return true

      const reservedDay = reserved_dates.some(([date, times]): boolean => {
        return (
          moment(date).isSame(currentDate, 'day') &&
          times.length === timeRange.length
        )
      })

      if (reservedDay) {
        const day = document.querySelector(
          `[aria-label="${currentDate.format('MMM D, YYYY')}"]`
        )

        if (day) day.classList.add('bookedDate')

        return true
      }
    },
    [date, locale, reserved_dates, timeRange]
  )

  const shouldDisableBookedTime = (time) => {
    const reservedDay = reserved_dates.find(([date]) =>
      moment(date).isSame(values?.date, 'day')
    )
    const [_date, times] = reservedDay || []

    // @ts-ignore
    return times?.map((t) => moment.utc(t).format('H:mm')).includes(time)
  }

  const shouldDisableTime = useCallback(
    (time: string): boolean => {
      const today = moment()

      const reservedDay = reserved_dates.find(([date]) =>
        moment(date).isSame(values?.date, 'day')
      )

      if (today.isSame(values?.date, 'days')) {
        return (
          parseInt(time) <= +today.format('HH') + 1 ||
          shouldDisableBookedTime(time)
        )
      }

      if (reservedDay) return shouldDisableBookedTime(time)

      return false
    },
    [values?.date, reserved_dates]
  )

  const submitButton = (
    <Button
      variant="contained"
      color="secondary"
      disabled={!values?.time}
      disableElevation
      className={classes.submitButton}
      type="submit"
    >
      <Text component="span" fontSize={18} lineHeight="28px">
        <FormattedMessage {...ms['bookDrive']} />
      </Text>
    </Button>
  )

  return (
    <>
      <Box
        component={Form}
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        px={isHorizontal ? 4 : 0}
      >
        <Box
          mb={2}
          display="flex"
          flexDirection={isHorizontal ? 'row' : 'column'}
        >
          <Box
            padding={0}
            className={classes.root}
            mr={isHorizontal ? 2.5 : 0}
            width={isHorizontal ? 420 : '100%'}
          >
            <Flexbox
              className={classes.header}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text variant="subtitle1" fontSize={isHorizontal ? 24 : 18}>
                <FormattedMessage {...ms['price']} />
              </Text>
              <PriceBadge
                size={isHorizontal ? 'large' : 'medium'}
                type="secondary"
                price={test_price || 0}
                className={classes.priceBadge}
              />
            </Flexbox>
            <Field
              name="date"
              id="date"
              component={DatePickerField}
              disabled={isDisabled}
              shouldDisableDate={shouldDisableDate}
              key={locale}
            />
          </Box>
          <Box
            p={2}
            mt={isHorizontal ? 0 : 2}
            height={isHorizontal ? '100%' : 'auto'}
            width={isHorizontal ? 420 : '100%'}
            className={classes.root}
          >
            <Text variant="subtitle2" fontSize={isHorizontal ? 18 : 14}>
              <FormattedMessage {...ms['startDrive']} />
            </Text>
            <Field
              name="time"
              id="time"
              time={time}
              date={values?.date}
              component={OrderTimeField}
              disabled={isDisabled || !values?.date}
              times={timeRange}
              large={isHorizontal}
              shouldDisableBookedTime={shouldDisableBookedTime}
              shouldDisableTime={shouldDisableTime}
            />
            {!isHorizontal && submitButton}
          </Box>
        </Box>
        {isHorizontal && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            {submitButton}
          </Box>
        )}
      </Box>
    </>
  )
}

const makeMapStateToProps = (
  state: AppState
): { role: string; confirmed: boolean } => {
  return {
    role: state.user?.role,
    confirmed: state.user?.confirmed
  }
}

const withConnect = connect(makeMapStateToProps)

const withForm = reduxForm<
  OrderFormInput,
  OrderFormProps &
    RouteComponentProps &
    WrappedComponentProps & { role: string; confirmed: boolean }
>({
  form: 'CarOrderForm',
  shouldAsyncValidate: () => true,
  onSubmit: (
    values,
    _dispatch,
    { history, listingId, role, confirmed, intl: { locale } }
  ) => {
    const { isUser } = hasRole(role)

    const path = createLocalizedPath(
      `/all-cars/${listingId}/payment`,
      locale
    ) as string

    if (confirmed && isUser) {
      history.push(path, {
        ...values,
        date: moment(values.date).format()
      })
    } else {
      localStorage.setItem(STORAGE.redirect, path)
      localStorage.setItem(STORAGE.paymentData, JSON.stringify(values))
      history.push(createLocalizedPath('/sign-in', locale))
    }
  }
})

export default compose<FC<OrderFormProps>>(
  withRouter,
  injectIntl,
  withConnect,
  withForm
)(OrderForm)
