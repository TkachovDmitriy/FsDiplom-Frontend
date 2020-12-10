export enum STORAGE {
  authToken = 'jwt_token',
  userEmail = 'user_email',
  confirmationToken = 'confirmation_token',
  resetToken = 'reset_password_token',
  redirect = 'redirect',
  paymentData = 'payment'
}

export enum DAYS_OF_WEEK {
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday
}

export const INITIAL_SEARCH_STATE = {
  by_brand: null,
  by_model: null,
  by_fueltype: null,
  by_dealer: null,
  by_location: null,
  sorting: 'newest',
  page: 1
}
