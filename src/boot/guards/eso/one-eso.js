import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'
import { SessionStorage } from "quasar";

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const isOneESO = to.matched.some(item => item.meta.oneESO)
    const user = SessionStorage.getItem('user');

    // 1 ESO
    if (isOneESO && (user.profile.role != 'Admin') && (user.profile.role != 'Manager') && (user.profile.role != 'Supervisor ESO') && (user.courses.list.find(x => x.CatCurso == '1 ESO') == undefined)) {
      Notify.create({
        message: 'No tienes autorización para entrar a 1 ESO',
        type: 'negative',
        position: 'bottom',
        timeout: 1000
      })
    } else {
      next()
    };
  })
})
