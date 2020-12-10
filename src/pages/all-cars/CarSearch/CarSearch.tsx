import React, { FC, useEffect, useReducer } from 'react'
import { Box } from '@material-ui/core'
import { FormattedMessage, useIntl } from 'react-intl'
import { Form, Field } from 'redux-form'
import { useAsync } from 'react-async'

import { AutocompleteField, GeosuggestField } from '~/components/fields'
import Frame from '~/components/frame'

import { formatOptions } from '~/utils/functions'

import TestMee from '~/services/TestMee'

import { SearchCarInputs } from '~/interfaces/inputs'

import mg from './CarSearch.messages'

import reducer, {
  initialState,
  setGenerations,
  resetGenerations,
  init
} from '~/utils/apiOptions.reducer'

type Props = {
  values: SearchCarInputs
  dealerNames: { value: string; label: string }[]
  dealersLoading: boolean
}

const CarSearch: FC<Props> = ({
  values = {},
  dealerNames,
  dealersLoading
}): JSX.Element => {
  const { formatMessage } = useIntl()
  const [state, dispatch] = useReducer(reducer, initialState, init)

  const { by_brand, by_model } = values

  const { isLoading, run } = useAsync({
    deferFn: () => TestMee.getGenerations(by_brand, by_model),
    onResolve: (data) => {
      if (data.data?.length) {
        dispatch(setGenerations(data))
      }
    },
    onReject: () => {
      dispatch(resetGenerations())
    }
  })

  useEffect(() => {
    if (by_brand && by_model) {
      run()
    } else {
      dispatch(resetGenerations())
    }
  }, [by_model])

  return (
    <Form>
      <Frame>
        <Box>
          <Field
            id="by_location"
            label={<FormattedMessage {...mg['location']} />}
            placeholder={formatMessage({ ...mg['locationPlaceholder'] })}
            name="by_location"
            string
            component={GeosuggestField}
          />
        </Box>
        <Box mt={2.5}>
          <Field
            id="by_brand"
            name="by_brand"
            component={AutocompleteField}
            label={<FormattedMessage {...mg['brand']} />}
            placeholder={formatMessage({ ...mg['any'] })}
            loadOptions={TestMee.getBrands}
            formatOptions={formatOptions}
            onInputChange={true}
          />
        </Box>
        <Box mt={2.5}>
          <Field
            id="by_model"
            name="by_model"
            component={AutocompleteField}
            label={<FormattedMessage {...mg['model']} />}
            placeholder={formatMessage({ ...mg['any'] })}
            formatOptions={formatOptions}
            loadOptions={by_brand && (() => TestMee.getModels(by_brand))}
            updateDeps={[by_brand]}
            onInputChange={true}
            noOptionsText={
              !by_brand ? formatMessage(mg['no-options.brand']) : undefined
            }
          />
        </Box>
        <Box mt={2.5}>
          <Field
            id="by_fueltype"
            name="by_fueltype"
            component={AutocompleteField}
            label={<FormattedMessage {...mg['fuelType']} />}
            placeholder={formatMessage({ ...mg['any'] })}
            options={state.fueltypeOptions}
            updateDeps={[state.fueltypeOptions]}
            loading={isLoading}
            onInputChange={true}
            noOptionsText={
              !(by_brand && by_model)
                ? formatMessage(mg['no-options.model'])
                : undefined
            }
          />
        </Box>
        <Box mt={2.5}>
          <Field
            id="by_dealer"
            name="by_dealer"
            loading={dealersLoading}
            component={AutocompleteField}
            label={formatMessage(mg.dealer)}
            placeholder={formatMessage(mg.any)}
            options={dealerNames}
            updateDeps={[dealerNames]}
            clearOnBlur={true}
          />
        </Box>
      </Frame>
    </Form>
  )
}

export default CarSearch
