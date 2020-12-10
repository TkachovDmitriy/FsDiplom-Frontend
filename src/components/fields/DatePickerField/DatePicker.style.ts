import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {},
      disableBtn: {
        '& .bookedDate': {
          color: '#000 !important',
          fontWeight: 500,
          backgroundColor: 'rgb(43 41 41 / 35%)'
        }
      }
    }),
  {
    name: 'DatePicker'
  }
)
export default useStyle
