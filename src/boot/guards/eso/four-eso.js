import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'
import { SessionStorage } from "quasar";

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const isFourESO = to.matched.some(item => item.meta.fourESO)
    const user = SessionStorage.getItem('user');

    // 4 ESO
    if (isFourESO && (user.profile.role != 'Admin') && (user.profile.role != 'Manager') && (user.profile.role != 'Supervisor ESO') && (user.courses.list.find(x => x.CatCurso == '4 ESO') == undefined)) {
      Notify.create({
        message: 'No tienes autorización para entrar a 4 ESO',
        type: 'negative',
        position: 'bottom',
        timeout: 1000
      })
    } else {
      next()
    };
  })
})
