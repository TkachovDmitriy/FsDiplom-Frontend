import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        height: '100%',
        borderRadius: 4,
        background: theme.palette.primary.main,
        border: '1px solid #BBC0C4'
      },
      hov: {
        '& :hover': {
          trnasition: theme.transitions.create(['background'], {
            duration: theme.transitions.duration.standard
          }),
          background: theme.palette.secondary.main
        },
        '& > a': {
          transition: '0.6s '
        },
        '& > a:hover': {
          textDecoration: 'none'
        }
      },
      titleContainer: {
        padding: '15px 10px'
      },
      title: {
        color: '#FFF',
        marginBottom: 10
      }
    }),
  {
    name: 'ViewAll'
  }
)

export default useStyle
