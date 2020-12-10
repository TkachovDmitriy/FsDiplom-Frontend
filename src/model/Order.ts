/**
 * search cars interface
 */
export interface Order {
  id: string
  order_type: string
  orderable_id: number
  orderable_name: string
  orderable_type: string
  dealer_id: string
  dealer_name: string
  listing_id: number
  price: number
  brand: string
  model: string
  date: string
  time: string
  status: string
}
