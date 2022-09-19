export function SET_TOKEN(state, payload) {
    state.user.token = payload
}

export function SET_USER(state, payload) {
    state.user.data = payload
}
