import React, { FC, useEffect, useState, useMemo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { Grid, Box, InputLabel, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { Select } from '~/components/shared'
import { Text } from '~/components/shared'
import { DealerCarCard } from '~/components/cards'

import { AppState } from '~/interfaces/redux'
import { Car } from '~/model/Car'

import { sortArray } from '~/utils/functions'
import { loadCars } from '~/state/modules/cars'
import { createLocalizedPath } from '~/utils/localizedPath'

import useStyle from './DashboardListing.style'
import Desktop from '~/containers/Desktop'
import Mobile from '~/containers/Mobile'

import mg from '~/pages/all-cars/CarsFilter/CarsFilter.messages'
import allNews from '../../../data/mocks/allNews'
import { BookCarCardProps } from '../../../components/cards/BookCarCard/BookCarCard'

const scope = 'pages.dashboard.listing'

const DashboardListing: FC = ({}): JSX.Element => {
  const dispatch = useDispatch()
  const [sort, setSort] = useState<string>('asc')
  const classes = useStyle()
  const { locale, formatMessage } = useIntl()
  useEffect(() => {
    // dispatch(loadCars())
  }, [])

  const cars = allNews

  // TODO: move sorting to reducer
  const sortedCars = useMemo(() => {
    return sortArray([...cars], {
      key: 'test_price',
      asc: sort === 'asc'
    }) as BookCarCardProps[]
  }, [cars, sort])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box className={classes.myCar} display="flex">
          <Box display="flex" alignItems="center" flex={1}>
            <Text noWrap variant="h3">
              Статi
            </Text>
          </Box>
          <Box className={classes.sortWraper} display="flex">
            <Desktop>
              <>
                <Box
                  className={classes.sort}
                  display="flex"
                  alignItems="center"
                >
                  <InputLabel>
                    <Text color="textPrimary">Сортувати по:</Text>
                  </InputLabel>
                  <Box mx={2}>
                    <Select
                      size="small"
                      options={[
                        {
                          value: 'asc',
                          label: formatMessage(mg.priceAscending)
                        },
                        {
                          value: 'desc',
                          label: formatMessage(mg.priceDescending)
                        }
                      ]}
                      value={sort}
                      // @ts-ignore
                      onChange={setSort}
                      controlled={false}
                    />
                  </Box>
                </Box>

                <Button
                  style={{ width: 200, fontSize: 18 }}
                  size="large"
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to={createLocalizedPath('/dashboard/new-article', locale)}
                >
                  Додати статьтю
                </Button>
              </>
            </Desktop>

            <Mobile>
              <Box mx={2} mb={2} className={classes.boxInput}>
                <Select
                  className={classes.selectMobile}
                  size="small"
                  options={[
                    {
                      value: 'asc',
                      label: formatMessage(mg.priceAscending)
                    },
                    {
                      value: 'desc',
                      label: formatMessage(mg.priceDescending)
                    }
                  ]}
                  value={sort}
                  // @ts-ignore
                  onChange={setSort}
                  controlled={false}
                />
              </Box>
            </Mobile>
          </Box>
        </Box>
        <Mobile>
          <Button
            style={{ width: '100%' }}
            size="large"
            variant="contained"
            color="secondary"
            component={Link}
            to={createLocalizedPath('/dashboard/new-article', locale)}
          >
            Додати статьтю
          </Button>
        </Mobile>
      </Grid>
      {sortedCars.length ? (
        sortedCars?.map((car) => (
          <Grid key={car.id} item xs={12}>
            <DealerCarCard {...car} />
          </Grid>
        ))
      ) : (
        <Box
          display="flex"
          width="100%"
          height={100}
          justifyContent="center"
          alignItems="center"
        >
          <Text color="textSecondary" fontSize="18">
            No data
          </Text>
        </Box>
      )}
    </Grid>
  )
}

export default DashboardListing
