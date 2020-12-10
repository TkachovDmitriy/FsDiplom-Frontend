import React, { FC } from 'react'
import { Box, BoxProps } from '@material-ui/core'

import FullOnMobile from '~/components/layouts/FullOnMobile'

import useStyle from './Frame.style'
import { boolean, number } from 'yup'

interface FrameProps extends BoxProps {
  mobileTight?: boolean
  padding?: number | { xs?: number; md?: number }
  shadow?: number
  hover?: number
}

const Frame: FC<FrameProps> = ({
  padding,
  mobileTight,
  children,
  shadow,
  hover,
  ...rest
}): JSX.Element => {
  const classes = useStyle({ shadow, hover })
  return mobileTight ? (
    <Box p={padding ? padding : 2.5} {...rest} className={classes.root}>
      {children}
    </Box>
  ) : (
    <FullOnMobile>
      <Box p={padding ? padding : 2.5} {...rest} className={classes.root}>
        {children}
      </Box>
    </FullOnMobile>
  )
}

export default Frame
