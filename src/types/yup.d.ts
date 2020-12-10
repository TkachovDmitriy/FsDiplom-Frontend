import { StringSchema, ArraySchema } from 'yup'

declare module 'yup' {
  export interface StringSchema extends StringSchema {
    passwordConfirmation(message?: string): StringSchema
    phoneNumberRequired(message?: string): StringSchema
    validateDate(message?: string, format?: string): StringSchema
  }
  export interface ArraySchema extends ArraySchema {
    validateRules(message?: string): ArraySchema<any>
  }
}
