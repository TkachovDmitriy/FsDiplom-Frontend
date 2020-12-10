import React, { FC, useEffect, useReducer, useCallback } from 'react'
import { Box, Grid, Button, useMediaQuery, useTheme } from '@material-ui/core'
import { useAsync } from 'react-async'

import {
  InjectedFormProps,
  Form,
  Field,
  getFormValues,
  FieldArray
} from 'redux-form'
import { FormattedMessage, useIntl } from 'react-intl'

import BlockHeader from '~/components/BlockHeader'
import Frame from '~/components/frame'
import DropzoneField from '~/components/fields/DropzoneField'
import { formatOptions } from '~/utils/functions'

import { DealerCreateCarInput } from '~/interfaces/inputs'
import {
  AutocompleteField,
  CurrencyField,
  GeosuggestField,
  Textarea,
  TextField
} from '~/components/fields'

import TestMee from '~/services/TestMee'
import messages from './CarForm.messages'

import reducer, {
  initialState,
  setGenerations,
  updateOptions,
  resetGenerations,
  init
} from '~/utils/apiOptions.reducer'
import { AppState } from '~/interfaces/redux'
import { useSelector } from 'react-redux'
import { RenderRules } from '../../../pages/dashboard/DashboardProfile/DashboardProfile.rules'

type Props = {
  edit?: boolean
  initialValues?: {}
}

const CarForm: FC<Props & InjectedFormProps<DealerCreateCarInput>> = ({
  handleSubmit,
  form,
  edit
}): JSX.Element => {
  const { formatMessage } = useIntl()
  const [state, dispatch] = useReducer(reducer, initialState, init)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const values = useSelector(
    (state: AppState) =>
      (getFormValues(form)(state) || {}) as DealerCreateCarInput
  )
  const { brand, model, fueltype: fuel, engine, power, generation } = values

  const { isLoading, run } = useAsync({
    deferFn: () => TestMee.getGenerations(brand, model),
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
    if (brand && model) {
      run()
    }
  }, [model])

  useEffect(() => {
    dispatch(resetGenerations())
  }, [brand, model])

  const handleSelect = useCallback(
    ({ name, value }) => {
      dispatch(
        updateOptions({
          fuel: fuel || undefined,
          engine: engine || undefined,
          generation: generation || undefined,
          power: power || undefined,
          [name === 'fueltype' ? 'fuel' : name]: value || undefined
        })
      )
    },
    [fuel, engine, power, generation]
  )

  return (
    <Box
      component={Form}
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      data-cy="create-car-form"
    >
      <Box mb={4}>
        <BlockHeader translateMessageObj={'Additional information'} />

        <Frame>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Field
                id="title"
                label={'Title'}
                placeholder={'title'}
                helperText={'title'}
                name="title"
                component={Textarea}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                id="description"
                label={'Description'}
                placeholder={'description'}
                helperText={'description'}
                name="description"
                component={Textarea}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                id="timeStampTitle"
                label={'TimeStamp Title'}
                placeholder={formatMessage({
                  ...messages['label.special-equipment']
                })}
                helperText={formatMessage({
                  ...messages['hint.special-equipment']
                })}
                name="timeStampTitle"
                component={Textarea}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FieldArray
                id="allowed"
                name="allowed"
                allowed={true}
                component={RenderRules}
                label={'Time tracks'}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Field
                id="equipment"
                label={
                  <FormattedMessage {...messages['label.further-features']} />
                }
                placeholder={formatMessage({
                  ...messages['label.further-features']
                })}
                helperText={formatMessage({
                  ...messages['hint.further-features']
                })}
                name="equipment"
                component={Textarea}
              />
            </Grid>
          </Grid>
        </Frame>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          style={{ maxWidth: isMobile ? '100%' : 200, fontSize: 18 }}
          fullWidth
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
        >
          <FormattedMessage
            {...(edit
              ? messages['button.submit-edit']
              : messages['button.submit'])}
          />
        </Button>
      </Box>
    </Box>
  )
}

export default CarForm
