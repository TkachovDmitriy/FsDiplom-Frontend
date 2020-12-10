import { Theme } from '@material-ui/core/styles'
import { makeStyles, createStyles } from '@material-ui/core'

export const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        background: '#FFF',
        maxWidth: '100%',
        paddingLeft: 'unset !important',
        paddingRight: 'unset !important',
        '&.slick-slider': {
          position: 'absolute',
          left: '0',
          width: '100%',
          maxWidth: '100vw'
        },
        '& .slick-list, & .slick-track, & .slick-slide, & .slick-slide > div': {
          outline: 'none',
          height: '100%'
        },
        '.MuiFab-primary': {
          background: theme.palette.common.white
        },
        '& .slick-next': {
          right: '70px !important',
          zIndex: '1 !important'
        },
        '& .slick-prev': {
          left: '70px !important',
          zIndex: '1 !important'
        },
        '& .slick-arrow': {
          background: theme.palette.common.white,
          position: 'absolute !important',
          width: '50px !important',
          height: '50px !important',
          display: 'flex !important',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            background: theme.palette.primary.main,
            '& svg, & svg > path': {
              fill: theme.palette.common.white,
              stroke: theme.palette.common.white
            }
          },
          '&::before': {
            content: '""'
          },
          [theme.breakpoints.down('sm')]: {
            width: '40px !important',
            height: '40px !important',
            minWidth: 'auto',

            '&.slick-prev': {
              left: '25px !important'
            },
            '&.slick-next': {
              right: '25px !important'
            }
          }
        }
      },
      imageFit: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }),
  {
    name: 'SlickSlider'
  }
)
