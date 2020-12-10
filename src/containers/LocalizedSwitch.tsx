import React from 'react'
import { Switch, RouteProps } from 'react-router'
import { useIntl } from 'react-intl'

/**
 *
 * @param path Can be string or string array
 * @returns Localized string path
 */
function localizeRoutePath(path: string | string[], locale: string): string {
  if (path === '*') return path

  return `/${locale}${path}`.replace(/^\/en\//, '/')
}

export const LocalizedSwitch: React.FC = ({ children }) => {
  /**
   * Inject params and formatMessage through hooks, so we can localize the route
   */
  const { locale } = useIntl()

  /**
   * Apply localization to all routes
   * Also checks if all children elements are <Route /> components
   */
  return (
    <Switch>
      {React.Children.map(children, (child) =>
        React.isValidElement<RouteProps>(child)
          ? React.cloneElement(child, {
              ...child.props,
              path: localizeRoutePath(child.props.path, locale)
            })
          : child
      )}
    </Switch>
  )
}
