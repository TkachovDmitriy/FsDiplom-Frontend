import { Action } from 'redux'

export enum UserActionsTypes {
  LOGIN = 'user::LOGIN',
  LOGOUT = 'user::LOGOUT',
  ACCOUNTDETAILS = 'user::UPDATE_ACCOUNTDETAILS'
}

export interface LoginAction extends Action {
  type: UserActionsTypes.LOGIN
  payload?: any
}

export interface LogoutAction extends Action {
  type: UserActionsTypes.LOGOUT
}

export interface AccountDetailsAction {
  type: UserActionsTypes.ACCOUNTDETAILS
  payload?: any
}

export type UserActionsUnion = LoginAction | LogoutAction | AccountDetailsAction
