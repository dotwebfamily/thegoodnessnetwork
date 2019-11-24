export const state = () => ({
  authenticated: false,
  user: null
})

export const mutations = {
  login (state) {
    state.authenticated = true
  },
  logout (state) {
    state.authenticated = false
  },
  setUser (state, user) {
    state.user = user
  }
}
