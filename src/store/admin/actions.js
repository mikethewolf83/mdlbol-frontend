import { api } from '../../boot/axios'
import { SessionStorage, Notify } from 'quasar'

export async function profilesList({ commit, dispatch }) {
    let token = SessionStorage.getItem('token');
    await api.get('/auth/profile/list', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => {
        commit('SET_PROFILES', res.data.data.profiles)
    }).catch(error => {
        if (error.response.status == 401) {
            dispatch('auth/logout', null, { root: true })
            this.$router.push({ name: 'login' })
            notify('Su sesión ha caducado, por favor vuelva a iniciar sesión')
        }
        console.log(error.response.status)
    })
};

export async function newProfile({ commit }, context) {
    let token = SessionStorage.getItem('token');
    await api.post('/auth/profile/new', context, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => {
        notify(`El perfil con id de Moodle: ${res.data.data.profile.mdl_user_id} se creó correctamente en Boletines`, 'positive', 'primary', 'bottom')
        console.log(res.data.data.profile)
    }).catch(error => {
        console.log(error.response)
    })
}

export async function deleteProfile({ commit }, context) {
    let token = SessionStorage.getItem('token');
    await api.post('/auth/profile/delete', context, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => {
        commit('DELETE_PROFILE', context.id)
        notify(`El perfil con id: ${context.id} se eliminó correctamente`, 'positive', 'primary', 'bottom')
        console.log(res.data.data)
    }).catch(error => {
        console.log(error)
        notify('Hubo un error en su petición', 'negative', 'negative', 'bottom')
    })
}

export async function professorsList({ commit }) {
    let token = SessionStorage.getItem('token');
    await api.get('/auth/professors', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => {
        commit('SET_PROFESSORS', res.data.data.professors)
        // console.log(res.data.data.professors)
    }).catch(error => {
        console.log(error)
        notify('Hubo un error obteniendo los profesores', 'negative', 'negative', 'bottom')
    })
}

function notify(message = String(message), type = 'warning', color = type, position = 'top', timeout = 3000) {
    Notify.create({
        message: message,
        type: type,
        color: color,
        position: position,
        timeout: timeout
    })
}
