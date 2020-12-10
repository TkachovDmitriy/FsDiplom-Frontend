import React, { FC } from 'react'
import { useIntl } from 'react-intl'

import Banner from '~/components/layouts/Banner'

import heroImage from '~/assets/images/home/page-title.png'

import mg from '../home.messages'

const HeroBlock: FC = ({ children }): JSX.Element => {
  const { formatMessage } = useIntl()

  return (
    <Banner title={formatMessage(mg['heroTitle'])} imgSrc={heroImage}>
      {children}
    </Banner>
  )
}

export default HeroBlock
