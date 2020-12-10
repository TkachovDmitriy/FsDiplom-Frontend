import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        background: '#FFF',
        borderRadius: 4,
        '&:not(:last-child)': {
          marginBottom: '20px'
        },
        [theme.breakpoints.down('sm')]: {
          border: '1px solid #BBC0C4'
        }
      },
      textTransform: {
        textTransform: 'none'
      },
      driveDateContainer: {
        padding: 15,
        background: theme.palette.primary.main,
        [theme.breakpoints.down('sm')]: {
          width: '100%'
        }
      },
      driveDateInfo: {
        marginLeft: 10,
        color: '#FFF'
      },
      driveDateIcon: {
        padding: 10,
        background: '#FFF',
        borderRadius: 4,
        [theme.breakpoints.down('sm')]: {
          margin: 'auto'
        },

        '& svg': {
          display: 'block'
        }
      },
      grid: {
        display: 'flex',
        alignItems: 'center',
        padding: 20
      }
    }),
  {
    name: 'TestDriveCard'
  }
)

export default useStyle
