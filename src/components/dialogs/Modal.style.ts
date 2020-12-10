import { makeStyles, Theme, createStyles } from '@material-ui/core'

export const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {},
      datePickerBtn: {
        position: 'absolute',
        top: '1%',
        right: '2%'
      },
      card: {
        [theme.breakpoints.down('sm')]: {
          height: 100
        },
        minHeight: 100,
        height: 200,
        maxHeight: 200,
        '& img': {
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }
      },
      muiPaper: {
        padding: '20px 0',
        zIndex: '2080 !important' as any,
        '& .MuiDialogContent-root': {
          padding: 20
        },
        ' & .MuiDialog-paperWidthSm': {
          maxWidth: '1200px'
        }
      },
      paper: {
        paddingTop: '20px',
        zIndex: `${1302} !important` as any,

        '& .MuiDialog-paper': {
          margin: '0'
        }
      }
    }),
  {
    name: 'ModalBtn'
  }
)

export const useReviewStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        [theme.breakpoints.down('sm')]: {
          margin: '0 auto',
          marginTop: 20,
          height: '100vh'
        },
        '& .MuiGrid-item': {
          width: '100%'
        },
        '& > div': {
          [theme.breakpoints.up('sm')]: {
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            '& > * + *': {},
            minWidth: 400
          }
        }
      },
      actionDialog: {
        width: '100%',
        height: '100%'
      },
      container: {
        marginLeft: '0 !important'
      },
      viewModal: {
        zIndex: `${1302} !important` as any,
        '& .MuiDialog-paper': {
          margin: '0'
        },
        '& .MuiDialogContent-root': {
          [theme.breakpoints.down('sm')]: {
            padding: 8
          }
        },
        '& .MuiDialog-paperScrollPaper': {
          maxHeight: '100%',
          maxWidth: '100%',
          [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '100%'
          },
          overflowX: 'hidden',
          borderRadius: 0
        },
        '& .MuiPickersStaticWrapper-root': {
          minWidth: '300px'
        },
        '& .MuiPickersBasePicker-pickerView': {
          minWidth: '300px'
        }
      }
    }),
  {
    name: 'Reviews'
  }
)
