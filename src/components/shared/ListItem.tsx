import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'

import { Text, Link } from '~/components/shared'
import { Box } from '@material-ui/core'

interface ListItemProps {
  translateObj?: {}
  label?: string
  link?: boolean
  to?: string
  className?: string
  textTransform?: string
}

const ListItem: FC<ListItemProps> = ({
  translateObj,
  label,
  link,
  to,
  className,
  children,
  textTransform
}): JSX.Element => {
  return (
    <Box display="inline-flex">
      <Text
        variant="body1"
        textTransform={textTransform || null}
        color="textSecondary"
        mr={1}
      >
        {label && label}
        {translateObj && <FormattedMessage {...translateObj} />}
      </Text>
      <Text variant="body1" color="textPrimary" className={className}>
        {link ? <Link to={to}>{children}</Link> : children}
      </Text>
    </Box>
  )
}

export default ListItem
