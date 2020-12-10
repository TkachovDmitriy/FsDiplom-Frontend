import React from 'react'
import { Container, makeStyles, createStyles, Theme } from '@material-ui/core'

import Header from './Header'
import Footer from './Footer'

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      page: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      },

      container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: 0,
        marginBottom: 30,
        [theme.breakpoints.down('sm')]: {
          marginTop: 0,
          marginBottom: 30
        }
      }
    }),
  { name: 'AppLayout' }
)

const AppLayout: React.FC = ({ children }) => {
  const s = useStyles()

  return (
    <div className={s.page}>
      <>
        <Header />
        <Container component="main" maxWidth="xl" className={s.container}>
          {children}
        </Container>
        <Footer />
      </>
    </div>
  )
}

export default AppLayout
