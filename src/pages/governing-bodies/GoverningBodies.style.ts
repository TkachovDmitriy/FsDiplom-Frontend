import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      wrapperRecentlyCars: {
        marginBottom: 100,
        [theme.breakpoints.down('xs')]: {
          marginBottom: 50
        }
      },
      titleBg: {
        color: theme.palette.primary.main,
        background: theme.palette.secondary.main,
        [theme.breakpoints.down('xs')]: {
          display: 'block'
        }
      },
      heading: {
        fontSize: theme.typography.pxToRem(25),
        fontWeight: theme.typography.fontWeightBold
      }
    }),
  {
    name: 'Home'
  }
)

export default useStyle
