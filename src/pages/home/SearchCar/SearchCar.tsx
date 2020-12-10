import React, { FC } from 'react'
import {
  FormattedMessage,
  useIntl,
  injectIntl,
  WrappedComponentProps
} from 'react-intl'
import { Box, Button } from '@material-ui/core'
import { RouteComponentProps, withRouter } from 'react-router'
import {
  InjectedFormProps,
  Form,
  reduxForm,
  Field,
  formValueSelector
} from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import qs from 'query-string'

import SearchCarSchema from '~/schemas/search-car'
import { formatOptions } from '~/utils/functions'
import TestMee from '~/services/TestMee'

import { asyncValidate } from '~/utils/asyncValidate'
import { SearchCarInputs } from '~/interfaces/inputs'
import { AutocompleteField, GeosuggestField } from '~/components/fields'
import { createLocalizedPath } from '~/utils/localizedPath'

import useStyle from './SearchCarStyle'

import mg from './SearchCar.messages'

type Props = {
  values: SearchCarInputs
}

const SearchCar: FC<
  InjectedFormProps<SearchCarInputs, RouteComponentProps> & Props
> = ({ values = {}, handleSubmit }): JSX.Element => {
  const classes = useStyle()
  const { formatMessage } = useIntl()

  const { by_brand } = values

  return (
    <Box className={classes.boxForm}>
      <Box
        component={Form}
        onSubmit={handleSubmit}
        display="flex"
        justifyContent="center"
        className={classes.searchContainer}
      >
        <Box className={classes.selectContainer}>
          <Field
            id="by_brand"
            label={<FormattedMessage {...mg['brand']} />}
            placeholder={formatMessage({ ...mg['any'] })}
            name="by_brand"
            component={AutocompleteField}
            loadOptions={TestMee.getBrands}
            formatOptions={formatOptions}
          />
        </Box>
        <Box className={classes.selectContainer}>
          <Field
            id="by_model"
            label={<FormattedMessage {...mg['model']} />}
            placeholder={formatMessage({ ...mg['any'] })}
            name="by_model"
            component={AutocompleteField}
            loadOptions={by_brand && (() => TestMee.getModels(by_brand))}
            formatOptions={formatOptions}
            updateDeps={[by_brand]}
          />
        </Box>
        <Box className={classes.selectContainer}>
          <Field
            id="by_location"
            label={<FormattedMessage {...mg['location']} />}
            placeholder={formatMessage({ ...mg['locationPlaceholder'] })}
            name="by_location"
            string
            component={GeosuggestField}
          />
        </Box>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          type="submit"
          className={classes.searchButton}
        >
          <FormattedMessage {...mg['search']} />
        </Button>
      </Box>
    </Box>
  )
}

const selector = formValueSelector('SearchCar_Form')

const makeMapStateToProps = (state) => {
  const by_brand = selector(state, 'by_brand')
  return {
    values: { by_brand }
  }
}

const withConnect = connect(makeMapStateToProps)

const withForm = reduxForm<
  SearchCarInputs,
  RouteComponentProps & WrappedComponentProps
>({
  form: 'SearchCar_Form',
  shouldAsyncValidate: () => true,
  asyncValidate: asyncValidate(SearchCarSchema),
  onSubmit: (values, _dispatch, { history, intl: { locale } }): void => {
    history.push(
      createLocalizedPath(`/all-cars?${qs.stringify(values)}`, locale)
    )
  }
})

export default compose<React.FC>(
  withRouter,
  injectIntl,
  withForm,
  withConnect
)(SearchCar)
