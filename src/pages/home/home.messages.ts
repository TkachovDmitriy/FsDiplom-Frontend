import { defineMessages } from 'react-intl'

const scope = 'pages.home'

export default defineMessages({
  recentlyAdded: {
    id: `${scope}.recentlyAdded`,
    defaultMessage: 'Recently added cars'
  },
  promotedCars: {
    id: `${scope}.promotedCars`,
    defaultMessage: 'Promoted cars'
  },
  viewAllcars: {
    id: `${scope}.viewAllcars`,
    defaultMessage: 'View all cars'
  },
  bodyTypeTitle: {
    id: `${scope}.bodyType.bodyTypeTitle`,
    defaultMessage: 'Body type'
  },
  sedan: {
    id: `${scope}.bodyType.sedan`,
    defaultMessage: 'Sedan'
  },
  hatchback: {
    id: `${scope}.bodyType.hatchback`,
    defaultMessage: 'Hatchback'
  },
  allWheelDrive: {
    id: `${scope}.bodyType.allWheelDrive`,
    defaultMessage: ' 4 Wheel Drives & SUV'
  },
  stationWagon: {
    id: `${scope}.bodyType.stationWagon`,
    defaultMessage: 'Station Wagon'
  },
  busesVans: {
    id: `${scope}.bodyType.busesVans`,
    defaultMessage: 'Buses & Vans'
  },
  electricCar: {
    id: `${scope}.bodyType.electicCar`,
    defaultMessage: 'Electric car'
  },
  heroTitle: {
    id: `${scope}.hero.title`,
    defaultMessage: 'Marketplace for booking of test and demonstration cars'
  }
})
