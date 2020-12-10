import React from 'react'
import ReactDOM from 'react-dom'
import ReduxToastr from 'react-redux-toastr'
import CssBaseline from '@material-ui/core/CssBaseline'
import * as Sentry from '@sentry/react'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { ThemeProvider, Theme } from '@material-ui/core/styles'
import { LoadScript } from '@react-google-maps/api'

import App from './App'
import store from './state/store'
import theme from './theme'
import locales from './i18n/locales'
import { LOCALES } from './constants/locales'
import { LocalizedRouter } from './containers/LocalizedRouter'

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import 'react-phone-input-2/lib/material.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import * as serviceWorker from './serviceWorker'

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: `https://f35a839b6aec46a4acc31c3aa47d72f9@o52013.ingest.sentry.io/5498834`,
    maxBreadcrumbs: 50
  })
}

ReactDOM.render(
  <React.StrictMode>
    <LoadScript
      libraries={['places']}
      language="de"
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
    >
      <Provider store={store}>
        <ThemeProvider<Theme> theme={theme}>
          <LocalizedRouter
            RouterComponent={BrowserRouter}
            messages={locales}
            languages={LOCALES}
            defaultLanguage={LOCALES.en}
          >
            <Sentry.ErrorBoundary fallback={'An error has occured'}>
              <App />
            </Sentry.ErrorBoundary>
            <ReduxToastr
              timeOut={4000}
              preventDuplicates
              transitionIn="fadeIn"
              transitionOut="fadeOut"
              progressBar
              closeOnToastrClick
            />
          </LocalizedRouter>
          <CssBaseline />
        </ThemeProvider>
      </Provider>
    </LoadScript>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
