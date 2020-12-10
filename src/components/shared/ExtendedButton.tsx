import React from 'react'
import { Button, ButtonProps, CircularProgress } from '@material-ui/core'

type Props = {
  children: string | JSX.Element | JSX.Element[] | React.ReactNode
  loading: boolean
}

const ExtendedButton: React.FC<Props & ButtonProps> = ({
  children,
  loading,
  ...props
}) => (
  <Button size="large" variant="contained" color="primary" fullWidth {...props}>
    {loading ? <CircularProgress color="primary" size={26} /> : children}
  </Button>
)

export default ExtendedButton
