import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {},
      banner: {
        color: '#fff',
        textAlign: 'center',
        '& nav': {
          position: 'absolute',
          top: '5%',
          // '& a': {
          '& .MuiBreadcrumbs-li a': {
            '&:last-of-type': {
              color: '#fff'
            }
          },
          // },
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
        margin: '30px auto'
      }
    }),
  {
    name: 'Imprint'
  }
)

export default useStyle
