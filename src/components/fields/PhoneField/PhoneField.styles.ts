import { makeStyles, Theme, createStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      WebkitTapHighlightColor: 'transparent',

      '& > .flag-dropdown': {
        marginTop: '24px !important',

        '&::before': {
          background: 'transparent !important',
          display: 'none !important'
        },

        '& ul.country-list': {
          [theme.breakpoints.down(360)]: {
            width: '100% !important',
            minWidth: '200px !important',
            maxWidth: '301px !important'
          }
        }
      }
    },

    container: {
      position: 'relative',
      paddingTop: '24px !important',

      '&::before': {
        position: 'absolute !important',
        content: ({ label }: { label: string }): string =>
          `"${label}" !important`,
        top: '0 !important',
        left: '0 !important',
        transform: 'none !important',
        fontSize: '14px !important',
        color: '#1E1E1E',
        padding: '0 !important',
        pointerEvents: 'none !important',
        zIndex: 1
      },
      '&::after': {
        position: 'absolute !important',
        content: ({ asterisk }: { asterisk: string }): string =>
          `"${asterisk}" !important`,
        top: '0 !important',
        left: '45px !important',
        transform: 'none !important',
        fontSize: '14px !important',
        color: '#f44336',
        padding: '0 !important',
        pointerEvents: 'none !important',
        zIndex: 1
      }
    },

    input: {
      width: '100% !important',
      maxHeight: 50,
      color: theme.palette.text.primary,

      '&:focus': {
        border: `2px solid ${theme.palette.primary.main} !important`,
        boxShadow: `none !important`,

        '& + div': {
          '&::before': {
            color: `${theme.palette.text.primary} !important`
          }
        }
      }
    },

    error: {
      '& .form-control': {
        border: `1px solid #f44336 !important`,

        '& + div': {
          '&::before': {
            color: `#f44336 !important`
          }
        },

        '&:focus': {
          border: `2px solid #f44336 !important`,
          '& + div': {
            '&::before': {
              color: `#f44336 !important`
            }
          }
        },

        '&::placeholder': {
          color: `#f44336 !important`
        }
      }
    },
    errorLabel: {
      margin: '3px 14px 0'
    }
  })
)
