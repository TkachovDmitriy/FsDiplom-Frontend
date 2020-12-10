import { makeStyles, Theme, createStyles } from '@material-ui/core'

import palette from '~/theme/palette'

export const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        backgroundColor: palette.custom.background
      },

      copyright: {
        color: '#FFF'
      }
    }),
  {
    name: 'FooterDesktop'
  }
)
