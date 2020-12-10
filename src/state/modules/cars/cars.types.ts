import { Action } from 'redux'
import { Car } from '~/model/Car'

export enum CarsActionsTypes {
  Load = 'Cars::load',
  Delete = 'Cars::delete'
}

export interface LoadCarsAction extends Action {
  type: CarsActionsTypes.Load
  payload: Car[]
}

export interface DeleteCarAction extends Action {
  type: CarsActionsTypes.Delete
  payload: { id: string | number }
}

export type CarsActionsUnion = LoadCarsAction | DeleteCarAction
