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

export function insert (context, payload) {
  const p = new Promise((resolve, reject) => {
    return Vue.prototype.$axios
      .post(`${USERS_ROUTE}`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
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
  const formData = new FormData()
  formData.append('name', payload.name)
  formData.append('email', payload.email)
  formData.append('phone', payload.phone)
  formData.append('photo', payload.photo)
  formData.append('photo_upload', payload.photo_upload)
  formData.append('password', payload.password)

  const p = new Promise((resolve, reject) => {
    return Vue.prototype.$axios
      .post(`${USERS_ROUTE}/${payload.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
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
