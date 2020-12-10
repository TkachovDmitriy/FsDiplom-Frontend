import { makeStyles, Theme, createStyles } from '@material-ui/core'
import { border } from '@material-ui/system'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        background: '#FFF',
        borderRadius: 4,
        overflow: 'auto',
        marginTop: 20,
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          alignItems: 'flex-start',
          border: '1px solid #BBC0C4'
        }
      },
      tooltip: {
        fontSize: 16
      },
      title: {
        fontSize: 25,
        textAlign: 'center',
        padding: 5,
        backgroundColor: '#2B2929',
        color: '#fff'
      },
      carDetails: {
        padding: 15,
        marginLeft: 15,
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
      }
    }),
  {
    name: 'TestDriveCard'
  }
)

export default useStyle
