import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {},
      positionBtn: {
        [theme.breakpoints.down('sm')]: {
          minWidth: '200px',
          left: '50%',
          transform: 'translate(-50%)'
        },
        zIndex: 1,
        minWidth: '200px',
        borderRadius: '4',
        position: 'absolute',
        bottom: '9%',
        left: '0',
        fontSize: 18,
        background: '#FFFFFF',
        color: '#333333',
        '&:hover': {
          color: '#FFFFFF'
        }
      }
    }),
  {
    name: 'ModalGallery'
  }
)

export default useStyle
