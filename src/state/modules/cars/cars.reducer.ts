import { createReducer } from 'redux-create-reducer'

import { CarsActionsTypes, CarsActionsUnion } from './cars.types'
import { Car } from '~/model/Car'

export interface CarsReducerState {
  data: Car[]
}

const initialState: CarsReducerState = {
  data: []
}

const CarsReducer = createReducer<CarsReducerState, CarsActionsUnion>(
  initialState,
  {
    [CarsActionsTypes.Load]: (state, { payload }) => {
      return {
        ...state,
        data: payload
      }
    },
    [CarsActionsTypes.Delete]: (state, { payload: { id } }) => {
      return {
        ...state,
        data: state.data.filter((car) => +car.id !== +id)
      }
    }
  }
)

export default CarsReducer
