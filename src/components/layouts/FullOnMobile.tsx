import React, { FC } from 'react'
import { useTheme, useMediaQuery } from '@material-ui/core'

import ContainerFull from '~/components/layouts/ContainerFull'

const FullOnMobile: FC = ({ children }): JSX.Element => {
  const theme = useTheme()

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  return isDesktop ? (
    <>{children}</>
  ) : (
    <ContainerFull> {children} </ContainerFull>
  )
}

export default FullOnMobile
