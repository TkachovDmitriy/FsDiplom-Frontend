import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        background: '#FFF',
        borderRadius: 4,
        border: '1px solid #BDBDBD',
        overflow: 'hidden',
        '&:not(:last-child)': {
          marginBottom: '20px'
        },
        [theme.breakpoints.down('sm')]: {
          border: '1px solid #BBC0C4'
        }
      },
      driveDateContainer: {
        height: '100%',
        padding: 15,
        background: theme.palette.primary.main,
        [theme.breakpoints.down('sm')]: {
          width: '100%'
        }
      },
      driveDateIcon: {
        padding: 10,
        background: '#FFF',
        borderRadius: 4,

        '& svg': {
          display: 'block'
        }
      },
      grid: {
        display: 'flex',
        alignItems: 'center',
        padding: 20
      },
      iconUpcomin: {
        background: '#2B2929'
      },
      iconPassed: {
        background: '#64696C'
      },
      iconCancelled: {
        background: '#BBC0C4'
      },
      driveDateInfo: {
        marginLeft: 10,
        color: '#FFF'
      },
      groupBtn: {
        margin: '15px 0',
        alignSelf: 'center',
        [theme.breakpoints.down('sm')]: {
          width: '90%'
        }
      },
      cancelBtn: {
        textDecoration: 'underline',
        [theme.breakpoints.down('sm')]: {
          width: '100%'
        }
      },
      getCoupon: {
        [theme.breakpoints.down('sm')]: {
          width: '100%'
        }
      },
      confirmBtn: {
        width: 'auto',
        [theme.breakpoints.down('sm')]: {
          width: '100%'
        },
        fontSize: 18
      },
      carDetails: {
        height: '100%',
        padding: 15,
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column'
        },

        '& > * + *': {
          marginLeft: theme.spacing(5),
          [theme.breakpoints.down('sm')]: {
            marginTop: 10,
            marginLeft: 0
          }
        }
      },
      divider: {
        marginTop: 30
      },
      lineClamp: {
        display: '-webkit-box',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden'
      }
    }),
  {
    name: 'TestDriveCard'
  }
)

export default useStyle
