import { useTheme, useMediaQuery } from '@material-ui/core'

const Desktop = ({
  children
}: {
  children: JSX.Element
}): JSX.Element | null => {
  const theme = useTheme()

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  return isDesktop ? children : null
}

export default Desktop
