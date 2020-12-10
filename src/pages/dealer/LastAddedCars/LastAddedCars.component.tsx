import React, { FC } from 'react'
import { useHistory } from 'react-router'
import { useIntl } from 'react-intl'

import Frame from '~/components/frame'
import BlockHeader from '~/components/BlockHeader'
import BookCarCard from '~/components/cards/BookCarCard'
import RightSideBtn from '~/components/RightSideBtn'
import { Text } from '~/components/shared'
import FullOnMobile from '~/components/layouts/FullOnMobile'
import { createLocalizedPath } from '~/utils/localizedPath'

import mg from './LastAddedCars.messages'
import { Car } from '~/model/Car'

interface LastAddedCars {
  cars?: Car[]
  loading?: boolean
  dealer_id?: string
}

const placeholder = new Array(2).fill({})

const LastAddedCars: FC<LastAddedCars> = ({
  cars,
  dealer_id,
  loading
}): JSX.Element => {
  const history = useHistory()
  const { locale } = useIntl()

  return (
    <>
      <Text>
        <BlockHeader translateMessageObj={mg['lastAddedTitle']} />
      </Text>
      <FullOnMobile>
        <Frame>
          {(cars || placeholder).map((car, index) => (
            <BookCarCard loading={loading} key={car?.id || index} {...car} />
          ))}
          <RightSideBtn
            onClick={() =>
              history.push(
                createLocalizedPath(`/all-cars?by_dealer=${dealer_id}`, locale)
              )
            }
            translateObj={mg['seeAll']}
          />
        </Frame>
      </FullOnMobile>
    </>
  )
}

export default LastAddedCars
