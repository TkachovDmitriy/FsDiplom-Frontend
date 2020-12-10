import React from 'react'
import { FormattedMessage } from 'react-intl'
import { CircularProgress, Box } from '@material-ui/core'

import Text from '../shared/Text'

import mg from './confirmation.messages'

const Confirmation: React.FC = (): JSX.Element => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      flex={1}
    >
      <CircularProgress size={60} />
      <Text variant="h4" mt={4} mb={1}>
        <FormattedMessage {...mg.title} />
      </Text>
      <Text variant="subtitle1" color="textSecondary">
        <FormattedMessage {...mg.subtitle} />
      </Text>
    </Box>
  )
}

export default Confirmation
