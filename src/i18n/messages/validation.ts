import { defineMessages } from 'react-intl'

const scope = 'validation'

export default defineMessages({
  'fields.fullName.required': {
    id: `${scope}.fields.fullName.required`,
    defaultMessage: 'Full name is required'
  },
  'fields.firstName.required': {
    id: `${scope}.fields.firstName.required`,
    defaultMessage: 'First name is required'
  },
  'fields.lastName.required': {
    id: `${scope}.fields.lastName.required`,
    defaultMessage: 'Last name is required'
  },
  'fields.phoneNumber.required': {
    id: `${scope}.fields.phoneNumber.required`,
    defaultMessage: 'Phone number is required'
  },
  'fields.email.email': {
    id: `${scope}.fields.email.email`,
    defaultMessage: 'Invalid email'
  },
  'fields.email.required': {
    id: `${scope}.fields.email.required`,
    defaultMessage: 'Email is required'
  },
  'fields.password.min': {
    id: `${scope}.fields.password.min`,
    defaultMessage: 'Password is too short!'
  },
  'fields.password.max': {
    id: `${scope}.fields.password.max`,
    defaultMessage: 'Password is too long!'
  },
  'fields.password.required': {
    id: `${scope}.fields.password.required`,
    defaultMessage: 'Password is required'
  },
  'fields.address.required': {
    id: `${scope}.fields.address.required`,
    defaultMessage: 'Address is required'
  },
  'review.description.required': {
    id: `${scope}.review.description.required`,
    defaultMessage: 'Description can\'t be blank'
  },
  'review.mark.required': {
    id: `${scope}.review.mark.required`,
    defaultMessage: 'Mark can\'t be blank'
  },
  'dealer-profile.name.required': {
    id: `${scope}.dealer-profile.name.required`,
    defaultMessage: 'Company name is required'
  },
  'dealer-profile.time.validateDate': {
    id: `${scope}.dealer-profile.time.validateDate`,
    defaultMessage: 'Format is invalid'
  },
  'dealer-profile.rules.required': {
    id: `${scope}.dealer-profile.rules.required`,
    defaultMessage: '1 rule is required'
  },
  'create-car.brand.required': {
    id: `${scope}.create-car.brand.required`,
    defaultMessage: 'Brnad is required'
  },
  'create-car.model.required': {
    id: `${scope}.create-car.model.required`,
    defaultMessage: 'Model is required'
  },
  'create-car.generation.required': {
    id: `${scope}.create-car.generation.required`,
    defaultMessage: 'Generation is required'
  },
  'create-car.engine.required': {
    id: `${scope}.create-car.engine.required`,
    defaultMessage: 'Engine is required'
  },
  'create-car.power.required': {
    id: `${scope}.create-car.power.required`,
    defaultMessage: 'Power is required'
  },
  'create-car.fueltype.required': {
    id: `${scope}.create-car.fueltype.required`,
    defaultMessage: 'Fuel type is required'
  },
  'create-car.color.max': {
    id: `${scope}.create-car.color.max`,
    defaultMessage: 'limited {qty} digits'
  },
  'create-car.color.required': {
    id: `${scope}.create-car.color.required`,
    defaultMessage: 'Color type is required'
  },
  'create-car.transmission.max': {
    id: `${scope}.create-car.transmission.max`,
    defaultMessage: 'limited {qty} digits'
  },
  'create-car.transmission.required': {
    id: `${scope}.create-car.transmission.required`,
    defaultMessage: 'Transmission type is required'
  },
  'create-car.test_price.required': {
    id: `${scope}.create-car.test_price.required`,
    defaultMessage: 'Test drive price is required'
  },
  'create-car.test_price.max': {
    id: `${scope}.create-car.test_price.max`,
    defaultMessage: 'Car price limited {qty} digits'
  },
  'create-car.car_price.required': {
    id: `${scope}.create-car.car_price.required`,
    defaultMessage: 'Car price is required'
  },
  'create-car.car_price.max': {
    id: `${scope}.create-car.car_price.max`,
    defaultMessage: 'Car price limited {qty} digits'
  },
  'create-car.equipment.required': {
    id: `${scope}.create-car.equipment.required`,
    defaultMessage: 'Further features is required'
  },
  'create-car.special_equipment.required': {
    id: `${scope}.create-car.special_equipment.required`,
    defaultMessage: 'Special equipment is required'
  },
  'create-car.photos.required': {
    id: `${scope}.create-car.photos.required`,
    defaultMessage: 'Photos is required'
  },
  'create-car.photos.max': {
    id: `${scope}.create-car.photos.max`,
    defaultMessage: 'Photos must have less than or equal to {qty} items'
  },
  'create-car.photos.min': {
    id: `${scope}.create-car.photos.min`,
    defaultMessage: 'Photos must have at least {qty} items'
  },
  'password.confirmation.passwordConfirmation': {
    id: `${scope}.password.confirmation.passwordConfirmation`,
    defaultMessage: 'Passwords are not the same!'
  },
  'password.confirmation.required': {
    id: `${scope}.password.confirmation.required`,
    defaultMessage: 'Password confirmation is required!'
  },
  'dealer.date.from': {
    id: `${scope}.dealer.date.from`,
    defaultMessage: 'Date from is required'
  },
  'dealer.date.to': {
    id: `${scope}.dealer.date.to`,
    defaultMessage: 'Date to is required'
  },
  'dealer.time.from': {
    id: `${scope}.dealer.time.from`,
    defaultMessage: 'Time from is required'
  },
  'dealer.time.to': {
    id: `${scope}.dealer.time.to`,
    defaultMessage: 'Time to is required'
  },
  'dealer.time.validateDate': {
    id: `${scope}.dealer.time.validateDate`,
    defaultMessage: 'Format is invalid'
  },
  
  
  'methods.phoneNumberRequired': {
    id: `${scope}.methods.phoneNumberRequired`,
    defaultMessage: 'Phone number is invalid'
  },
  'methods.validateDate': {
    id: `${scope}.methods.validateDate`,
    defaultMessage: 'Date is invalid'
  },
})

