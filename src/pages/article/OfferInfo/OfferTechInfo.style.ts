import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {},
      dealerInfoHead: {
        flexDirection: 'column-reverse',

        [theme.breakpoints.up('md')]: {
          flexDirection: 'row'
        }
      },
      infoText: {
        color: theme.palette.text.secondary
      },
      column: {
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto 1fr',
        gridColumnGap: 20,
        [theme.breakpoints.down('md')]: {
          gridTemplateColumns: 'fit-content(40%) auto'
        }
      }
    }),
  {
    name: 'OfferTechInfo'
  }
)

export default useStyle
