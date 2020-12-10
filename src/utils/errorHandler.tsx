import { toastr } from 'react-redux-toastr'

class ErrorHandler extends Error {
  errors: any
  _message = ''

  constructor(data: any, hideToastr?: boolean) {
    super('Error')
    const error =
      data?.errors ||
      (Array.isArray(data) && data) ||
      (typeof data === 'string' && data)

    this.errors = error
    this._message = error

    if (this.errors && !hideToastr) {
      toastr.error(
        'Error',
        Array.isArray(this.errors) ? this.errors.join('/n') : this._message
      )
    } else if (!hideToastr) {
      toastr.error('Error', 'Something went wrong')
    }
  }
}

export default ErrorHandler
