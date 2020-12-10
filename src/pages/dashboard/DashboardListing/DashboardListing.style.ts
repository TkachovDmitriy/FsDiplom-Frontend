import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    myCar: {
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
        alignItems: 'start'
      }
    },
    sortWraper: {
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center'
      }
    },
    boxInput: {
      '&:focus': {
        outline: 'none'
      },
      '& .MuiFormControl-root': {
        width: 100,
        '&:focus': {
          outline: 'none'
        }
      }
    },

    selectMobile: {
      background: 'inherit',
      border: 0,
      '& .MuiSelect-select': {
        padding: '10px 16px 10px 5px'
      },
      borderColor: 'transparent',
      '&:focus': {
        outline: 'none',
        border: 0
      },

      '& fieldset': {
        padding: '10px 0',
        borderColor: 'transparent',
        '&:focus': {
          outline: 'none'
        }
      }
    },
    sort: {
      [theme.breakpoints.down('sm')]: {
        margin: '20px 0'
      }
    }
  })
)

export default useStyle
