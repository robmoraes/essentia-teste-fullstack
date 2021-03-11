import Vue from 'vue'

const ROLES_ROUTE = 'security/roles'

export function list (context) {
  const p = new Promise((resolve, reject) => {
    return Vue.prototype.$axios
      .get(`${ROLES_ROUTE}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response))
  })
  return p
}

export function show (context, id) {
  const p = new Promise((resolve, reject) => {
    return Vue.prototype.$axios
      .get(`${ROLES_ROUTE}/${id}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response))
  })
  return p
}

export function insert (context, payload) {
  const p = new Promise((resolve, reject) => {
    return Vue.prototype.$axios
      .post(`${ROLES_ROUTE}`, payload)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response))
  })
  return p
}

export function update (context, payload) {
  const p = new Promise((resolve, reject) => {
    return Vue.prototype.$axios
      .put(`${ROLES_ROUTE}/${payload.id}`, payload)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response))
  })
  return p
}

export function destroy (context, id) {
  const p = new Promise((resolve, reject) => {
    return Vue.prototype.$axios
      .delete(`${ROLES_ROUTE}/${id}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response))
  })
  return p
}
