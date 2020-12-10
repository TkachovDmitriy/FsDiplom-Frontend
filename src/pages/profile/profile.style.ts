import { makeStyles, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  () =>
    createStyles({
      root: {},
      deleteAccLink: {
        fontWeight: 'bold'
      },
      title: {
        fontSize: 36
      },
      deleteAccount: {
        textDecoration: 'underline',
        fontWeight: 'bold',
        float: 'right'
      }
    }),
  {
    name: 'Profile'
  }
)

export default useStyle
