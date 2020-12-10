import { object } from 'yup'

import { fullName, phone, address } from '../fields'

const AccountDetailsSchema = object().shape({
  full_name: fullName,
  phone_number: phone,
  address
})

export default AccountDetailsSchema
