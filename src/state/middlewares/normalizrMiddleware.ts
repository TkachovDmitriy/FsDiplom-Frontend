import { normalize, schema as NormilizeSchema } from 'normalizr'

import { NormalizerResult } from '~/interfaces'
import { ReduxBaseAction } from '~/interfaces/redux'

import * as schemas from '../normalizr/schemas'

const detectSchema = (name: string): any | null => {
  const detectedSchema = Object.values(schemas).find(
    (sc: any) => sc.key === name
  )

  if (!detectedSchema) return null

  return detectedSchema
}

const createUnion = (data: NormalizerResult): {} => {
  const unionObj = (data as any).reduce(
    (acc: object, val: { type: string }) => {
      const detectedSchema = detectSchema(val.type)

      if (!detectedSchema) return acc

      return {
        ...acc,
        [val.type]: detectedSchema
      }
    },
    {}
  )

  return [new NormilizeSchema.Union(unionObj, 'type')]
}

export default () => (next: any) => (action: ReduxBaseAction): {} => {
  const { payload, error, meta: actionMeta } = action
  // eslint-disable-next-line prefer-const
  let { schema, includedSchema } = action.meta || {}

  let newAction = action

  if (schema && payload && !error) {
    const { data, included: includedData = [] } = payload

    const normalized = normalize(data, schema)
    let included

    if (includedSchema) {
      if (includedSchema === 'union') {
        includedSchema = createUnion(includedData)
      }
      included = normalize(includedData, includedSchema)
    }

    newAction = {
      ...action,
      payload: normalized,
      included,
      meta: actionMeta
    }
  }

  return next(newAction)
}
