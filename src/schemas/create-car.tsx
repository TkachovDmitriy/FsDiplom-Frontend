import React from 'react'

import { object, string, array } from 'yup'
import { FormattedMessage } from 'react-intl'

import mg from '~/i18n/messages/validation'

const DealerCreateCarSchema = object().shape({
  brand: string()
    .nullable()
    .required(
      (<FormattedMessage {...mg['create-car.brand.required']} />) as any
    ),
  model: string()
    .nullable()
    .required(
      (<FormattedMessage {...mg['create-car.model.required']} />) as any
    ),
  generation: string()
    .nullable()
    .required(
      (<FormattedMessage {...mg['create-car.generation.required']} />) as any
    ),
  engine: string()
    .nullable()
    .required(
      (<FormattedMessage {...mg['create-car.engine.required']} />) as any
    ),
  fueltype: string()
    .nullable()
    .required(
      (<FormattedMessage {...mg['create-car.fueltype.required']} />) as any
    ),
  color: string()
    .nullable()
    .max(
      30,
      (
        <FormattedMessage
          {...mg['create-car.color.max']}
          values={{ qty: 30 }}
        />
      ) as any
    )
    .required(
      (<FormattedMessage {...mg['create-car.color.required']} />) as any
    ),
  transmission: string()
    .nullable()
    .max(
      30,
      (
        <FormattedMessage
          {...mg['create-car.transmission.max']}
          values={{ qty: 30 }}
        />
      ) as any
    )
    .required(
      (<FormattedMessage {...mg['create-car.transmission.required']} />) as any
    ),
  test_price: string()
    .nullable()
    .max(
      4,
      (
        <FormattedMessage
          {...mg['create-car.test_price.max']}
          values={{ qty: 4 }}
        />
      ) as any
    )
    .required(
      (<FormattedMessage {...mg['create-car.test_price.required']} />) as any
    ),
  car_price: string()
    .nullable()
    .max(
      9,
      (
        <FormattedMessage
          {...mg['create-car.car_price.max']}
          values={{ qty: 4 }}
        />
      ) as any
    )
    .required(
      (<FormattedMessage {...mg['create-car.car_price.required']} />) as any
    ),
  location: string().nullable(),
  equipment: string().required(
    (<FormattedMessage {...mg['create-car.equipment.required']} />) as any
  ),
  special_equipment: string().required(
    (
      <FormattedMessage {...mg['create-car.special_equipment.required']} />
    ) as any
  ),
  photos: array()
    .nullable()
    .required(
      (<FormattedMessage {...mg['create-car.photos.required']} />) as any
    )
    .min(
      3,
      (
        <FormattedMessage
          {...mg['create-car.photos.min']}
          values={{ qty: 3 }}
        />
      ) as any
    )
    .max(
      15,
      (
        <FormattedMessage
          {...mg['create-car.photos.max']}
          values={{ qty: 15 }}
        />
      ) as any
    )
})

export default DealerCreateCarSchema
