import { object, string } from 'yup'

const SearchCarSchema = object().shape({
  by_brand: string().nullable(),
  by_model: string().nullable(),
  by_location: string().nullable()
})

export default SearchCarSchema
