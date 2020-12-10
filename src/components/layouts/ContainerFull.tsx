import React from 'react'
import cx from 'classnames'
import { makeStyles, createStyles, Container } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100vw',
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw'
    }
  })
)

type ContainerFullProps = {
  className?: string
  style?: any
  withContainer?: boolean
  enableGutters?: boolean
}

const ContainerFull: React.FC<ContainerFullProps> = ({
  children,
  className,
  style,
  withContainer,
  enableGutters
}): JSX.Element => {
  const classes = useStyles()

  return (
    <section
      className={cx(classes.root, { [className]: !!className })}
      style={style}
    >
      {withContainer ? (
        <Container maxWidth="md" disableGutters={!enableGutters}>
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  )
}

export default ContainerFull
