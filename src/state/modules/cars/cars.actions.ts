import { Dispatch } from 'redux'
import { Deserializer } from 'jsonapi-serializer'

import TestMee from '~/services/TestMee'
import { ThunkActionCreator } from '~/interfaces/redux-thunk'
import ErrorHandler from '~/utils/errorHandler'

import { LoadCarsAction, CarsActionsTypes, DeleteCarAction } from './cars.types'

export const loadCars: ThunkActionCreator<
  Promise<void>,
  LoadCarsAction
> = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    const res = await TestMee.getDealerCars()

    const payload = await new Deserializer({
      keyForAttribute: 'snake_case'
    }).deserialize(res)

    dispatch<LoadCarsAction>({
      type: CarsActionsTypes.Load,
      payload
    })
  } catch (error) {
    throw new ErrorHandler(error)
  }
}

export const deleteCar: ThunkActionCreator<Promise<void>, DeleteCarAction> = (
  id: string
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    await TestMee.deleteDealerCar(id)

    dispatch<DeleteCarAction>({
      type: CarsActionsTypes.Delete,
      payload: { id }
    })
  } catch (error) {
    throw new ErrorHandler(error)
  }
}
