import { defineMessages } from 'react-intl'

const scope = 'components.forms.CarForm'

export default defineMessages({
  // title
  'title.specification': {
    id: `${scope}.title.specification`,
    defaultMessage: 'General specification'
  },
  'title.upload-photos': {
    id: `${scope}.title.upload-photos`,
    defaultMessage: 'Upload photos'
  },
  'title.price-location': {
    id: `${scope}.title.price-location`,
    defaultMessage: 'Price & Location'
  },
  'title.information': {
    id: `${scope}.title.information`,
    defaultMessage: 'Additional information'
  },
  // label
  'label.brand': {
    id: `${scope}.label.brand`,
    defaultMessage: 'Brand'
  },
  'label.model': {
    id: `${scope}.label.model`,
    defaultMessage: 'Model'
  },
  'label.generation': {
    id: `${scope}.label.Generation`,
    defaultMessage: 'Generation'
  },
  'label.engine': {
    id: `${scope}.label.engine`,
    defaultMessage: 'Engine'
  },
  'label.power': {
    id: `${scope}.label.power`,
    defaultMessage: 'Power'
  },
  'label.fueltype': {
    id: `${scope}.label.fueltype`,
    defaultMessage: 'Fueltype'
  },
  'label.color': {
    id: `${scope}.label.color`,
    defaultMessage: 'Color'
  },
  'label.transmission': {
    id: `${scope}.label.transmission`,
    defaultMessage: 'Transmission'
  },
  'label.about-car': {
    id: `${scope}.label.about-car`,
    defaultMessage: 'Say more about the car'
  },
  'label.photos': {
    id: `${scope}.label.photos`,
    defaultMessage: 'Photos (add from 3 to 15 photos)'
  },
  'label.price': {
    id: `${scope}.label.price`,
    defaultMessage: 'Vehicle price'
  },
  'label.test-price': {
    id: `${scope}.label.test-price`,
    defaultMessage: 'Test drive price'
  },
  'label.location': {
    id: `${scope}.label.location`,
    defaultMessage: 'Location'
  },
  'label.special-equipment': {
    id: `${scope}.label.special-equipment`,
    defaultMessage: 'Special equipment'
  },
  'label.further-features': {
    id: `${scope}.label.further-features`,
    defaultMessage: 'Further features'
  },
  // hint
  'hint.about-car': {
    id: `${scope}.hint.about-car`,
    defaultMessage:
      'Here you can specify the price of the car, color, registration date, body type, transmission, etc.'
  },
  'hint.photos': {
    id: `${scope}.hint.photos`,
    defaultMessage: 'You can add only these formats of photos: .jpg, .png'
  },
  'hint.special-equipment': {
    id: `${scope}.hint.special-equipment`,
    defaultMessage: 'Write about special equipment of the car'
  },
  'hint.further-features': {
    id: `${scope}.hint.further-features`,
    defaultMessage: 'Write about further features of the car'
  },
  // placeholder
  'placeholder.about-car': {
    id: `${scope}.placeholder.about-car`,
    defaultMessage: 'Free description'
  },
  'placeholder.price': {
    id: `${scope}.placeholder.price`,
    defaultMessage: 'Free'
  },
  // button
  'button.submit': {
    id: `${scope}.button.submit`,
    defaultMessage: 'Add a articles'
  },
  'button.submit-edit': {
    id: `${scope}.button.submit-edit`,
    defaultMessage: 'Save'
  },
  // toastr
  'toastr.title': {
    id: `${scope}.toastr.title`,
    defaultMessage: 'Success'
  },
  'toastr.message': {
    id: `${scope}.toastr.message`,
    defaultMessage: 'Articles was created'
  }
})
