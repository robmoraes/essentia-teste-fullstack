export function updateAuthState (state, payload) {
  state.auth = payload
  sessionStorage.setItem('auth', JSON.stringify(payload))
}
