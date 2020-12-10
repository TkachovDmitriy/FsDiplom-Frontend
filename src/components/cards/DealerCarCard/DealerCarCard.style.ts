import { makeStyles, createStyles, Theme } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      content: {
        padding: '20px !important'
      },
      mobileView: {
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column'
        }
      },
      button: {
        display: 'inline-flex',
        width: 200,

        [theme.breakpoints.down('md')]: {
          width: 120
        },
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          minHeight: 30,
          padding: '8px 20px'
        }
      }
    }),
  {
    name: 'DealerCarCard'
  }
)

export default useStyle
