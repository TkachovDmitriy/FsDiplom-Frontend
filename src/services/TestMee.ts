// @ts-nocheck
import { hasRole } from '~/constants/roles'
import { authtorize, logout } from '~/state/modules/user/user.actions'
import store from '~/state/store'
import crypto from 'crypto'
import Axios from 'axios'
import qs from 'query-string'

import {
  SignInInput,
  ForgotPasswordInput,
  SignUpDTO,
  ResetPasswordDTO,
  SignUpDealerDTO,
  AccountDetailsDTO
} from '~/interfaces/inputs'
import Api from '~/utils/Api'

const calculateChecksum = (file: any): Promise =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    const md5sum = crypto.createHash('md5')

    reader.readAsBinaryString(file)

    reader.onload = (e: any): void => {
      md5sum.update(e.target.result, 'binary')
      resolve(md5sum.digest('base64'))
    }

    reader.onerror = (e: any): void => {
      reject(e)
    }
  })

class TestMee extends Api {
  /**
   * User login
   */
  login = (user: SignInInput): Promise<ResponseObject> =>
    this.post('/api/v1/users/sessions', {
      data: user
    })
  /**
   * Dealer login
   */
  loginDealer = (dealer: SignInInput): Promise<ResponseObject> =>
    this.post('/api/v1/dealers/sessions', {
      data: dealer
    })
  /**
   * Send reset link to email
   */
  sendResetLink = (forgot_password: ForgotPasswordInput): Promise<any> =>
    this.post('/api/v1/users/passwords/emails', {
      data: forgot_password
    })
  /**
   * Send dealer reset link to email
   */
  sendDealerResetLink = (forgot_password: ForgotPasswordInput): Promise<any> =>
    this.post('/api/v1/dealers/passwords/emails', {
      data: forgot_password
    })
  /**
   * Create a new user
   */
  createUser = (user: SignUpDTO): Promise<any> =>
    this.post('/api/v1/users', { data: { user } })
  /**
   * Create a new dealer
   */
  createDealer = (dealer: SignUpDealerDTO): Promise<any> =>
    this.post('/api/v1/dealers', { data: { dealer } })
  /**
   * Confirm user link
   */
  confirmUser = (confirmation_token: string): Promise<any> =>
    this.post(`/api/v1/users/confirmations`, { data: { confirmation_token } })
  /**
   * Confirm dealer link
   */
  confirmDealer = (confirmation_token: string): Promise<any> =>
    this.post(`/api/v1/dealers/confirmations`, { data: { confirmation_token } })
  /**
   * Reset password
   */
  resetPassword = (values: ResetPasswordDTO): Promise<any> =>
    this.post(`/api/v1/users/passwords`, { data: values })
  /**
   * Reset dealer password
   */
  resetDealerPassword = (values: ResetPasswordDTO): Promise<any> =>
    this.post(`/api/v1/dealers/passwords`, { data: values })
  /**
   * Get user data
   */
  getUser = (): Promise<ResponseObject> => this.get(`/api/v1/users`)
  /**
   * Get dealer data
   */
  getDealer = (): Promise<ResponseObject> => this.get(`/api/v1/dealers`)
  /**
   * signin with google
   */
  signinWithGoogle = (access_token: string): Promise<any> =>
    this.post('/api/v1/users/googles', {
      data: {
        auth: {
          access_token
        }
      }
    })
  /**
   * Update account details
   */
  updateDealerDetails = (dealer: AccountDetailsDTO): Promise<any> =>
    this.put('/api/v1/dealers', {
      data: { dealer }
    })
  /**
   * Update account details
   */
  updateAccountDetails = (user: AccountDetailsDTO): Promise<any> =>
    this.put('/api/v1/users', {
      data: { user }
    })
  /**
   * Direct upload helper
   */
  _directUpload = async (
    file: any
  ): Promise<{ signed_id: string; origin: object }> => {
    try {
      const checksum = await calculateChecksum(file)

      const {
        direct_upload: { url, headers },
        // id,
        signed_id
      } = await this.post('/rails/active_storage/direct_uploads', {
        data: {
          blob: {
            filename: file.name || 'image',
            byte_size: file.size,
            content_type: file.type,
            checksum
          }
        }
      })

      await Axios.put(url, file, {
        headers
      })

      return { signed_id, origin: file }
    } catch (error) {
      return Promise.reject(error)
    }
  }
  /**
   * Direct upload of one file
   */
  directUploadOne = (file: any): Promise => this._directUpload(file)
  /**
   * Direct upload of all files
   */
  directUploadAll = (
    files: any
  ): Promise<Array<{ signed_id: string; origin: object }>> =>
    Promise.all(files.map((file: any) => this._directUpload(file)))
  /**
   * Get brands
   */
  getBrands = (): Promise<any> => this.get(`/api/v1/brands`)
  /**
   * Get models by brand
   */
  getModels = (brand: string): Promise<any> =>
    this.get(`/api/v1/models?brand=${brand}`)
  /**
   * Get generations
   */
  getGenerations = (brand: string, model: string): Promise<any> =>
    this.get(`/api/v1/generations?brand=${brand}&model=${model}`)
  /**
   * Delete dealer
   */
  deleteDealer = (): Promise<any> => this.del('/api/v1/dealers')
  /**
   * Delete user
   */
  deleteUser = (): Promise<any> => this.del('/api/v1/users')
  /**
   * Create car
   */
  dealerCreateCar = (values: any): Promise<any> =>
    this.post('/api/v1/dealers/listings', {
      data: { listing: values }
    })
  /**
   * Update car
   */
  dealerUpdateCar = (id: number, values: any): Promise<any> =>
    this.put(`/api/v1/dealers/listings/${id}`, {
      data: { listing: values }
    })
  /**
   * get dealer car
   */
  getDealerCar = (id: number): Promise<any> =>
    this.get(`/api/v1/dealers/listings/${id}/edit`)
  /**
   * get dealer cars
   */
  getDealerCars = (): Promise<any> => this.get('/api/v1/dealers/listings')
  /**
   * delete dealer car
   */
  deleteDealerCar = (id: string): Promise<any> =>
    this.del(`/api/v1/dealers/listings/${id}`)
  /**
   * Load listing on homepage
   */
  getListingHomepage = (): Promise<any> => {
    return this.get(`/api/v1/homepage`)
  }
  /**
   * Load listings
   */
  getListings = (page: number, search: {}): Promise<any> => {
    return this.get(
      `/api/v1/listings?${qs.stringify(
        { page, ...search },
        {
          skipEmptyString: true,
          skipNull: true
        }
      )}`
    )
  }
  /**
   * Load dealer list
   */
  getDealerList = (): Promise<any> => {
    return this.get(`/api/v1/dealers_list`)
  }
  /**
   * load car
   */
  getListingCar = (id: string | number): Promise<any> => {
    return this.get(`/api/v1/listings/${id}`)
  }
  /**
   * Load dealer
   */
  getDealerInfo = (id: string): Promise<any> => {
    return this.get(`/api/v1/dealers_list/${id}`)
  }
  /**
   * update dealer token
   */
  updateTokenDealer = (): Promise<any> => {
    return this.post(`/api/v1/dealers/tokens`)
  }
  /**
   * update token
   */
  updateTokenUser = (): Promise<any> => {
    return this.post(`/api/v1/users/tokens`)
  }
  updateReviews = (data): Promise<any> => {
    return this.post('/api/v1/users/reviews', {
      data
    })
  }
  /**
   * create order
   */
  createOrder = (data: any): Promise<any> => {
    return this.post(`/api/v1/users/orders`, {
      data
    })
  }
  /**
   * load orders
   */
  loadOrsers = (): Promise<any> => {
    return this.get(`/api/v1/users/orders`)
  }
  /**
   * load dealer orders
   */
  loadDealerOrsers = (): Promise<any> => {
    return this.get(`/api/v1/dealers/orders`)
  }
  /**
   * update dealer order
   */
  updateDelaerOrder = (id: string | number, status: string): Promise<any> => {
    return this.put(`/api/v1/dealers/orders/${id}`, {
      data: {
        order: { status }
      }
    })
  }
  /**
   * update user order
   */
  updateUserOrder = (id: string | number, status: string): Promise<any> => {
    return this.put(`/api/v1/users/orders/${id}`, {
      data: {
        order: { status }
      }
    })
  }
  /**
   * order promotion
   */
  orderPromotion = (data: any): Promise<any> => {
    return this.post('/api/v1/dealers/orders', {
      data
    })
  }
}

const instance = new TestMee({
  baseURL: process.env.REACT_APP_TESTMEE_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

instance.appendErrorInterceptor((error) => {
  if (error.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }

  const state = store.getState()
  const { isUser } = hasRole(state.user.role)

  const refreshTokenConfig = {
    ...instance.getConfig(),
    method: 'post',
    url: isUser ? '/api/v1/users/tokens' : '/api/v1/dealers/tokens'
  }

  return Axios.request(refreshTokenConfig)
    .then(({ jwt }) => {
      const config = error.config
      config.headers['Authorization'] = `Bearer ${jwt}`
      store.dispatch(authtorize({ jwt }))

      return new Promise((resolve, reject) => {
        Axios.request(config)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    })
    .catch((error) => {
      store.dispatch(logout())
      Promise.reject(error)
    })
})

export default instance
