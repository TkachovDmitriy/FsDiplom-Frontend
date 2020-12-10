import { useDispatch } from 'react-redux'
import { Dispatch } from 'react'

const useThunkDispatch = (): Dispatch<any> => {
  return useDispatch()
}

export default useThunkDispatch
