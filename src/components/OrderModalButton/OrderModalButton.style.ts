import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {},
      positionBtn: {
        borderRadius: '50%',
        height: '60px',
        position: 'fixed',
        bottom: '5%',
        right: '5%'
      }
    }),
  {
    name: 'ModalBtn'
  }
)

export default useStyle
