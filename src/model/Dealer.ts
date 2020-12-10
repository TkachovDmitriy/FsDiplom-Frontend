import { Car } from '~/model/Car'
export interface Dealer {
  name?: string
  dealer_name?: string
  email?: string
  phone_number?: string
  phone?: string
  address?: { label: string; location: {} }
  opening_hours?: {
    date: {
      from: string
      to: string
    }
    time: {
      from: string
      to: string
    }
  }
  rules?: {
    allowed: [string]
    not_allowed: [string]
  }
  reviews?: { mark: number; description: string }[]
  listings?: Car[]
}
