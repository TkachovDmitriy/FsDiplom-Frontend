import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { WrappedFieldProps } from 'redux-form'
import { TextField, CircularProgress } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useAsync } from 'react-async'

interface Props {
  displayError: string
  label: string
  options: Option[]
  loading?: boolean
  startAdornment?: object
  loadOptions?: () => Promise<[]>
  required?: boolean
  placeholder?: string
  formatOptions?: (options: Option[]) => {}
  handleSelect?: any
  updateDeps?: []
  initialValue?: string
  onInputChange?: () => void
  clearOnBlur?: boolean
  submitForm?: string
}

const AutocompleteField: React.FC<WrappedFieldProps & Props> = ({
  input: { onChange, onBlur, value, ...input },
  meta: { touched, error },
  label,
  displayError,
  options: customOptions = [],
  loadOptions,
  formatOptions,
  updateDeps = [],
  loading = false,
  startAdornment,
  required,
  handleSelect: onSelect,
  placeholder,
  clearOnBlur,
  onInputChange,
  ...rest
}) => {
  const [options, setOptions] = useState(customOptions)
  const [inputValue, setInputValue] = useState('')

  const errorMessage = (touched && error) || displayError
  const { isLoading, run } = useAsync({
    deferFn: loadOptions,

    onResolve: (options) => {
      let current_options: Option[] = options

      if (!!formatOptions && typeof formatOptions === 'function') {
        // @ts-ignore
        current_options = formatOptions(options.data) as Option[]
      }
      setOptions(current_options)
    },
    onReject: () => {
      setOptions(options)
    }
  })

  useEffect(() => {
    if (!!loadOptions) run()
    if (customOptions) setOptions(customOptions)
  }, updateDeps)

  const handleChange = useCallback(
    (_e, v) => {
      if (!v) {
        onChange(null)
      }

      setInputValue(v)
    },
    [onChange]
  )

  const handleSelect = useCallback(
    (_e, v) => {
      if (value !== v?.value || value !== v) {
        onChange(v?.value || v || null)
        if (!!onSelect)
          onSelect({ name: input.name, value: v?.value || v || null })
      }
    },
    [onChange, onSelect]
  )

  const defaultValue = useMemo(() => {
    if (
      (typeof value === 'string' || typeof value === 'number') &&
      options.length
    ) {
      return (
        options.find((v) => v.value?.toString() === value?.toString()) ||
        (value
          ? {
              value,
              label: value
            }
          : null)
      )
    } else if (value) {
      return { value, label: value }
    } else return null
  }, [value, options])

  return (
    <Autocomplete
      options={options}
      getOptionSelected={(option): boolean => option.value === value}
      getOptionLabel={(option): string => option.label}
      value={defaultValue || null}
      loading={loading || isLoading}
      placeholder={placeholder}
      renderInput={(params): JSX.Element => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          error={!!errorMessage}
          helperText={errorMessage}
          InputLabelProps={{ required, shrink: true }}
          InputProps={{
            ...params.InputProps,
            notched: false,
            startAdornment,
            endAdornment: (
              <>
                {(loading || isLoading) && (
                  <CircularProgress color="inherit" size={20} />
                )}
                {params.InputProps.endAdornment}
              </>
            )
          }}
          inputProps={{
            ...params.inputProps
          }}
          fullWidth
          placeholder={placeholder}
        />
      )}
      onBlur={(): void =>
        onBlur(
          (clearOnBlur && inputValue) || defaultValue?.value || defaultValue
        )
      }
      {...input}
      {...rest}
      clearOnBlur={clearOnBlur}
      onChange={handleSelect}
      onKeyPress={(event): void => {
        if (event.key === 'Enter') {
          onBlur(
            // @ts-ignore
            event.target.value || defaultValue?.value || defaultValue
          )
        }
      }}
      onInputChange={onInputChange ? handleChange : null}
    />
  )
}

export default AutocompleteField
