import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import { useIntl } from 'react-intl'
import { Select, MenuItem, makeStyles, createStyles } from '@material-ui/core'

import { localesMap } from '~/constants/locales'

import { createLocalizedPath } from '~/utils/localizedPath'

import { ReactComponent as Arrow } from '~/assets/icons/arrow.svg'
import theme from '~/theme'

const useStyles = makeStyles(
  () =>
    createStyles({
      wrapper: {
        borderRadius: 3,
        border: '1px solid #BBC0C4',
        color: '#fff',
        minWidth: 65,
        '&:hover': {
          backgroundColor: 'rgb(228 228 228 / 16%)',
          borderBottom: '1px solid #BBC0C4'
        },
        [theme.breakpoints.down('md')]: {
          marginLeft: '5%'
        },
        '&:before, &:after': {
          display: 'none'
        },
        '& svg': {
          top: 'auto',
          right: 10
        }
      },
      root: {
        width: '64px',
        paddingRight: 0,
        display: 'flex',
        boxSizing: 'border-box',
        '&:focus': {
          backgroundColor: 'inherit'
        }
      }
    }),
  {
    name: 'LanguageSelect'
  }
)

const LanguageSelect = (): JSX.Element => {
  const intl = useIntl()
  const s = useStyles()
  const { location, push } = useHistory()

  const [value, setValue] = React.useState(intl.locale)

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const v = event.target.value as string

      setValue(v)
      push(createLocalizedPath(location, v))
    },
    [location]
  )

  return (
    <Select
      className={s.wrapper}
      IconComponent={Arrow}
      onChange={handleChange}
      value={value}
      classes={{
        root: s.root
      }}
    >
      {localesMap.map(({ id, label, value }) => (
        <MenuItem key={id} value={value}>
          <span>{label}</span>
        </MenuItem>
      ))}
    </Select>
  )
}

export default React.memo(LanguageSelect)
