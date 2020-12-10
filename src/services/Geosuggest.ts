// @ts-nocheck
interface Suggest {
  readonly description?: string
  readonly label: string
  readonly placeId: string
  readonly location?: {
    lat: number
    lng: number
  }
  readonly matchedSubstrings?: {
    offset: number
    length: number
  }
  readonly structuredFormatting?: google.maps.places.AutocompleteStructuredFormatting
}

export interface Options {
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
  country?: string | string[]
  location?: google.maps.LatLng | google.maps.LatLngLiteral
  radius?: number
  types?: string[]
}

const getOptions = (suggestOptions: Options) => {
  const options: any = {}

  const { location, radius, bounds, types, country } = suggestOptions

  if (location) options.location = location
  if (radius) options.radius = Number(radius)
  if (bounds) options.bounds = bounds
  if (types) options.types = types
  if (country) options.componentRestrictions = { country }

  return options
}

class Geosuggest {
  // tslint:disable-line
  private google: any

  /**
   * The autocomple service to get suggests
   */
  private autocompleteService: google.maps.places.AutocompleteService | null = null

  /**
   * The sessionToken service to use session based monetization
   */
  private sessionToken:
    | google.maps.places.AutocompleteSessionToken
    | undefined = undefined

  /**
   * The geocoder to get geocoded results
   */
  private geocoder: google.maps.Geocoder | null = null

  /**
   * The places service to get place details
   */
  private placesService: google.maps.places.PlacesService | null = null

  constructor() {
    this.google = window.google && window.google.maps

    if (this.google) {
      this.autocompleteService = new this.google.places.AutocompleteService()
      this.sessionToken = new this.google.places.AutocompleteSessionToken()
      this.geocoder = new this.google.Geocoder()
      this.placesService = new this.google.places.PlacesService(
        (window.document || {}).createElement('div')
      )
    }
  }

  getDetails(suggestToGeocode: Suggest) {
    if (!this.placesService) return null

    const options: google.maps.places.PlaceDetailsRequest = {
      placeId: suggestToGeocode.placeId,
      sessionToken: this.sessionToken
    }

    return new Promise((resolve, reject) => {
      this.placesService.getDetails(options, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const gmaps = results
          const location = gmaps?.geometry?.location as google.maps.LatLng
          const suggest = {
            ...suggestToGeocode,
            gmaps,
            location: {
              lat: location.lat(),
              lng: location.lng()
            }
          }

          resolve(suggest as Suggest)
        } else reject(null)
      })
    })
  }

  geocode(suggestToGeocode: Suggest, suggestOptions: Options) {
    if (!this.geocoder) return

    const options: google.maps.GeocoderRequest = {
      address: suggestToGeocode.label,
      bounds: suggestOptions.bounds,
      componentRestrictions: suggestOptions.country
        ? { country: suggestOptions.country }
        : undefined,
      location: suggestOptions.location
    }

    return new Promise((resolve, reject) => {
      this.geocoder.geocode(options, (results, status) => {
        if (status === this.google.GeocoderStatus.OK) {
          const gmaps = results[0]
          const location = (gmaps.geometry &&
            gmaps.geometry.location) as google.maps.LatLng
          const suggest = {
            ...suggestToGeocode,
            gmaps,
            location: {
              lat: location.lat(),
              lng: location.lng()
            }
          }

          resolve(suggest as Suggest)
        } else reject(null)
      })
    })
  }

  geocodeSuggest(
    suggestToGeocode: Suggest,
    suggestOptions: Options
  ): Suggest | null {
    if (!this.google) return null

    if (suggestToGeocode?.placeId && this.placesService) {
      return this.getDetails(suggestToGeocode)
    }

    return this.geocoder.geocode(suggestToGeocode, suggestOptions)
  }

  searchSuggests(
    input: string,
    suggestOptions: Options
  ): Promise<Suggest[]> | null {
    if (!this.autocompleteService) return null

    const formattedOptions = getOptions(suggestOptions)

    const options: google.maps.places.AutocompletionRequest = {
      input,
      sessionToken: this.sessionToken,
      language: 'en',
      ...formattedOptions
    }

    return new Promise((resolve, reject) => {
      this.autocompleteService.getPlacePredictions(
        options,
        (suggestsGoogle) => {
          if (!suggestsGoogle) reject(null)

          const suggests: Suggest[] = []

          suggestsGoogle?.forEach((suggest) => {
            suggests.push({
              description: suggest.description,
              label: suggest?.description,
              matchedSubstrings: suggest.matched_substrings[0],
              structuredFormatting: suggest.structured_formatting,
              placeId: suggest.place_id
            })
          })

          resolve(suggests)
        }
      )
    })
  }
}

export default Geosuggest
