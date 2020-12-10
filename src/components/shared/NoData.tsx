import React, { FC } from 'react'
import { Box, BoxProps } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'

import Text from './Text'

const NoData: FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box
      display="flex"
      width="100%"
      height={100}
      justifyContent="center"
      alignItems="center"
      {...rest}
    >
      <Text color="textSecondary" fontSize="18">
        {!!React.Children.count(children) ? (
          children
        ) : (
          <FormattedMessage
            id="components.shared.NoData.noData"
            defaultMessage="No data"
          />
        )}
      </Text>
    </Box>
  )
}

export default NoData
