import React, { FC } from 'react'
import { Box, makeStyles, Theme, createStyles } from '@material-ui/core'
import { formatCurrency } from '~/utils/functions'
import cx from 'classnames'

import Text from './Text'

import sharedMg from '~/i18n/messages/shared'
import { FormattedMessage } from 'react-intl'

type TypeBadge = 'primary' | 'secondary'
type SizeBadge = 'small' | 'medium' | 'large'

interface PriceBadge {
  price?: string | number
  info?: string
  type?: TypeBadge
  size?: SizeBadge
  free?: boolean
  className?: string
}

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      badge: {
        background: theme.palette.secondary.main,
        borderRadius: 4
      },
      badgePrimary: {
        minWidth: 48,
        padding: (props: {
          size: SizeBadge
          free: boolean
          price: string | number
        }) => (+props.price === 0 || props.free ? 10 : 5)
      },
      badgeSecondary: {
        minWidth: 120,
        height: 50,
        padding: '10px',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          minWidth: 70
        }
      },
      badgeTitle: {
        lineHeight: (props: { size: SizeBadge }): number =>
          props.size === 'large' ? 1 : 1.3,
        fontSize: (props: { size: SizeBadge }): number =>
          props.size === 'small'
            ? 14
            : props.size === 'medium'
            ? 18
            : props.size === 'large' && 30,
        textAlign: (props: {
          size: SizeBadge
          free: boolean
          price: string | number
        }) => (props.free || props.price === 0 ? 'center' : 'end')
      },
      badgeSubtitle: {
        lineHeight: 1.1,
        fontSize: (props: { size: SizeBadge }): number =>
          props.size === 'small' ? 9 : 12,
        textAlign: 'end'
      }
    }),
  {
    name: 'PriceBadge'
  }
)

const PriceBadge: FC<PriceBadge> = ({
  price,
  info = <FormattedMessage {...sharedMg.vat} />,
  type = 'primary',
  size = 'small',
  free,
  className
}) => {
  const classes = useStyle({ size, free, price })

  return (
    <Box
      className={cx(classes.badge, {
        [classes.badgePrimary]: type === 'primary',
        [classes.badgeSecondary]: type === 'secondary',
        [className]: !!className
      })}
    >
      <>
        <Text
          variant="body1"
          className={classes.badgeTitle}
          mr={type === 'secondary' ? 0.5 : 0}
        >
          {free || price === 0 ? 'Free' : formatCurrency(+price)}
        </Text>
        {!free && price !== 0 && (
          <Text variant="subtitle2" className={classes.badgeSubtitle}>
            {info}
          </Text>
        )}
      </>
    </Box>
  )
}

export default PriceBadge
