import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      selectEmpty: {
        textAlign: 'initial',
        color: theme.palette.text.secondary,

        '& svg': {
          top: 'auto',
          right: 15
        }
      },
      transparent: {
        background: 'transparent',

        '& fieldset': {
          border: 0
        }
      }
    }),
  {
    name: 'Select'
  }
)

export default useStyle
