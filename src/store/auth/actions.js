import { api } from '../../boot/axios'
import { SessionStorage, Notify } from 'quasar'

export async function login({ commit }, context) {
    await api.post('/auth/login', context).then(res => {
        SessionStorage.set('token', res.data.data.token)
        commit('SET_TOKEN', res.data.data.token)
    }).catch(error => {
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        if (error.message == "Network Error") {
            return notify('No se pudo establecer una conexión con el servidor', 'negative')
        } else if (error.response.status === 401) {
            return notify('Usted no tiene autorización para acceder a esta aplicación!')
        } else if (range(500, 599).includes(error.response.status)) {
            return notify('Error interno en el servidor. Debe inntentarlo más tarde')
        }
        console.log(error.response.status);
    })
}

export async function profile({ commit }) {
    let token = SessionStorage.getItem('token');
    await api.get('/auth/me', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => {
        SessionStorage.set('user', res.data.data.user)
        let fullname = SessionStorage.getItem('user').firstname + " " + SessionStorage.getItem('user').lastname;
        commit('SET_USER', res.data.data.user)
        notify(`Hola ${fullname}`, 'positive', 'primary', 'bottom')
    }).catch(error => {
        console.log(error.response.status)
    })
}

export async function refresh({ commit }) {
    let token = SessionStorage.getItem('token');
    await api.post('/auth/refresh', null, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => {
        SessionStorage.set('token', res.data.data.token)
        commit('SET_TOKEN', SessionStorage.getItem('token'))
        console.log("Refreshed!");
    }).catch(error => {
        console.log(error.response.status)
    })
}

export async function logout({ commit }) {
    let token = SessionStorage.getItem('token');
    await api.post('/auth/logout', null, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }).then(res => {
        SessionStorage.clear();
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
        commit('admin/SET_PROFILES', null, { root: true })
        commit('admin/SET_PROFESSORS', null, { root: true })
        commit('primaria/SET_LANDING', null, { root: true })
        notify('Has salido de tu sesión de Boletines', 'positive', 'primary')
        this.$router.push({ name: "login" });
        console.clear();
    }).catch(error => {
        SessionStorage.clear();
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
        commit('admin/SET_PROFILES', null, { root: true })
        commit('admin/SET_PROFESSORS', null, { root: true })
        commit('primaria/SET_LANDING', null, { root: true })
        notify('Su sesión ha caducado, por favor vuelva a iniciar sesión');
        this.$router.push({ name: "login" });
        console.clear();
    })
}

export function cleanApp({ commit }) {
    SessionStorage.clear();
    commit('SET_TOKEN', null);
    commit('SET_USER', null);
    commit('admin/SET_PROFILES', null, { root: true })
    commit('admin/SET_PROFESSORS', null, { root: true })
    commit('primaria/SET_LANDING', null, { root: true })
    this.$router.push({ name: "login" });
    notify('Su sesión ha caducado, por favor vuelva a iniciar sesión');
    console.clear();

}

export function readUser({ commit }) {
    if (!SessionStorage.isEmpty()) {
        commit('SET_TOKEN', SessionStorage.getItem('token'))
        commit('SET_USER', SessionStorage.getItem('user'))
    } else {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
    }
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

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}
