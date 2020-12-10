import React, { FC } from 'react'
import { Breadcrumbs, Box } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'

import { Link } from '~/components/shared'

import BreadcrumbsSeparator from '~/assets/icons/breadcrumb-separator.png'

import useStyle from './breadcrumbs.style'

interface BreadCrumbsProps {
  breadcrumbs: {
    langLabel: { id: string; defaultMessage: string } | string
    route: string
  }[]
}

const BreadCrumbs: FC<BreadCrumbsProps> = ({ breadcrumbs }): JSX.Element => {
  const classes = useStyle()

  return (
    <Box mt={3}>
      <Breadcrumbs
        className={classes.list}
        separator={
          <img className={classes.separator} src={BreadcrumbsSeparator} />
        }
      >
        {breadcrumbs.map(({ langLabel, route }, index, arr) => (
          <Link
            key={route}
            to={route}
            className={index !== arr.length - 1 ? classes.link : ''}
          >
            {typeof langLabel === 'string' ? (
              langLabel
            ) : (
              <FormattedMessage {...langLabel} />
            )}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  )
}

export default BreadCrumbs
