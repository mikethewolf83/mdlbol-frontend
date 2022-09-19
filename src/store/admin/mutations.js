export function SET_PROFILES(state, payload) {
    state.profiles = payload
}

export function DELETE_PROFILE(state, payload) {
    let index = state.profiles.findIndex(profile => profile.id == payload)
    state.profiles = state.profiles.splice(index, 1)
}

export function SET_PROFESSORS(state, payload) {
    state.professors = payload
}
