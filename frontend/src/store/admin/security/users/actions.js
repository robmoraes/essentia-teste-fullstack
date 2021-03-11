import Vue from 'vue'

const USERS_ROUTE = '/security/users'

export function list (context) {
  const p = new Promise((resolve, reject) => {
    return Vue.prototype.$axios
      .get(`${USERS_ROUTE}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response))
  })
  return p
}

export function show (context, id) {
  const p = new Promise((resolve, reject) => {
    return Vue.prototype.$axios
      .get(`${USERS_ROUTE}/${id}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response))
  })
  return p
}

export function update (context, payload) {
  const p = new Promise((resolve, reject) => {
    return Vue.prototype.$axios
      .put(`${USERS_ROUTE}/${payload.id}`, payload)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response))
  })
  return p
}

export function destroy (context, id) {
  const p = new Promise((resolve, reject) => {
    return Vue.prototype.$axios
      .delete(`${USERS_ROUTE}/${id}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response))
  })
  return p
}
