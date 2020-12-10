import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        [theme.breakpoints.down('sm')]: {
          padding: '0 10px'
        }
      },
      banner: {
        color: '#fff',
        [theme.breakpoints.down('sm')]: {
          minHeight: '200px !important'
        },
        textAlign: 'center',
        '& nav': {
          position: 'absolute',
          top: '5%',
          '& ol': {
            '& > li a': {
              '&:last-of-type': {
                color: '#fff !important'
              }
            }
          },
          color: '#fff',
          left: '5%'
        },
        '& h1': {
          margin: '0 auto'
        }
      },
      title: {
        padding: '5px 15px 0 0'
      },
      description: {
        fontSize: 16,
        color: theme.palette.text.secondary
      },
      center: {
        [theme.breakpoints.down('sm')]: {
          textAlign: 'center'
        },
        margin: '30px auto'
      }
    }),
  {
    name: 'aboutUs'
  }
)

export default useStyle
