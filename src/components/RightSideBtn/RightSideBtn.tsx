import React, { FC } from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import { makeStyles, createStyles } from '@material-ui/core'

import { Flexbox } from '~/components/shared'

const useStyle = makeStyles(
  () =>
    createStyles({
      root: {
        textTransform: 'uppercase',
        fontSize: '18px',
        padding: '6px 8px',
        marginRight: '-8px',
        marginBottom: '-8px'
      }
    }),
  {
    name: 'RightSideBtn'
  }
)

interface RightSideBtnProps extends ButtonProps {
  translateObj?: { id: string; defaultMessage: string }
}

const RightSideBtn: FC<RightSideBtnProps> = ({
  translateObj,
  children,
  ...rest
}): JSX.Element => {
  const classes = useStyle()

  return (
    <Flexbox justifyContent="flex-end">
      <Button {...rest} className={classes.root}>
        {!!React.Children.count(children) ? (
          children
        ) : (
          <FormattedMessage {...translateObj} />
        )}
      </Button>
    </Flexbox>
  )
}

export default RightSideBtn
