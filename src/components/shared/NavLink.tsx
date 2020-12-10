import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import { Link, LinkProps } from '@material-ui/core'

import { useLocalizedPath } from '~/utils/localizedPath'

type Props = LinkProps & NavLinkProps

const Navlink: React.FC<Props> = ({ children, to, ...props }) => {
  const path = useLocalizedPath(to.toString())

  return (
    <Link component={NavLink} to={path} {...props}>
      {children}
    </Link>
  )
}

export default Navlink
