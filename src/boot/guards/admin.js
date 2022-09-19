import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'
import { SessionStorage } from "quasar";

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    const isAdmin = to.matched.some(item => item.meta.admin)
    const user = SessionStorage.getItem('user');

    // Admin
    if (isAdmin && (user.profile.role != 'Admin')) {
      Notify.create({
        message: 'No tiene autorización para acceder a la Administración de Boletines',
        type: 'negative',
        position: 'bottom',
        timeout: 1000
      })
    } else {
      next()
    };
  })
})
