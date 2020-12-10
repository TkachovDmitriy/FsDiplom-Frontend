import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {},
      paginationBox: {
        [theme.breakpoints.down('sm')]: {
          marginBottom: '20px'
        }
      }
    }),
  {
    name: 'AllCars'
  }
)

export default useStyle
