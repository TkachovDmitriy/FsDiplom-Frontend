import { createReducer } from 'redux-create-reducer'

import { UserActionsUnion, UserActionsTypes } from './user.types'

interface State {
  token: string
  exp: string
  confirmed: boolean
  phone_number: null | string
  full_name: string
  country: string
  town: string
  street: string
  zip_code: number | null
}

const initialState: State = {
  token: '',
  exp: '',
  confirmed: false,
  phone_number: null,
  full_name: '',
  country: '',
  town: '',
  street: '',
  zip_code: null
}

const userReducer = createReducer<State, UserActionsUnion>(initialState, {
  [UserActionsTypes.LOGIN]: (state, { payload }) => {
    return {
      ...state,
      ...payload
    }
  },

  [UserActionsTypes.LOGOUT]: () => initialState,

  [UserActionsTypes.ACCOUNTDETAILS]: (state, { payload }) => {
    return {
      ...state,
      ...payload
    }
  }
})

export default userReducer
