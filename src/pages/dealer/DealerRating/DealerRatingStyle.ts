import { makeStyles, Theme, createStyles } from '@material-ui/core'

export const useStyleDesktop = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        overflow: 'auto',
        background: '#FFF',
        borderRadius: 4,
        border: '1px solid #BBC0C4'
      },
      header: {
        background: theme.palette.primary.main,
        color: '#FFF',
        [theme.breakpoints.down('md')]: {
          '& > * ': {
            fontSize: 14
          }
        },
        '&  h6 a ': {
          color: '#fff'
        },
        padding: '12px 20px'
      },
      ratingContainer: {
        textAlign: 'center',
        marginBottom: 20
      }
    }),
  {
    name: 'DealerRatingDesktop'
  }
)

export const useStyleMobile = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        background: '#FFF',
        [theme.breakpoints.down('sm')]: {
          position: 'fixed',
          bottom: 0,
          width: '100%',
          zIndex: 1,
          border: '1px solid #BBC0C4'
        }
      },
      ratingContainer: {
        fontSize: 14,
        marginLeft: 5
      }
    }),
  {
    name: 'DealerRatingMobile'
  }
)
