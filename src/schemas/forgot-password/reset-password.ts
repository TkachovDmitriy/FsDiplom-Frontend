import { object } from 'yup'
import { password } from '../fields'

const ResetPasswordSchema = object().shape({
  password
})

export default ResetPasswordSchema
