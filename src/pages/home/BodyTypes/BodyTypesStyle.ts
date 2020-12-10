import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        marginTop: 90,
        marginBottom: 100,
        display: 'none'
      }
    }),
  {
    name: 'BodyType'
  }
)

export default useStyle
