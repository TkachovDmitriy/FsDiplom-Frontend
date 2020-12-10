import { object } from 'yup'
import { email } from './../fields'

const ForgotPasswordSchema = object().shape({
  email
})

export default ForgotPasswordSchema
