import { Dealer } from './Dealer'
import { Car } from './Car'

interface DealerOffer extends Omit<Dealer, 'reviews'> {
  reviews: number
  stars: number
}

export interface Offer extends Car {
  reserved_dates: [string, string[]][]
  dealer: DealerOffer
}
