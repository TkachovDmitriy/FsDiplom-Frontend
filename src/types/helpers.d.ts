/**
 * Unwraps type of a Promise
 */
declare type PromiseResult<T> = T extends Promise<infer U> ? U : T

/**
 * Api response helper type
 */
declare type ResponseObject<T = any> = {
  data: ResponseObjectData<T>
}

/**
 * Api respponse data type
 */
declare type ResponseObjectData<T = any> = {
  id: string
  type: string
  attributes: T
  relationships?: {
    [key: string]: any
  }
}

/**
 * Normilized object
 */
declare type Normilized<T = any> = {
  [key: number]: T
}

/**
 * Normilized object
 */
declare type FetchStatus = {
  loaded: boolean
  loading: boolean
}
