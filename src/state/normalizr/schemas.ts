// @ts-nocheck

import { schema } from 'normalizr'

export const order = new schema.Entity(
  'name',
  {},
  {
    processStrategy: ({ attributes: { ...attributes }, ...rest }): any => ({
      ...attributes,
      ...rest
    })
  }
)
