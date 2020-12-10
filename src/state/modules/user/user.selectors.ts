import { hasRole, RolesRetrun } from '~/constants/roles'
import { AppState } from '~/interfaces/redux'

export const isLogged = (state: AppState): boolean => {
  const {
    user: { token, confirmed }
  } = state

  return !!token && confirmed
}

export const isAuthorized = (state: AppState): boolean => {
  const {
    user: { confirmed, phone, token }
  } = state

  return !!token && confirmed && !!phone
}

export const isRole = (state: AppState): RolesRetrun => {
  const {
    user: { role }
  } = state

  return hasRole(role)
}
