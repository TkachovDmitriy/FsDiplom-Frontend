import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Text } from '~/components/shared'
import { BoxProps } from '@material-ui/core'

interface BlockHeaderProps extends BoxProps {
  marginTop?: number
  marginBottom?: number
  translateMessageObj: string | any
}

const BlockHeader: FC<BlockHeaderProps> = ({
  translateMessageObj,
  marginTop,
  marginBottom,
  ...rest
}): JSX.Element => (
  <Text
    variant="h3"
    mt={marginTop ? marginTop : 7.5}
    mb={marginBottom ? marginBottom : 2.5}
    {...rest}
  >
    {translateMessageObj}
  </Text>
)

export default BlockHeader
