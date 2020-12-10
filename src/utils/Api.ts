import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import { merge } from './functions'

type Handler = (url: string, config?: AxiosRequestConfig) => Promise<any>

export type ApiAction = {
  REQUEST: string
  SUCCESS: string
  FAIL: string
}

class Api {
  private config: any
  private instance: any

  constructor(config: AxiosRequestConfig) {
    this.config = config
    this.instance = axios.create(config)
  }

  update(config: AxiosRequestConfig): void {
    this.instance = axios.create(merge(this.config, config))
  }

  getConfig: any = () => this.config

  appendErrorInterceptor = (interceptor: any): void => {
    this.instance.interceptors.response.use((r: any) => r, interceptor)
  }

  makeRequest(
    method: string,
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse | Error> {
    const headers = { ...this.instance.defaults.headers, ...options.headers }

    return this.instance({
      ...options,
      method,
      url,
      headers
    })
      .then((resp: AxiosResponse) => resp?.data)
      .catch(({ response }: AxiosError) => Promise.reject(response?.data))
  }

  setAuthToken(authToken?: string): void {
    if (authToken) {
      this.instance.defaults.headers.common.Authorization = `Bearer ${authToken}`
    } else delete this.instance.defaults.headers.common.Authorization
  }

  get: Handler = (url, config) => this.makeRequest('get', url, config)

  post: Handler = (url, config) => this.makeRequest('post', url, config)

  put: Handler = (url, config) => this.makeRequest('put', url, config)

  patch: Handler = (url, config) => this.makeRequest('patch', url, config)

  del: Handler = (url, config) => this.makeRequest('delete', url, config)
}

export default Api
