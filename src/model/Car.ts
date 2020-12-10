/**
 * Car base interface
 */
export interface Car {
  id: number | string
  dealer_id: string | number
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
  car_price: string | number
  test_price: string | number
  location: { label: string }
  color: string
  body_type: string
  registration_date: string
  transmission: string
  equipment: string
  special_equipment: string
  description: string
  approved: boolean
  photos: []
  promoted: boolean
}
