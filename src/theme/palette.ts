import { PaletteOptions } from '@material-ui/core/styles/createPalette'

interface PaletteType extends PaletteOptions {
  custom: {
    background: string
  }
}

const palette: PaletteType = {
  background: {
    default: '#FFF'
  },
  primary: {
    main: '#000'
  },
  secondary: {
    main: '#FFF'
  },
  text: {
    primary: '#000',
    secondary: '#fff'
  },
  custom: {
    background: '#000'
  }
}

export default palette
