import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        '& > * + *': {
          marginTop: theme.spacing(2)
        }
      },
      list: {
        marginBottom: theme.spacing(1),

        '& ol': {
          [theme.breakpoints.down('sm')]: {
            flexWrap: 'nowrap',
            whiteSpace: 'nowrap',
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              width: 0
            }
          }
        }
      },
      link: {
        color: '#BBC0C4',
        [theme.breakpoints.down('sm')]: {
          display: 'inline-block',
          float: 'none'
        }
      },
      separator: {
        width: 12,
        height: 12
      }
    }),
  {
    name: 'Breadcrumbs'
  }
)

export default useStyles
