import { api } from '../../boot/axios'
import { SessionStorage, Notify } from 'quasar'

export async function getLanding({ commit, dispatch }, context) {
    let token = SessionStorage.getItem('token');
    await api.get(`/prim/${context.group}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => {
        commit('SET_LANDING', res.data.data)
        // console.log(res.data)
    }).catch(error => {
        if (error.response.status == 401) {
            dispatch('auth/logout', null, { root: true })
            this.$router.push({ name: 'login' })
            notify('Su sesión ha caducado, por favor vuelva a iniciar sesión')
        }
        console.log(error.response.status)
    })
}

export async function editFeedback({ dispatch }, context) {
    let token = SessionStorage.getItem('token');
    await api.post('/prim/1ep/feedback/moodle/update', context, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => {
        // commit('SET_LANDING', res.data.data)
        notify('Comentario actualizado correctamente', 'positive', 'primary', 'bottom')
        console.log(res.data.data.message)
    }).catch(error => {
        if (error.response.status == 401) {
            dispatch('auth/logout', null, { root: true })
            this.$router.push({ name: 'login' })
            notify('Su sesión ha caducado, por favor vuelva a iniciar sesión')
        }
        console.log(error.response.status)
    })
}

/*export async function getGroup({ commit }, context) {
    let token = SessionStorage.getItem('token');
    await api.get(`/prim/${context.group}/group?trimester=${context.trimester}&course=${context.course}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => {
        commit('SET_GROUP', res.data.data)
        // console.log(res.data)
    })
}

export async function getStudent({ commit }, context) {
    let token = SessionStorage.getItem('token');
    await api.get(`/prim/1ep/students?trimester=${context.trimester}&student=${context.student}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => {
        commit('SET_STUDENT', res.data.data)
        // console.log(res.data)
    })
}*/

function notify(message = String(message), type = 'warning', color = type, position = 'top', timeout = 3000) {
    Notify.create({
        message: message,
        type: type,
        color: color,
        position: position,
        timeout: timeout
    })
}