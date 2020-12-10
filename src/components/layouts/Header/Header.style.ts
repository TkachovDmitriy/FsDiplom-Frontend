import { makeStyles, Theme, createStyles } from '@material-ui/core'

import palette from '~/theme/palette'

export const useDesktopStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      header: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        backgroundColor: '#fff',
        '& .active ': {
          opacity: '1'
        }
      },
      logo: {
        display: 'block'
      },
      activeLink: {
        opacity: '1'
      },

      navbar: {
        display: 'flex',
        alignItems: 'center',
        maxHeight: 34,

        '& > a': {
          color: '#000',
          fontSize: 16,
          opacity: '0.7',
          '&:hover': {
            opacity: '1'
          }
        },

        '& > * + *': {
          marginLeft: theme.spacing(5)
        }
      },
      btnWrapper: {
        color: '#000',

        '& > * + *': {
          marginLeft: theme.spacing(2),
          color: '#000'
        }
      }
    }),
  {
    name: 'HeaderDesktop'
  }
)

export const useMobileStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        '& .MuiDrawer-paperAnchorRight': {
          width: '100%',
          maxHeight: '100%'
        },
        '& .LanguageSelect-root-339': {
          width: '100%'
        }
      },
      logo: {
        zIndex: theme.zIndex.drawer + 1
      },
      closeBtn: {
        color: '#737373 !important',
        position: 'absolute',
        right: '0%',
        zIndex: theme.zIndex.drawer + 1
      },
      header: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1.9),
        backgroundColor: '#fff',
        // position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: theme.zIndex.drawer + 1,
        '& .MuiSvgIcon-root': {
          fontSize: '2.5rem'
        },
        '& .LanguageSelect-wrapper-374': {
          width: 'unset !important',
          marginLeft: '5%'
        },
        '& .LanguageSelect-root-210': {
          width: 'unset !important',
          marginLeft: theme.spacing(4)
        }
      },

      list: {
        width: '100%',
        minHeight: 450,
        backgroundColor: '#fff',
        height: '100%'
      },
      fullList: {
        width: 'auto'
      },
      hr: {
        width: '100%',
        marginLeft: '0 !important',
        backgroundColor: '#000 !important'
      },
      navItem: {
        padding: theme.spacing(3),
        paddingLeft: '5%'
      },
      listBox: {
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      },
      navbar: {
        position: 'relative',
        top: '70px',
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column',
        maxHeight: '100%',

        '& > a': {
          color: '#000',
          fontSize: 20,
          width: '100%',
          borderTop: '1px solid #a7a7a7',
          '& :hover': {},
          '&:last-of-type': {
            borderBottom: '1px solid #a7a7a7',
            marginBottom: 20
          }
        }
      },
      logInBtn: {
        fontSize: '18px',
        width: '90% !important',
        color: '#000'
      },
      btnWrapper: {
        alignItems: 'center',
        ' & .MuiButton-outlinedSecondary': {
          marginTop: theme.spacing(2.5),
          marginBottom: theme.spacing(2.5)
        },
        '& > * + *': {
          marginBottom: theme.spacing(2)
        }
      }
    }),
  {
    name: 'HeaderMobile'
  }
)
