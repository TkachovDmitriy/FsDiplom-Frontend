import React, { FC, useCallback, useMemo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { change, Field, initialize, reset } from 'redux-form'
import { useDispatch } from 'react-redux'
import { Box, Button, IconButton } from '@material-ui/core'

import { Flexbox, Text } from '~/components/shared'
import Frame from '~/components/frame'
import Desktop from '~/containers/Desktop'
import Mobile from '~/containers/Mobile'

import { SearchCars } from '~/model/SearchCars'

import { ReactComponent as CloseIcon } from '~/assets/icons/close.svg'

import useStyle from './CarsFilterStyle'
import mg from './CarsFilter.messages'
import SelectField from '~/components/fields/SelectField'

import { INITIAL_SEARCH_STATE } from '~/constants/index'

interface CarsFilterProps {
  filters: SearchCars
  form: string
  dealerNames: { value: string; label: string }[]
}

const CarsFilter: FC<CarsFilterProps> = ({
  filters = {},
  form,
  dealerNames,
  children
}) => {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const dispatch = useDispatch()

  const sortByDesktop = [
    { value: 'newest', label: formatMessage(mg.newest) },
    { value: 'oldest', label: formatMessage(mg.oldest) },
    { value: 'price_low_to_high', label: formatMessage(mg.priceAscending) },
    { value: 'price_high_to_low', label: formatMessage(mg.priceDescending) }
  ]

  const appliedFilter = {
    ...filters,
    page: null,
    by_dealer: dealerNames.find(({ value }) => +value === +filters.by_dealer)
      ?.label
  }

  const clearField = useCallback(
    (field) => {
      dispatch(change(form, field, null))
    },
    [form]
  )

  const clearAllFields = useCallback(() => {
    dispatch(
      initialize(form, {
        ...INITIAL_SEARCH_STATE
      })
    )
    dispatch(reset(form))
  }, [form])

  const values = useMemo(
    () => Object.entries(appliedFilter).filter(([_key, value]) => !!value),
    [appliedFilter]
  )

  return (
    <>
      <Frame minHeight={60} padding={{ xs: 1.25, md: 2.5 }}>
        <Desktop>
          <Flexbox alignItems="center">
            <Text variant="body1" mr={1.25}>
              <FormattedMessage {...mg['sortBy']} />:
            </Text>
            <Field
              id="sorting"
              name="sorting"
              options={sortByDesktop}
              component={SelectField}
              onBlur={(): void => {
                return
              }}
              size="small"
            />
          </Flexbox>
        </Desktop>
        {!!values.length && (
          <Flexbox px={{ xs: 1.25, md: 0 }} mt={{ xs: 0, md: 2.5 }}>
            {values?.map(([key, value]) => (
              <Flexbox
                alignItems="baseline"
                key={key}
                className={classes.filterParam}
              >
                <Text whiteSpace="noWrap">{value}</Text>
                <Box ml={1}>
                  <IconButton
                    onClick={(): void => clearField(key)}
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Flexbox>
            ))}
            <Mobile>
              <Box minWidth={10} height={20}></Box>
            </Mobile>

            <Desktop>
              <Button
                className={classes.clearButton}
                disableElevation
                disableFocusRipple
                disableRipple
                onClick={clearAllFields}
              >
                <FormattedMessage {...mg['clearAll']} />
              </Button>
            </Desktop>
          </Flexbox>
        )}
      </Frame>
      <Mobile>
        <>
          <Box textAlign="center">
            <Button
              className={classes.clearButton}
              disableElevation
              disableFocusRipple
              disableRipple
              onClick={clearAllFields}
            >
              <FormattedMessage {...mg['clearAllFilters']} />
            </Button>
          </Box>
          <Flexbox mt={3.75} justifyContent="space-between">
            <Box width={100}>
              <Field
                id="sorting"
                name="sorting"
                placeholder="Sort by"
                options={sortByDesktop}
                component={SelectField}
                className={classes.mobileSelect}
                onBlur={(): void => {
                  return
                }}
                size="small"
              />
            </Box>
            {children}
          </Flexbox>
        </>
      </Mobile>
    </>
  )
}

export default CarsFilter
