export type SignInInput = {
  email: string
  password: string
}

export type SignUpInput = {
  full_name: string
  email: string
  password: string
  password_confirmation: string
}

export type SignUpDealer = {
  full_name: string
  phone_number: string
  email: string
  rules: string
  opening_hours: string
  town: string
  address: string
  password: string
  password_confirmation: string
}

export type SignUpDTO = {
  full_name: string
  email: string
  password: string
  password_confirmation: string
}

export type SignUpDealerDTO = {
  full_name: string
  phone_number: string
  email: string
  rules: string
  opening_hours: string
  town: string
  address: string
  password: string
  password_confirmation: string
}

export type SignUpPhoneInput = {
  phone: string
  send_phone: boolean
  code: string
}

export type ForgotPasswordInput = {
  email: string
}

export type ResetPasswordInput = {
  token: string
  password: string
}

export type ResetPasswordDTO = {
  token: string
  password: string
}

export type AccountDetailsDTO = {
  full_name: string
  phone_number: string
  email: string
  town: string
  address: string
  zip_code: string
}

export type AccountDetailsInput = {
  full_name: string
  phone_number: string
  email: string
  town: string
  address: string
  zip_code: string
  role?: string
}

export type DealerCreateCarInput = {
  brand: string
  model: string
  generation: string
  engine: string
  power: string
  fueltype: string
  electric_motors_power: string
  battery_capacity: string
  all_electric_range: string
  system_power: string
  car_price: string
  test_price: string
  location: string
  color: string
  body_type: string
  registration_date: string
  transmission: string
  equipment: string
  special_equipment: string
  photos: []
  description: string
  approved: string
}

export type DealerProfileInput = {
  name: string
  email: string
  phone_numebr: string
  location: string
  date: {
    from: string
    to: string
  }
  time: {
    from: string
    to: string
  }
  allowed: [string]
  not_allowed: [string]
}

export type SearchCarInputs = {
  by_brand: string
  by_model: string
  by_location: string
  by_fueltype: string
  by_dealer: string
  page: number
  sorting: string
}
