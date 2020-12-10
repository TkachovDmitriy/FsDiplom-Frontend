import React from 'react'

import Error from '~/components/layouts/Error'

type ErrorInfo = {
  componentStack: any
}

type State = {
  hasError: boolean
  error: Error
  errorInfo: ErrorInfo
}

export class ErrorBoundary extends React.Component<{}, State> {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo
    })
  }

  render(): React.ReactNode {
    const { hasError, error, errorInfo } = this.state

    if (process.env.NODE_ENV === 'development') {
      return this.props.children
    }

    if (hasError) {
      return (
        <Error error={error?.message} errorInfo={errorInfo?.componentStack} />
      )
    }

    return this.props.children
  }
}
