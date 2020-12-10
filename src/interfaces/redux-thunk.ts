/**
 * Redux-thunk
 *
 * - https://github.com/reduxjs/redux-thunk/issues/213#issuecomment-428380685
 * - https://github.com/reduxjs/redux-thunk/issues/103
 */

import { ActionCreator, Action } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AppState } from './redux'

type ExtraArg = undefined

export type ThunkActionCreator<R, A> = ActionCreator<
  ThunkAction<R, AppState, ExtraArg, Action<A>>
>

export type MyThunkDispatch<A> = ThunkDispatch<AppState, ExtraArg, Action<A>>
