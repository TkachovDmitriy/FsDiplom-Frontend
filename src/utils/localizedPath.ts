import { useIntl } from 'react-intl'
import { Location } from 'history'

export const createLocalizedPath = (
  path: Partial<Location> | string,
  locale?: string
): Location | string => {
  const isString = typeof path === 'string'
  const pathname = isString ? path : (path as Location).pathname
  const currentLocale = locale

  const cleanPath = pathname
    .toString()
    .replace(/^\/en\//, '/')
    .replace(/^\/de\//, '/')
  const localizedPath = `/${currentLocale}${cleanPath}`.replace(/^\/en\//, '/')

  if (isString) {
    return localizedPath
  }

  return {
    ...(path as Location),
    pathname: localizedPath
  }
}

export const useLocalizedPath = (path: Location | string): string => {
  const { locale } = useIntl()

  return `/${locale}${path}`.replace(/^\/en\//, '/')
}
