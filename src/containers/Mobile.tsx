import { useTheme, useMediaQuery } from '@material-ui/core'

const Mobile = ({
  children
}: {
  children: JSX.Element
}): JSX.Element | null => {
  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return isMobile ? children : null
}

export default Mobile
