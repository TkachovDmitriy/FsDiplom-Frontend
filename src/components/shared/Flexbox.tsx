import { styled } from '@material-ui/core/styles'
import {
  compose,
  spacing,
  display,
  flexbox,
  ComposedStyleFunction,
  PropsFor
} from '@material-ui/system'

type FlexboxStyleFunction = ComposedStyleFunction<
  [typeof display, typeof spacing, typeof flexbox]
>

type SystemProps = PropsFor<FlexboxStyleFunction>
type ElementProps = Omit<React.HTMLAttributes<HTMLElement>, keyof SystemProps>

interface FlexboxProps extends ElementProps, SystemProps {
  component?: React.ElementType
  clone?: boolean
}

const Flexbox = styled('div')(compose(spacing, display, flexbox), {
  name: 'Flexbox'
})

Flexbox.defaultProps = {
  display: 'flex'
}

export default Flexbox
