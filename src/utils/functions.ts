/* eslint-disable @typescript-eslint/ban-ts-ignore */
import moment from 'moment'

/**
 * Deep merges two objets.
 * @param  {Object} object destination object
 * @param  {Object} source source obejct
 *
 * @returns {Object} new object
 */
export const merge = (obj: any, source: object): {} => {
  if (obj === source) return obj
  const newValue: any = {
    ...obj,
    ...source
  }

  Object.entries(source).forEach(([key, value]) => {
    newValue[key] =
      obj[key] && typeof obj[key] === 'object' ? merge(obj[key], value) : value
  })

  return newValue
}

/**
 * Return a copy of an object excluding the given key, or array of keys.
 *
 * @param {object} obj - initial object
 * @param {(string|string[])} props - values to be omitted
 * @param {function} [fn] - an optional filter function
 */
export function omit(obj: any, props: any, fn?: any): {} {
  if (!obj || obj.constructor !== Object) return {}
  if (typeof props === 'function') {
    fn = props
    props = []
  }
  if (typeof props === 'string') {
    props = [props]
  }
  const isFunction = typeof fn === 'function'
  const keys = Object.keys(obj)
  const res: any = {}
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i]
    const val = obj[key]
    if (
      !props ||
      (props.indexOf(key) === -1 && (!isFunction || fn(val, key, obj)))
    ) {
      res[key] = val
    }
  }
  return res
}

/**
 * @param  {array} arr
 * @param  {object} sort
 */
export function sortArray(arr, sort): [] {
  return arr.sort((a, b) => {
    const A = a[sort.key]
    const B = b[sort.key]

    if (sort.asc) {
      if (A > B) return 1
      if (A < B) return -1
    } else {
      if (A < B) return 1
      if (A > B) return -1
    }
    return 0
  })
}

export const formatOptions = (options: [string]): Option[] =>
  options.map((option: string): Option => ({ value: option, label: option }))

/**
 * Return formatted currency
 *
 * @param {number} value - value
 */
export const formatCurrency = (number: number, _options?: {}): string => {
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })

  return formatter.format(number)
}

export const buildTimeRange = (time: DateRange): any[] => {
  if (!time) return []

  const [fHours, fSeconds] = time.from.split(':')
  const diffTime = Math.abs(
    moment(time.from, 'HH:mm').diff(moment(time.to, 'HH:mm'), 'hours')
  )
  const max = 23

  const formatTime = (h: string | number): string => `${h}:${fSeconds}`

  const timeRange = new Array(diffTime).fill(null).map((_v, index): string => {
    const hours = +fHours + index

    return hours > max ? formatTime(hours - max) : formatTime(hours)
  })

  return timeRange
}

/**
 * Return formatted currency
 *
 * @param {number} value - value
 */
export const numRound = (number): number => {
  if (number === 0) return number
  const d = Math.floor(number),
    i = number % d
  const res = i < 0.25 ? d : i < 0.75 ? d + 0.5 : d + 1
  return res
}
