import { useLocation } from 'react-router'
import qs from 'query-string'

export const useQuery = (): {} => {
  return qs.parse(useLocation().search)
}

export default useQuery
