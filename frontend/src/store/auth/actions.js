import Vue from 'vue'
// import { axiosInstance } from 'boot/axios'

const LOGIN_ROUTE = '/login'

export function login (context, credentials) {
  const p = new Promise(function (resolve, reject) {
    return Vue.prototype.$axios
      .post(LOGIN_ROUTE, credentials)
      .then(response => {
        const payload = {
          user: response.data.user,
          token: response.data.token,
          check: true
        }
        context.commit('updateAuthState', payload)
        Vue.prototype.$axios.defaults.headers.common.Authorization =
          `${payload.token.token_type} ${payload.token.access_token}`
        resolve(response)
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
  return p
}

export function logout (context) {
  Vue.prototype.$axios.defaults.headers.common.Authorization = ''
  context.commit('updateAuthState', {
    user: null,
    token: null,
    check: false
  })
}
