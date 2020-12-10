import { Overrides as CoreOverrides } from '@material-ui/core/styles/overrides'
import {
  PaginationClassKey,
  PaginationItemClassKey,
  AutocompleteClassKey
} from '@material-ui/lab'
import { CSSProperties } from '@material-ui/styles'

import { cabin } from './typography'
import { createMuiTheme } from '@material-ui/core'

const defaultTheme = createMuiTheme()

interface Overrides extends CoreOverrides {
  MuiPagination?:
    | Partial<Record<PaginationClassKey, CSSProperties | (() => CSSProperties)>>
    | undefined
  MuiPaginationItem?:
    | Partial<
        Record<PaginationItemClassKey, CSSProperties | (() => CSSProperties)>
      >
    | undefined
  MuiAutocomplete?:
    | Partial<
        Record<AutocompleteClassKey, CSSProperties | (() => CSSProperties)>
      >
    | undefined
}

const overrides: Overrides = {
  MuiCssBaseline: {
    '@global': {
      'html, body': {
        width: '100vw',
        height: '100%',
        margin: 0
      },
      '#root': {
        width: '100vw',
        position: 'relative',
        margin: 0
      },
      '@font-face': [cabin],
      body: {
        overflowX: 'hidden'
      },
      a: {
        textDecoration: 'none'
      },
      ul: {
        margin: '5px 0',
        fontSize: '16px',
        lineHeight: '26px',
        padding: '0 20px'
      },
      ol: {
        margin: '5px 0'
      }
    }
  },

  MuiDrawer: {
    modal: {
      // @ts-ignore
      zIndex: '1200 !important'
    }
  },

  MuiSelect: {
    select: {
      paddingRight: 24,
      paddingLeft: 16
    }
  },

  MuiButton: {
    root: {
      fontFamily: 'Cabin, Arial',
      textTransform: 'none'
    },
    sizeLarge: {
      padding: '13px 20px',
      minHeight: 50
    },
    contained: {
      backgroundColor: `#fff`
    }
  },
  MuiTextField: {
    root: {
      paddingTop: '24px'
    }
  },
  MuiOutlinedInput: {
    root: {
      background: '#fff'
    },
    input: {
      padding: '16px 14px',
      fontSize: '16px'
    }
  },
  MuiInputLabel: {
    outlined: {
      left: '0 !important',
      transform: 'none !important',
      fontSize: '14px',
      color: '#1E1E1E'
    },
    asterisk: {
      color: defaultTheme.palette.error.main
    }
  },
  MuiAutocomplete: {
    inputRoot: {
      minHeight: '50px !important'
    },
    input: {
      padding: '0 !important'
    }
  },

  MuiInput: {
    underline: {
      borderBottom: 0,

      '&:hover': {
        borderBottom: 0
      },
      '&:before': {
        borderBottom: 0
      },
      '&:hover:not(.Mui-disabled):before': {
        borderBottom: 0
      },
      '&:after': {
        borderBottom: 0
      }
    }
  },

  MuiPagination: {
    ul: {
      '& li': {
        '& button': {
          borderRadius: 0
        },
        '&:first-of-type': {
          '& button': {
            borderRadius: '4px 0px 0px 4px',
            borderLeft: '1px solid #464646'
          }
        },
        '&:last-of-type': {
          '& button': {
            borderRadius: '0px 4px 4px 0px'
          }
        }
      }
    }
  },

  MuiPaginationItem: {
    root: {
      margin: 0,
      borderRadius: 0,
      borderTop: '1px solid #464646',
      borderRight: '1px solid #464646',
      borderBottom: '1px solid #464646',
      background: '#FFF'
    },
    page: {
      '&.Mui-selected': {
        background: '#F4BD42',
        border: 0
      }
    },
    ellipsis: {
      height: 32,
      lineHeight: 2
    }
  }
}

export default overrides
