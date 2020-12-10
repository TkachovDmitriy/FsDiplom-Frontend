import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      reviewText: {
        color: theme.palette.text.primary
      },
      star: {
        color: theme.palette.text.primary
      },
      reviewTop: {
        flexDirection: 'column',

        [theme.breakpoints.up('md')]: {
          flexDirection: 'row'
        }
      },
      reviewBtn: {
        width: '100%',
        minWidth: '180px',

        [theme.breakpoints.up('md')]: {
          width: 'auto'
        }
      }
    }),
  {
    name: 'Reviews'
  }
)

export default useStyle
