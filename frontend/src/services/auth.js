const auth = {
  get: function () {
    return JSON.parse(sessionStorage.getItem('auth'))
  }
}

export default auth
