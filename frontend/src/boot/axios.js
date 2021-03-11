import axios from 'axios'
import qs from 'qs'
import auth from '../services/auth'

const axiosInstance = axios.create({
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'repeat' })
  },
  // baseURL: 'http://essentia.local/api'
  baseURL: process.env.API
})

const a = auth.get()
if (a) {
  if (a.check) {
    axiosInstance.defaults.headers.common.Authorization = `${a.token.token_type} ${a.token.access_token}`
  }
}

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }
