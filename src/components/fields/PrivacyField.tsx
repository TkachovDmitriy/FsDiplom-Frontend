import React, { FC } from 'react'
import { FormControlLabel, FormHelperText } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import { WrappedFieldProps } from 'redux-form'
import { FormattedMessage, useIntl } from 'react-intl'

interface CheckboxField {
  description?: string
}

const PrivacyField: FC<WrappedFieldProps & CheckboxField> = ({
  input: { value, onBlur, onChange },
  meta: { touched, error }
}) => {
  const { locale } = useIntl()
  const errorMessage = touched && error

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={!!value}
            onChange={onChange}
            name="termServices"
          />
        }
        label={
          <FormattedMessage
            id={`pages.sign-up.dealer.termServices`}
            defaultMessage="Accept <term>Terms of service</term>, <privacy>Privacy policy & Right of withdrawal</privacy>"
            values={{
              // eslint-disable-next-line react/display-name
              term: (chunks: React.ReactNode) => (
                <>
                  <Link
                    style={{ fontWeight: 'bold', color: '#000' }}
                    to="/terms-of-service"
                  >
                    {chunks}
                  </Link>
                </>
              ),
              // eslint-disable-next-line react/display-name
              privacy: (chunks: React.ReactNode) => (
                <>
                  <Link
                    style={{ fontWeight: 'bold', color: '#000' }}
                    to="/privacy-policy"
                  >
                    {chunks}
                  </Link>
                </>
              )
            }}
          />
        }
      />
      {!!errorMessage && (
        <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>
      )}
    </>
  )
}

export default PrivacyField
