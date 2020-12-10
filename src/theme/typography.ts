import { createMuiTheme } from '@material-ui/core'
import { TypographyOptions } from '@material-ui/core/styles/createTypography'
import Cabin from '~/assets/fonts/cabin/Cabin-Regular.woff2'

const defaultTheme = createMuiTheme()

export const cabin: any = {
  fontFamily: 'Cabin',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
          local('Cabin'),
          local('Cabin-Regular'),
          url(${Cabin}) format('woff2')
        `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
}

const typography: TypographyOptions = {
  fontFamily: 'Cabin, Arial',
  h1: {
    fontSize: 60,
    fontWeight: 500,

    [defaultTheme.breakpoints.down('xs')]: {
      fontSize: 43
    }
  },
  h2: {
    fontSize: 34,
    fontWeight: 500
  },
  h3: {
    fontSize: 24,
    fontWeight: 500
  },
  h4: {
    fontSize: 20,
    fontWeight: 500
  },
  h5: {
    fontSize: 20
  },
  subtitle1: {
    fontSize: 18,
    lineHeight: 1.7
  },
  body1: {
    fontSize: 16,
    lineHeight: 1.5
  },
  body2: {
    fontSize: 16,
    lineHeight: 1.5,
    marginBottom: 10
  }
}

export default typography
