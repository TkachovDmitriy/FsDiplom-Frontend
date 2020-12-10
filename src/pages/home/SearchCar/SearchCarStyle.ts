import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      boxForm: {
        [theme.breakpoints.down('sm')]: {
          backgroundColor: '#2B2929',
          width: '100vw',
          padding: '10px',
          marginLeft: '-24px'
        },

        [theme.breakpoints.down('xs')]: {
          marginLeft: '-16px',
          marginBottom: 24
        }
      },
      searchContainer: {
        alignItems: 'flex-end',
        padding: '30px 0',
        borderRadius: 4,
        maxWidth: 1080,
        width: '100%',
        background: theme.palette.primary.main,
        transform: 'translateY(-50%)',
        margin: '0 auto',

        '& > * + *': {
          marginLeft: 20,
          [theme.breakpoints.down('sm')]: {
            marginLeft: 0
          }
        },

        '& label': {
          color: '#FFF',

          '&.Mui-focused': {
            color: '#FFF'
          }
        },
        [theme.breakpoints.down('sm')]: {
          flexWrap: 'wrap',
          transform: 'translateY(0%)',
          margin: '20px 0'
        }
      },
      searchButton: {
        maxWidth: 200,
        width: '100%',
        [theme.breakpoints.down('sm')]: {
          maxWidth: '95%',
          width: '100%',
          marginTop: 10,
          fontSize: '18px'
        }
      },
      selectContainer: {
        maxWidth: 200,
        width: '100%',
        [theme.breakpoints.down('sm')]: {
          maxWidth: '95%',
          width: '100%',
          marginBottom: 20
        }
      }
    }),
  {
    name: 'SearchCarHome'
  }
)

export default useStyle
