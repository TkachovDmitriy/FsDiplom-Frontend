import React, { FC } from 'react'
import { Box, CircularProgress } from '@material-ui/core'

const Loader: FC = () => {
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  )
}

export default Loader
