import { makeStyles, createStyles } from '@material-ui/core'
import { fontSize } from '@material-ui/system'
import theme from '~/theme'

const useStyle = makeStyles(
  () =>
    createStyles({
      root: {
        position: 'relative',
        minHeight: '100px',
        height: '100%',
        borderRadius: 10,
        textDecoration: 'none',

        '&:hover': {
          background: '#000d',
          transition: 'transform 0.25s ease-out'
        },

        '&:hover:before': {
          transform: 'scale(21)'
        },

        '&:hover h6': {
          color: '#FFF'
        }
      },
      'go-corner': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: 32,
        height: 32,
        overflow: 'hidden',
        top: 0,
        right: 0,
        backgroundColor: '#00838d',
        borderRadius: '0 4px 0 32px'
      },

      'go-arrow': {
        marginTop: -4,
        marginRight: -4,
        color: 'white'
      },

      brand: {
        color: '#1E1E1E',
        fontSize: 16
      },

      decription: {
        color: '#64696C',
        fontSize: '12px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('sm')]: {
          fontSize: '14px'
        }
      },
      badge: {
        position: 'absolute',
        top: 10,
        right: 10
      },
      promoted: {
        padding: '5px 10px',
        color: '#fff',
        backgroundColor: '#000',
        position: 'absolute'
      },
      actionArea: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
    }),
  {
    name: 'NewsCard'
  }
)

export default useStyle
