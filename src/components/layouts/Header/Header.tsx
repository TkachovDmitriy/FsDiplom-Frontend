import React from 'react'

import Desktop from '~/containers/Desktop'
import Mobile from '~/containers/Mobile.tsx'

import HeaderDesktop from './Header.desktop'
import HeaderMobile from './Header.mobile'

const Header: React.FC = (): JSX.Element => {
  return (
    <>
      <Desktop>
        <HeaderDesktop />
      </Desktop>

      <Mobile>
        <HeaderMobile />
      </Mobile>
    </>
  )
}

export default Header
