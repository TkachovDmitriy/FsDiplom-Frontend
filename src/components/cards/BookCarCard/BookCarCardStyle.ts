import { makeStyles, createStyles, Theme } from '@material-ui/core'

interface StyleProps {
  promoted: boolean
}

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        borderRadius: 4,
        background: theme.palette.common.white,
        border: '1px solid #BBC0C4',
        overflow: 'auto',
        position: 'relative'
      },
      badgeContainer: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: theme.palette.secondary.main,
        minWidth: 70,
        fontWeight: 500,
        fontSize: 18,
        zIndex: 1
      },
      detailsButton: {
        background: theme.palette.common.white
      },
      promotedBlock: {
        padding: '5px 10px',
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.main,
        position: 'absolute',
        borderRadius: '4px',
        top: '25px',
        left: '25px',
        [theme.breakpoints.down('xs')]: {
          top: 15,
          left: 15
        }
      },
      imageContainer: {
        position: 'relative',
        height: '100%',
        padding: 15,
        [theme.breakpoints.down('xs')]: {
          padding: 0
        }
      },
      imageCar: {
        height: '220px',
        maxHeight: '220px',
        [theme.breakpoints.up('md')]: {
          borderRadius: 4
        }
      },
      details: {
        display: 'initial',
        marginBottom: 10,

        [theme.breakpoints.up('md')]: {
          display: 'flex'
        },
        [theme.breakpoints.down('sm')]: {
          display: 'block'
        }
      },
      detailItemBlock: {
        display: 'inline',

        '&:first-of-type': {
          [theme.breakpoints.up('md')]: {
            marginRight: 45
          }
        },

        [theme.breakpoints.up('md')]: {
          display: 'block'
        }
      },
      detailItem: {
        margin: 0,
        marginBottom: 6,
        display: 'inline',
        color: theme.palette.text.secondary,

        '&:after': {
          content: ','
        },

        [theme.breakpoints.up('md')]: {
          display: 'block',
          color: theme.palette.text.primary
        }
      },
      detailItemLabel: {
        display: 'none',
        color: theme.palette.text.secondary,

        [theme.breakpoints.up('md')]: {
          display: 'initial',
          marginRight: theme.spacing(1)
        }
      },
      lineClamp: {
        display: '-webkit-box',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden'
      },
      buttonContainer: {
        marginTop: 'auto',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column-reverse'
        }
      }
    }),
  {
    name: 'BookCarCard'
  }
)

export default useStyle
