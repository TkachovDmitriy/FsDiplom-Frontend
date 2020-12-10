import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    toggleButtonGroup: {
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        whiteSpace: 'nowrap',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          width: 0
        }
      }
    },
    toggleButtonRoot: {
      fontSize: 18,
      fontFamily: 'Cabin, Arial',
      textTransform: 'none',
      width: '100%',
      background: `${theme.palette.common.white} `,
      marginLeft: '0 !important',
      [theme.breakpoints.down('sm')]: {
        marginTop: '0 !important'
      }
    },
    toggleButtonSelected: {
      background: `${theme.palette.secondary.main} !important`,
      color: `${theme.palette.text.primary} !important`
    }
  })
)

export default useStyle
