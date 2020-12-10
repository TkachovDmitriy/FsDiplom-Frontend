// @ts-nocheck
import React, { useCallback, useMemo, useEffect, useState } from 'react'
import parse from 'autosuggest-highlight/parse'
import throttle from 'lodash.throttle'
import isEmpty from 'lodash.isempty'
import { TextField, Grid, Typography } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'

import useGeosuggest from '~/hooks/useGeosuggest'
import { Options } from '~/services/Geosuggest'

interface GeosuggestProps {
  value?: any
  variant?: string
  fullWidth?: boolean
  error?: boolean
  helperText?: string
  onChange?: (suggest: any) => {}
  onBlur?: (value: any) => {}
  options?: Options
  required?: boolean
  disabled?: boolean
  string?: boolean
  id?: string
}

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2)
  }
}))

const Geosuggest: React.FC<GeosuggestProps> = ({
  value,
  onChange,
  onBlur,
  options,
  required,
  disabled,
  string,
  id,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState('')
  const [suggestOptions, setSuggestOptions] = useState([])

  const geosuggest = useGeosuggest(inputValue)

  const searchSuggests = useMemo(
    () =>
      throttle(async (input: any, callback: any) => {
        try {
          const resp = await geosuggest.current.searchSuggests(input, options)
          callback(resp)
        } catch (err) {}
      }, 200),
    [geosuggest, options]
  )

  useEffect(() => {
    let active = true

    if (inputValue === '') {
      setSuggestOptions([])
      return
    }

    searchSuggests(inputValue, (results: any) => {
      if (active) {
        setSuggestOptions(results || [])
      }
    })

    return () => {
      active = false
    }
  }, [inputValue, searchSuggests])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value)
    },
    []
  )

  const handleSelect = useCallback(
    async (_e, v) => {
      let res: any = null
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const suggest = await geosuggest.current.geocodeSuggest(v, options)

      if (!isEmpty(suggest)) {
        const { matchedSubstrings, gmaps, ...suggestFormated } = suggest
        res = suggestFormated
      }
      onChange(string ? res?.label || null : res)
    },
    [onChange, options]
  )

  return (
    <Autocomplete
      freeSolo
      autoComplete
      includeInputInList
      filterOptions={(x) => x}
      id={id}
      value={value}
      disabled={disabled}
      options={suggestOptions}
      onChange={handleSelect}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.label
      }
      renderInput={(params) => (
        <TextField
          variant="outlined"
          fullWidth
          onChange={handleChange}
          onBlur={() => {
            onBlur(value || null)
          }}
          {...params}
          {...rest}
          InputLabelProps={{ required, shrink: true }}
          inputProps={{
            'data-required': required,
            ...params.inputProps
          }}
          InputProps={{
            ...params.InputProps,
            notched: false
          }}
        />
      )}
      renderOption={(option) => {
        const matches = option.structuredFormatting.main_text_matched_substrings

        const parts = parse(
          option.structuredFormatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length
          ])
        )

        return (
          <Grid container alignItems="center">
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structuredFormatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        )
      }}
    />
  )
}

export default Geosuggest
