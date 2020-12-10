import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage, useIntl } from 'react-intl'
import { Box, Button, makeStyles, createStyles, Theme } from '@material-ui/core'

import { Text, Flexbox } from '~/components/shared'

import { createLocalizedPath } from '~/utils/localizedPath'

import ErrorImage from '~/assets/images/error.svg'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      flexDirection: 'column',
      alignItems: 'center',
      margin: '50px 0',

      '& h2': {
        textAlign: 'center',
        marginBottom: 20
      },

      [theme.breakpoints.up('md')]: {
        margin: '100px 0'
      }
    },

    image: {
      maxWidth: 170,
      maxHeight: 190,
      marginBottom: 30,

      [theme.breakpoints.up('md')]: {
        marginBottom: 75
      }
    }
  })
)

type Props = {
  error: string
  errorInfo: string
}

const Error: FC<Props> = ({ error, errorInfo }) => {
  const cn = useStyles()
  const { locale } = useIntl()
  return (
    <Flexbox className={cn.box}>
      <Box>
        <img src={ErrorImage} className={cn.image} />
      </Box>
      <Text variant="h2">
        <FormattedMessage
          id="pages.error.titile"
          defaultMessage="Oops! There’s an error"
        />
      </Text>
      <Text color="textSecondary">{error}:</Text>
      <Text
        color="textSecondary"
        dangerouslySetInnerHTML={{
          __html: errorInfo
        }}
        mb="20px"
      />
      <Button
        component={Link}
        to={(createLocalizedPath('/'), locale)}
        variant="contained"
        size="large"
        color="primary"
      >
        <FormattedMessage
          id="pages.error.button"
          defaultMessage="Go to homepage"
        />
      </Button>
    </Flexbox>
  )
}

export default Error
