import React from 'react'
import { Link as RouterLink, LinkProps } from 'react-router-dom'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@material-ui/core'

import { useLocalizedPath } from '~/utils/localizedPath'

type Props = MuiLinkProps & LinkProps

const Link: React.FC<Props> = ({ children, to, ...props }) => {
  const path = useLocalizedPath(to.toString())

  return (
    <MuiLink component={RouterLink} to={path} {...props}>
      {children}
    </MuiLink>
  )
}

export default Link
