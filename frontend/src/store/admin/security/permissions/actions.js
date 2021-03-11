import Vue from 'vue'

const PERMISSIONS_ROUTE = 'security/permissions'

export function setList (context, obj) {
  const p = new Promise(function (resolve, reject) {
    return Vue.prototype.$axios
      .get(PERMISSIONS_ROUTE)
      .then(res => {
        const payload = res.data
        context.commit('SET_PERMISSIONS', payload)
        resolve(res)
      })
      .catch(err => {
        reject(err.response)
      })
  })
  return p
}

export function post (context, payload) {
  const p = new Promise(function (resolve, reject) {
    return Vue.prototype.$axios
      .post(PERMISSIONS_ROUTE, payload)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.response)
      })
  })
  return p
}

export function put (context, payload) {
  const p = new Promise(function (resolve, reject) {
    return Vue.prototype.$axios
      .put(`${PERMISSIONS_ROUTE}/${payload.id}`, payload)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.response)
      })
  })
  return p
}

export function destroy (context, payload) {
  const p = new Promise(function (resolve, reject) {
    return Vue.prototype.$axios
      .delete(`${PERMISSIONS_ROUTE}/${payload}`)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.response)
      })
  })
  return p
}
