import Geosuggest from '~/services/Geosuggest'
import { useRef, useEffect } from 'react'

const useGeosuggest = (deps) => {
  const geosuggest = useRef<Geosuggest | null>(null)

  useEffect(() => {
    geosuggest.current = new Geosuggest()
    return () => {
      geosuggest.current = null
    }
  }, [deps])

  return geosuggest
}

export default useGeosuggest
