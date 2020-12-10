import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {}
    }),
  {
    name: 'CarsSearch'
  }
)

export default useStyle
