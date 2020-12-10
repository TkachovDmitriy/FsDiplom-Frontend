import React, { useEffect, FC } from 'react'
import { IntlProvider } from 'react-intl'
import { Route, Redirect } from 'react-router-dom'

import { LOCALES } from '~/constants/locales'

interface LocalizedRouterProps {
  RouterComponent: React.ComponentClass<any>
  languages: { [k: number]: string }
  messages: any
  defaultLanguage?: string
}

export const LocalizedRouter: React.FC<LocalizedRouterProps> = ({
  children,
  RouterComponent,
  messages,
  defaultLanguage
}) => (
  <RouterComponent>
    <Route path={`/:lang(en|de)`}>
      {({ match, location }): React.ReactNode => {
        /**
         * Get current language
         * Set default locale to en if base path is used without a language
         */
        const params = match ? match.params : {}
        const { lang = defaultLanguage || LOCALES.en } = params
        /**
         * If language is not in route path, redirect to language root
         */
        const { pathname } = location

        const langRegExp = new RegExp(`^\/${defaultLanguage}\/`)

        if (pathname.match(langRegExp)) {
          return <Redirect to={pathname.replace(langRegExp, '/')} />
        }

        /**
         * Return Intl provider with default language set
         */
        return (
          <IntlProvider locale={lang} messages={messages[lang]}>
            {children}
          </IntlProvider>
        )
      }}
    </Route>
  </RouterComponent>
)
