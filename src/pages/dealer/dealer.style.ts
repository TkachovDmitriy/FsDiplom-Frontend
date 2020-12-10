import { makeStyles, createStyles, Theme } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {},
      dealerName: {
        fontWeight: 'bold',
        wordBreak: 'break-word'
      }
    }),
  {
    name: 'Dealer'
  }
)

export default useStyle
