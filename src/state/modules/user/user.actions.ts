import { hasRole } from '~/constants/roles'
import jwtDecode from 'jwt-decode'
import { Dispatch } from 'redux'
import { toastr } from 'react-redux-toastr'

import ErrorHandler from '~/utils/errorHandler'

import { ThunkActionCreator } from '~/interfaces/redux-thunk'
import {
  SignUpInput,
  SignInInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  SignUpDealer,
  AccountDetailsInput
} from '~/interfaces/inputs'

import { STORAGE } from '~/constants'
import TestMee from '~/services/TestMee'

import {
  LoginAction,
  UserActionsTypes,
  LogoutAction,
  AccountDetailsAction
} from './user.types'

// Actions creators

export const userData = (payload: {}): LoginAction => ({
  type: UserActionsTypes.LOGIN,
  payload
})

// Actions

export const authtorize: ThunkActionCreator<Promise<void>, LoginAction> = ({
  jwt
}: {
  jwt: string
}) => async (dispatch: Dispatch): Promise<void> => {
  try {
    let decodedToken: {
      [key: string]: any
    } = {}

    TestMee.setAuthToken(jwt)

    if (jwt) {
      localStorage.setItem(STORAGE.authToken, jwt)
      decodedToken = jwtDecode(jwt)

      dispatch<LoginAction>(
        userData({
          ...decodedToken,
          token: jwt
        })
      )
    }

    const { isUser } = hasRole(decodedToken.role)
    const getData = isUser ? TestMee.getUser : TestMee.getDealer

    const {
      data: { attributes, ...data }
    } = await getData()

    dispatch<LoginAction>(
      userData({
        ...data,
        ...attributes
      })
    )
  } catch (error) {
    throw new ErrorHandler(error)
  }
}

export const sendResetLink = (values: ForgotPasswordInput): Promise<{}> =>
  TestMee.sendResetLink(values).catch((error: any) => {
    throw new ErrorHandler(error)
  })

export const sendDealerResetLink = (values: ForgotPasswordInput): Promise<{}> =>
  TestMee.sendDealerResetLink(values).catch((error: any) => {
    throw new ErrorHandler(error)
  })

export const signup: ThunkActionCreator<Promise<void>, LoginAction> = (
  user: SignUpInput
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const {
      data: { attributes, ...data }
    } = await TestMee.createUser(user)

    localStorage.setItem(STORAGE.userEmail, user.email)

    dispatch<LoginAction>(
      userData({
        ...data,
        ...attributes
      })
    )
  } catch (error) {
    throw new ErrorHandler(error)
  }
}

export const signupDealer: ThunkActionCreator<Promise<void>, LoginAction> = (
  dealer: SignUpDealer
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const {
      data: { attributes, ...data }
    } = await TestMee.createDealer(dealer)

    localStorage.setItem(STORAGE.userEmail, dealer.email)

    dispatch<LoginAction>(
      userData({
        ...data,
        ...attributes
      })
    )
  } catch (error) {
    throw new ErrorHandler(error)
  }
}

export const signupConfirmEmail: ThunkActionCreator<
  Promise<void>,
  LoginAction
> = (token: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const resp = await TestMee.confirmUser(token)

    dispatch<any>(authtorize(resp))
  } catch (error) {
    throw new ErrorHandler(error, true)
  }
}

export const signupDealerConfirmEmail: ThunkActionCreator<
  Promise<void>,
  LoginAction
> = (token: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const resp = await TestMee.confirmDealer(token)

    dispatch<any>(authtorize(resp))
  } catch (error) {
    throw new ErrorHandler(error, true)
  }
}

/**
 * User login action
 */
export const login: ThunkActionCreator<Promise<void>, LoginAction> = (
  user: SignInInput
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const resp = await TestMee.login(user)

    dispatch<any>(authtorize(resp))
  } catch (error) {
    throw new ErrorHandler('Wrong email or password')
  }
}

/**
 * Dealer login action
 */
export const loginDealer: ThunkActionCreator<Promise<void>, LoginAction> = (
  dealer: SignInInput
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const resp = await TestMee.loginDealer(dealer)

    dispatch<any>(authtorize(resp))
  } catch (error) {
    throw new ErrorHandler('Wrong email or password')
  }
}

export const signinWithGoogle: ThunkActionCreator<
  Promise<void>,
  LoginAction
> = (response: any) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const resp = await TestMee.signinWithGoogle(response.tokenId)

    dispatch<any>(authtorize(resp))
  } catch (error) {
    throw new ErrorHandler(error)
  }
}

export const resetPassword: ThunkActionCreator<Promise<void>, LoginAction> = (
  values: ResetPasswordInput
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const token = localStorage.getItem(STORAGE.resetToken) || ''

    const resp = await TestMee.resetPassword({
      token,
      ...values
    })

    localStorage.removeItem(STORAGE.userEmail)
    localStorage.removeItem(STORAGE.resetToken)

    dispatch<any>(authtorize(resp))
  } catch (error) {
    throw new ErrorHandler(error)
  }
}

export const resetDealerPassword: ThunkActionCreator<
  Promise<void>,
  LoginAction
> = (values: ResetPasswordInput) => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    const token = localStorage.getItem(STORAGE.resetToken) || ''

    const resp = await TestMee.resetDealerPassword({
      token,
      ...values
    })

    localStorage.removeItem(STORAGE.userEmail)
    localStorage.removeItem(STORAGE.resetToken)

    dispatch<any>(authtorize(resp))
  } catch (error) {
    throw new ErrorHandler(error)
  }
}

/**
 * User account details action
 */
export const updateDealerAccountDetails: ThunkActionCreator<
  Promise<void>,
  AccountDetailsAction
> = (accountDetails: AccountDetailsInput) => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    const resp = await TestMee.updateDealerDetails(accountDetails)

    dispatch<AccountDetailsAction>({
      type: UserActionsTypes.ACCOUNTDETAILS,
      payload: resp.data.attributes
    })
  } catch (error) {
    throw new ErrorHandler(error)
  }
}

/**
 * User dealer account details action
 */
export const updateAccountDetails: ThunkActionCreator<
  Promise<void>,
  AccountDetailsAction
> = (accountDetails: AccountDetailsInput) => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    const resp = await TestMee.updateAccountDetails(accountDetails)

    dispatch<AccountDetailsAction>({
      type: UserActionsTypes.ACCOUNTDETAILS,
      payload: resp.data.attributes
    })
  } catch (error) {
    throw new ErrorHandler(error)
  }
}

/**
 * User logout action
 */
export const logout: ThunkActionCreator<void, LogoutAction> = () => (
  dispatch: Dispatch
): void => {
  localStorage.clear()
  TestMee.setAuthToken()

  dispatch<LogoutAction>({
    type: UserActionsTypes.LOGOUT
  })
}

/**
 * Delete user account
 */
export const deleteUserAccount: ThunkActionCreator<
  void,
  LoginAction
> = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    const { message } = await TestMee.deleteUser()

    dispatch<any>(logout())

    toastr.success('Succes', message as string)
  } catch (error) {
    throw new ErrorHandler(error)
  }
}
/**
 * Delete user account
 */
export const deleteDealerAccount: ThunkActionCreator<
  void,
  LoginAction
> = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    const { message } = await TestMee.deleteDealer()

    dispatch<any>(logout())

    toastr.success('Succes', message as string)
  } catch (error) {
    throw new ErrorHandler(error)
  }
}
