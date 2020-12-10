import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {},
      offerName: {
        fontStyle: '500',
        fontSize: '36px'
      },
      modalBox: {
        position: 'relative',
        height: 450,
        '& .slick-slider': {
          width: '100vw !important'
        },
        [theme.breakpoints.down('md')]: {
          height: 250
        },
        [theme.breakpoints.up('lg')]: {
          height: 450
        }
      },
      slider: {
        zIndex: 1,
        height: 450,
        '& .slick-slider': {
          width: '100vw !important'
        },
        [theme.breakpoints.down('md')]: {
          height: 250
        },
        [theme.breakpoints.up('lg')]: {
          height: 450
        }
      },
      reviewBtn: {
        width: '100%',
        minWidth: '180px',

        [theme.breakpoints.up('md')]: {
          width: 'auto'
        }
      },
      star: {
        color: theme.palette.text.secondary
      },
      sticky: {
        position: 'fixed',
        top: 0,
        right: 0
      },
      stickyContainer: {
        position: 'relative',
        [theme.breakpoints.down('md')]: {
          display: 'none'
        }
      },
      reviewTop: {
        flexDirection: 'column',

        [theme.breakpoints.up('md')]: {
          flexDirection: 'row'
        }
      },
      infoText: {
        color: theme.palette.text.secondary
      },
      dealerInfoHead: {
        flexDirection: 'column-reverse',

        [theme.breakpoints.up('md')]: {
          flexDirection: 'row'
        }
      },
      column: {
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column'
        }
      },
      dealerInfoGrid: {
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column-reverse'
        }
      }
    }),
  {
    name: 'Offer'
  }
)

export default useStyle
