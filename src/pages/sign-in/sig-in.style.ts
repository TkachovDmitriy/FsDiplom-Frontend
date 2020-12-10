import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      signButon: {
        border: '1px solid #BBC0C4'
      }
    }),
  {
    name: 'aboutUs'
  }
)

export default useStyle
