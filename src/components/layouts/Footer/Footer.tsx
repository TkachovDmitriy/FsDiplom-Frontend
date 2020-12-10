import React from 'react'

import Desktop from '~/containers/Desktop'
import Mobile from '~/containers/Mobile'

import FooterDesktop from './Footer.desktop'
import FooterMobile from './Footer.mobile'

const Footer: React.FC = () => {
  return (
    <>
      <Desktop>
        <FooterDesktop />
      </Desktop>
      <Mobile>
        <FooterMobile />
      </Mobile>
    </>
  )
}

export default Footer
