// @ts-nocheck
import objectPath from 'object-path'

type AsyncValidateProps = {
  schema: any
  context?: any
}

export const asyncValidate: Function<AsyncValidateProps> = (
  schema,
  context
) => (values): {} =>
  schema.validate(values, { context, abortEarly: false }).catch((errors) => {
    const formErrors = {}

    errors.inner.forEach((error) => {
      let { path } = error
      const { value } = error

      if (!path) return

      if (Array.isArray(value)) {
        objectPath.set(formErrors, path, error.errors)
      } else {
        if (path.match(/\[[^\]]*]/g)) {
          path = error.path.replace(/[[\]]/g, '.').replace(/\.\./g, '.')
        }

        objectPath.set(formErrors, path, error.message)
      }
    })

    throw formErrors
  })

export const asyncValidateArray = (schema, name) => async (values): {} => {
  const formValues = values[name] || values
  const formErrors = {}

  if (formValues && formValues?.length) {
    const errors = await Promise.all(
      formValues?.map((value) =>
        asyncValidate(schema)(value)
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          .then(() => {})
          .catch((error) => error)
      )
    )

    if (errors.some((err) => !!err)) {
      formErrors[name] = errors

      throw formErrors
    }
  }

  return formErrors
}
